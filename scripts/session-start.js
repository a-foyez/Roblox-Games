#!/usr/bin/env node
'use strict';
// SessionStart hook (and PreCompact, to remember whether a compaction was automatic).
// startup/clear/resume/fork: tells Claude and the user this session's id and any unclaimed hand-off.
// compact: warns that detail was lost and tells Claude to recommend a fresh chat.
// Never blocks or crashes: every failure ends in exit 0.
process.on('uncaughtException', () => process.exit(0));

const fs = require('fs');
const path = require('path');
const { ROOT, readStdinJson, stateDir, safeName, readText, chainEntries, SAVED_RE, listJobs } = require('./lib/common');

function emit(context, userMessage) {
  process.stdout.write(
    JSON.stringify({ systemMessage: userMessage, hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: context } })
  );
}

// A job is unclaimed when the last "Chain so far" entry is a saved hand-off nobody resumed.
function unclaimedJobs() {
  const out = [];
  for (const job of listJobs()) {
    const md = readText(path.join(ROOT, 'jobs', job, 'HANDOFF.md'));
    if (!md) continue;
    const chain = chainEntries(md);
    const m = chain.length ? chain[chain.length - 1].match(SAVED_RE) : null;
    if (m) out.push({ job, n: m[1] });
  }
  return out;
}

// A hand-off was cut off when progress.md's latest hand-off line says "started" but not "saved".
function cutOffHandoffs() {
  const out = [];
  for (const job of listJobs()) {
    const lines = (readText(path.join(ROOT, 'jobs', job, 'progress.md')) || '').split(/\r?\n/);
    const last = lines.filter((l) => /Hand-off #\d+ (started|saved)/.test(l)).pop();
    const m = last && last.match(/Hand-off #(\d+) started/);
    if (m) out.push({ job, n: m[1] });
  }
  return out;
}

function main() {
  const input = readStdinJson();
  const compactFile = path.join(stateDir(), `compact-${safeName(input.session_id)}.json`);

  if (input.hook_event_name === 'PreCompact') {
    fs.mkdirSync(stateDir(), { recursive: true });
    fs.writeFileSync(compactFile, JSON.stringify({ trigger: input.trigger || 'unknown' }));
    return;
  }

  if (input.source === 'compact') {
    let trigger = 'unknown';
    try {
      trigger = JSON.parse(fs.readFileSync(compactFile, 'utf8')).trigger;
    } catch {}
    const lines = [
      `WARNING: this chat was just ${trigger === 'auto' ? 'auto-compacted' : 'compacted'}, so earlier detail is gone.`,
      'In your next reply, tell the user you recommend a fresh chat: reach a clean stop, hand off with the handoff skill (.claude/skills/handoff/SKILL.md), then /clear.',
    ];
    for (const c of cutOffHandoffs()) {
      lines.push(`Hand-off #${c.n} in jobs/${c.job}/ was cut off (started, never saved). Finish it first: update the job folder and run node scripts/check-handoff.js jobs/${c.job}/ until it prints OK.`);
    }
    emit(lines.join('\n'), `Chat was ${trigger === 'auto' ? 'auto-' : ''}compacted. A fresh chat is recommended.`);
    return;
  }

  const lines = [`Session id: ${input.session_id || 'unknown'}`];
  const open = unclaimedJobs();
  if (open.length) {
    lines.push(`Unclaimed hand-off: ${open.map((o) => `jobs/${o.job}/ (#${o.n})`).join(', ')}. To resume, paste: Continue the job in jobs/${open[0].job}/`);
  }
  emit(lines.join('\n') + '\nUse this session id in "Resumed by session" and "Hand-off #n saved" lines.', lines.join('\n'));
}

try {
  main();
} catch {}
process.exit(0);
