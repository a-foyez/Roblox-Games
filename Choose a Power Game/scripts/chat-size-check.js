#!/usr/bin/env node
'use strict';
// UserPromptSubmit + PostToolUse hook. Reads the end of the chat transcript to see how full the
// context window is and, the first time each checkpoint in .claude/handoff-config.json is passed,
// gives Claude a note (via additionalContext) on how urgently to hand off.
// It must never break or block a session: every failure ends in a silent exit 0.
process.on('uncaughtException', () => process.exit(0));

const fs = require('fs');
const path = require('path');
const { ROOT, readStdinJson, stateDir, safeName } = require('./lib/common');

const TAIL_BYTES = 256 * 1024;

const DEFAULTS = {
  contextWindow: 200000,
  checkpoints: [
    { at: 0.5, note: 'Hand off at the best stop.' },
    { at: 0.6, note: 'Hand off at the first good stop.' },
    { at: 0.7, note: 'Hand off at the end of the current step.' },
    { at: 0.8, note: 'Stop now: reach the nearest clean stop and hand off.' },
  ],
  mainNote: 'Follow the Hand off steps in .claude/skills/handoff/SKILL.md. If the user said "stay in this chat", keep working until the next checkpoint.',
  agentNote: 'You are a subagent: finish your current item, then return a report starting "AGENT HAND-OFF (PARTIAL):" with what is done, what is left, and where results are written.',
};

function loadConfig() {
  try {
    const file = process.env.HANDOFF_CONFIG || path.join(ROOT, '.claude', 'handoff-config.json');
    return { ...DEFAULTS, ...JSON.parse(fs.readFileSync(file, 'utf8')) };
  } catch {
    return DEFAULTS;
  }
}

// Context size of one transcript line, if it is an assistant turn with usage numbers.
function tokensFromLine(line, allowSidechain) {
  if (!line.includes('"usage"')) return null;
  let o;
  try {
    o = JSON.parse(line);
  } catch {
    return null;
  }
  if (!o || o.type !== 'assistant' || (o.isSidechain && !allowSidechain)) return null;
  const u = o.message && o.message.usage;
  if (!u) return null;
  const n = (Number(u.input_tokens) || 0) + (Number(u.cache_creation_input_tokens) || 0) + (Number(u.cache_read_input_tokens) || 0);
  return n > 0 ? n : null;
}

// Reads only the last 256 KB (then 2 MB if needed) and returns the newest assistant turn's size.
function latestContextTokens(file, allowSidechain) {
  let fd;
  try {
    fd = fs.openSync(file, 'r');
    const size = fs.fstatSync(fd).size;
    for (const want of [TAIL_BYTES, TAIL_BYTES * 8]) {
      const len = Math.min(size, want);
      const buf = Buffer.alloc(len);
      fs.readSync(fd, buf, 0, len, size - len);
      const lines = buf.toString('utf8').split('\n');
      if (len < size) lines.shift(); // the first line is probably cut in half
      for (let i = lines.length - 1; i >= 0; i--) {
        const t = tokensFromLine(lines[i], allowSidechain);
        if (t !== null) return t;
      }
      if (len === size) break;
    }
  } catch {
    // missing or unreadable transcript: no measurement
  } finally {
    if (fd !== undefined) {
      try {
        fs.closeSync(fd);
      } catch {}
    }
  }
  return null;
}

// Subagents keep their own transcript next to the main one.
function agentTranscript(input) {
  if (input.agent_transcript_path) return input.agent_transcript_path;
  if (!input.transcript_path || !input.session_id) return null;
  const p = path.join(path.dirname(input.transcript_path), String(input.session_id), 'subagents', `agent-${input.agent_id}.jsonl`);
  return fs.existsSync(p) ? p : null;
}

function main() {
  const input = readStdinJson();
  const cfg = loadConfig();
  const isAgent = Boolean(input.agent_id);
  const file = isAgent ? agentTranscript(input) : input.transcript_path;
  if (!file) return;

  const tokens = latestContextTokens(file, isAgent);
  if (tokens === null) return;
  const windowSize = Number(cfg.contextWindow) > 0 ? Number(cfg.contextWindow) : DEFAULTS.contextWindow;
  const fraction = tokens / windowSize;
  const checkpoints = (Array.isArray(cfg.checkpoints) ? cfg.checkpoints : DEFAULTS.checkpoints)
    .filter((c) => c && Number(c.at) > 0 && Number(c.at) < 1)
    .sort((a, b) => a.at - b.at);

  let level = -1;
  checkpoints.forEach((c, i) => {
    if (fraction >= c.at) level = i;
  });

  const stateFile = path.join(stateDir(), `${safeName(input.session_id)}${isAgent ? '.agent-' + safeName(input.agent_id) : ''}.json`);
  let state = { shown: [] };
  try {
    state = { shown: [], ...JSON.parse(fs.readFileSync(stateFile, 'utf8')) };
  } catch {}

  const notes = [];
  const pct = (x) => `${Math.round(x * 100)}%`;
  if (level >= 0 && !state.shown.includes(level)) {
    const c = checkpoints[level];
    notes.push(`[Context ${pct(fraction)} full: ${tokens}/${windowSize} tokens] Checkpoint ${pct(c.at)}: ${c.note} ${isAgent ? cfg.agentNote : cfg.mainNote}`);
    state.shown = checkpoints.map((_, i) => i).filter((i) => i <= level);
  }
  if (!isAgent && input.hook_event_name === 'UserPromptSubmit' && /stay in this chat/i.test(String(input.prompt || ''))) {
    const next = checkpoints[level + 1];
    notes.push(`Hold: the user said "stay in this chat". Do not hand off ${next ? `until the ${pct(next.at)} checkpoint note` : 'unless the user asks'}.`);
  }
  if (notes.length === 0) return;

  try {
    fs.mkdirSync(path.dirname(stateFile), { recursive: true });
    fs.writeFileSync(stateFile, JSON.stringify(state));
  } catch {}

  const event = input.hook_event_name === 'UserPromptSubmit' ? 'UserPromptSubmit' : 'PostToolUse';
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: event, additionalContext: notes.join('\n') } }));
}

try {
  main();
} catch {}
process.exit(0);
