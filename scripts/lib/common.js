'use strict';
// Shared helpers for the hand-off hook scripts. Node built-ins only.
const fs = require('fs');
const path = require('path');

// Project root: Claude Code sets CLAUDE_PROJECT_DIR for hooks; fall back to this repo.
const ROOT = path.resolve(process.env.CLAUDE_PROJECT_DIR || path.join(__dirname, '..', '..'));

function readStdinJson() {
  try {
    const raw = fs.readFileSync(0, 'utf8');
    return raw.trim() ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function stateDir() {
  return process.env.HANDOFF_STATE_DIR || path.join(ROOT, '.claude', 'handoff-state');
}

// Session/agent ids end up in file names, so keep only safe characters.
function safeName(s) {
  return String(s || 'unknown').replace(/[^A-Za-z0-9_-]/g, '_').slice(0, 100);
}

function readText(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return null;
  }
}

// Splits markdown into { "Heading": "body text" } using "## " headings.
function sections(md) {
  const out = {};
  let current = null;
  for (const line of md.split(/\r?\n/)) {
    const m = line.match(/^##\s+(.+?)\s*$/);
    if (m) {
      current = m[1];
      out[current] = '';
    } else if (current !== null) {
      out[current] += line + '\n';
    }
  }
  return out;
}

// Bullet lines of HANDOFF.md's "Chain so far" section, oldest first.
function chainEntries(handoffMd) {
  const body = sections(handoffMd)['Chain so far'] || '';
  return body.split(/\r?\n/).filter((l) => /^\s*[-*]\s+\S/.test(l)).map((l) => l.replace(/^\s*[-*]\s+/, '').trim());
}

const SAVED_RE = /Hand-off #(\d+) saved/;

// Folders under jobs/, newest name first.
function listJobs(root = ROOT) {
  try {
    return fs
      .readdirSync(path.join(root, 'jobs'), { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort()
      .reverse();
  } catch {
    return [];
  }
}

module.exports = { ROOT, readStdinJson, stateDir, safeName, readText, sections, chainEntries, SAVED_RE, listJobs };
