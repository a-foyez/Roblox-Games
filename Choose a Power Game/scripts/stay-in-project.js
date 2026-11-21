#!/usr/bin/env node
'use strict';
// PreToolUse hook: blocks any file or shell tool call that reaches outside the project folder.
// Exit 0 = allow. Exit 2 = block; the one line on stderr is the reason Claude sees.
// MCP tools (Roblox Studio, Blender) are never checked.
const fs = require('fs');
const os = require('os');
const path = require('path');

const IS_WIN = process.platform === 'win32';
const CASE_INSENSITIVE = IS_WIN || process.platform === 'darwin';
const DEVICES = /^\/dev\/(null|zero|stdin|stdout|stderr|tty|fd\/\d+)$/;

function block(reason) {
  process.stderr.write(reason.replace(/\s+/g, ' ').trim() + '\n');
  process.exit(2);
}

// Turns ~, ~user, Git Bash drive paths (/c/...) and either slash style into an absolute path.
function toAbsolute(p, base) {
  let s = String(p).trim();
  if (s === '~' || /^~[\\/]/.test(s)) s = os.homedir() + s.slice(1);
  else if (/^~[^\\/]/.test(s)) s = path.join(path.dirname(os.homedir()), s.slice(1));
  if (IS_WIN) {
    const m = s.match(/^\/(?:cygdrive\/|mnt\/)?([a-zA-Z])(\/.*)?$/);
    if (m) s = `${m[1]}:${m[2] || '/'}`;
    s = s.replace(/\//g, '\\');
  } else {
    s = s.replace(/\\/g, '/');
  }
  return path.resolve(base, s);
}

// Resolves symlinks (and on Windows the real letter case) for the longest part of the path that exists.
function realish(abs) {
  let cur = abs;
  const rest = [];
  for (;;) {
    try {
      return path.join(fs.realpathSync.native(cur), ...rest.reverse());
    } catch {
      const parent = path.dirname(cur);
      if (parent === cur) return abs;
      rest.push(path.basename(cur));
      cur = parent;
    }
  }
}

function isInside(target, root) {
  const a = CASE_INSENSITIVE ? root.toLowerCase() : root;
  const b = CASE_INSENSITIVE ? target.toLowerCase() : target;
  const rel = path.relative(a, b);
  return rel === '' || (!path.isAbsolute(rel) && rel !== '..' && !rel.startsWith('..' + path.sep));
}

const ROOT = realish(path.resolve(process.env.CLAUDE_PROJECT_DIR || path.join(__dirname, '..')));

function check(tool, p, base) {
  if (p === undefined || p === null || String(p).trim() === '') return;
  const resolved = realish(toAbsolute(p, base));
  if (!isInside(resolved, ROOT)) {
    block(`Blocked ${tool}: "${p}" is outside the project (${ROOT}). Work only inside this folder; if you need that path, ask the user and say why.`);
  }
}

// --- Shell commands -------------------------------------------------------

// Heredoc and here-string bodies are text being written, not paths being opened.
function stripBodies(cmd) {
  return cmd
    .replace(/<<-?\s*(['"]?)(\w+)\1[^\n]*\n[\s\S]*?\n[ \t]*\2[ \t]*(?=\r?\n|$)/g, (m) => m.split('\n')[0])
    .replace(/@(['"])\r?\n[\s\S]*?\r?\n\1@/g, '');
}

// Splits a command into words, keeping quoted text together.
function words(cmd) {
  const out = [];
  let cur = '';
  let quote = null;
  let quoted = false;
  for (const ch of cmd) {
    if (quote) {
      if (ch === quote) quote = null;
      else cur += ch;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
      quoted = true;
    } else if (/[\s;|&()<>`]/.test(ch)) {
      if (cur || quoted) out.push(cur);
      cur = '';
      quoted = false;
    } else {
      cur += ch;
    }
  }
  if (cur) out.push(cur);
  return out;
}

function envValue(name) {
  const upper = name.toUpperCase();
  if (upper === 'HOME' || upper === 'USERPROFILE') return os.homedir();
  if (process.env[name] !== undefined) return process.env[name];
  if (IS_WIN) {
    const key = Object.keys(process.env).find((k) => k.toUpperCase() === upper);
    if (key) return process.env[key];
  }
  return undefined;
}

// Expands $VAR, ${VAR}, $env:VAR and %VAR% when the variable is known; unknown ones stay as written.
function expand(w) {
  return w.replace(/\$env:(\w+)|\$\{(\w+)\}|\$(\w+)|%(\w+)%/gi, (m, a, b, c, d) => {
    const v = envValue(a || b || c || d);
    return v === undefined ? m : v;
  });
}

function looksLikePath(w) {
  if (!w || /^[a-z][a-z0-9+.-]*:\/\//i.test(w)) return false; // URL
  if (IS_WIN && /^\/[a-z?]$/i.test(w)) return false; // cmd-style switch such as /c or /d
  if (DEVICES.test(w.replace(/\\/g, '/'))) return false;
  return /^~/.test(w) || /^[\\/]/.test(w) || /^[a-zA-Z]:([\\/]|$)/.test(w) || /(^|[\\/])\.\.([\\/]|$)/.test(w);
}

function checkShell(tool, command, base) {
  for (const word of words(stripBodies(String(command || '')))) {
    for (const piece of word.split('=')) {
      const p = expand(piece);
      if (looksLikePath(p)) check(tool, p, base);
    }
  }
}

// --- Main ------------------------------------------------------------------

function main() {
  let input;
  try {
    input = JSON.parse(fs.readFileSync(0, 'utf8') || '{}');
  } catch {
    block('Blocked: the project-boundary hook could not read its input, so the call was stopped to be safe.');
  }
  const tool = input.tool_name || '';
  const ti = input.tool_input || {};
  if (tool.startsWith('mcp__')) return;

  const cwd = input.cwd ? toAbsolute(input.cwd, ROOT) : ROOT;
  check(tool, cwd, ROOT); // a working directory outside the project makes every relative path unsafe

  switch (tool) {
    case 'Read':
    case 'Write':
    case 'Edit':
    case 'MultiEdit':
      check(tool, ti.file_path, cwd);
      break;
    case 'NotebookEdit':
      check(tool, ti.notebook_path, cwd);
      break;
    case 'Grep':
      check(tool, ti.path, cwd);
      break;
    case 'Glob': {
      const base = ti.path ? toAbsolute(ti.path, cwd) : cwd;
      check(tool, ti.path, cwd);
      const prefix = String(ti.pattern || '').split(/[*?[{]/)[0];
      check(tool, prefix, base);
      break;
    }
    case 'Bash':
    case 'PowerShell':
      checkShell(tool, ti.command, cwd);
      break;
  }
}

try {
  main();
  process.exit(0);
} catch (e) {
  block(`Blocked: the project-boundary hook failed (${e && e.message}), so the call was stopped to be safe.`);
}
