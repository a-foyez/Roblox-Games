#!/usr/bin/env node
'use strict';
// Checks a job folder before a hand-off is committed.
//   node scripts/check-handoff.js jobs/<folder>/            -> OK, or a list of problems (exit 1)
//   node scripts/check-handoff.js jobs/<folder>/ --resume   -> FRESH, or the entries added since the last hand-off
//   node scripts/check-handoff.js --claude-md               -> OK if CLAUDE.md is under 60 lines
const fs = require('fs');
const path = require('path');
const { ROOT, readText, sections, chainEntries, SAVED_RE } = require('./lib/common');

const FILES = ['HANDOFF.md', 'findings.md', 'methods.md', 'progress.md'];
const SECTIONS = [
  'Goal', 'Done when', "Don'ts", 'Status', 'Route so far', 'Next action', 'Read first', 'Leads to re-check',
  'Results to reuse', 'Waiting on me', "Don't redo", 'Gotchas', 'Studio/Blender state', 'Queue', 'Chain so far',
];
const VERBATIM = ['Goal', 'Done when', "Don'ts"];
const FINDINGS_LIMIT = 8 * 1024;
const CLAUDE_MD_LIMIT = 60;

function fail(problems) {
  console.log('FAIL');
  for (const p of problems) console.log(`- ${p}`);
  process.exit(1);
}

// Placeholders left over from the templates. Code spans and code blocks are ignored.
function placeholders(md) {
  const found = [];
  const text = md.replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, ' ')).replace(/`[^`\n]*`/g, (m) => ' '.repeat(m.length));
  text.split(/\r?\n/).forEach((line, i) => {
    const m = line.match(/\bTODO\b|\bTBD\b|<(?!https?:)[A-Za-z][^<>\n]{0,60}>/);
    if (m) found.push({ line: i + 1, text: m[0] });
  });
  return found;
}

function checkClaudeMd() {
  const md = readText(path.join(ROOT, 'CLAUDE.md'));
  if (md === null) fail(['CLAUDE.md is missing']);
  const lines = md.replace(/\r?\n$/, '').split(/\r?\n/).length;
  if (lines >= CLAUDE_MD_LIMIT) fail([`CLAUDE.md is ${lines} lines (must be under ${CLAUDE_MD_LIMIT})`]);
  console.log('OK');
}

function checkFolder(dir) {
  const problems = [];
  for (const f of FILES) if (!fs.existsSync(path.join(dir, f))) problems.push(`missing file: ${f}`);

  const handoff = readText(path.join(dir, 'HANDOFF.md'));
  if (handoff !== null) {
    const s = sections(handoff);
    for (const name of SECTIONS) {
      if (!(name in s)) problems.push(`missing section: ## ${name}`);
      else if (!s[name].trim()) problems.push(`empty section: ## ${name} (write "None" if there is nothing)`);
    }
    for (const name of VERBATIM) {
      if (s[name] !== undefined && !/^\s*Source:/m.test(s[name])) problems.push(`## ${name} has no "Source:" line`);
    }
  }

  for (const f of FILES) {
    const md = readText(path.join(dir, f));
    if (md === null) continue;
    for (const p of placeholders(md)) problems.push(`placeholder in ${f} line ${p.line}: ${p.text}`);
  }

  const findings = readText(path.join(dir, 'findings.md'));
  if (findings !== null) {
    const bytes = Buffer.byteLength(findings, 'utf8');
    if (bytes > FINDINGS_LIMIT) problems.push(`findings.md is ${(bytes / 1024).toFixed(1)} KB (limit 8 KB): drop or merge stale facts`);
    const facts = sections(findings)['Facts'];
    if (facts === undefined) problems.push('findings.md has no "## Facts" section');
    else {
      for (const line of facts.split(/\r?\n/)) {
        if (/^[-*]\s+\S/.test(line) && !/\b(SETTLED|LEAD)\b/.test(line)) problems.push(`findings.md fact not marked SETTLED or LEAD: ${line.slice(0, 60)}`);
      }
    }
  }

  if (problems.length) fail(problems);
  console.log('OK');
}

// Lists what was added after the last saved hand-off, so a resuming session can spot another claim.
function checkResume(dir) {
  const handoff = readText(path.join(dir, 'HANDOFF.md'));
  if (handoff === null) fail(['missing file: HANDOFF.md']);
  const chain = chainEntries(handoff);
  let idx = -1;
  chain.forEach((e, i) => {
    if (SAVED_RE.test(e)) idx = i;
  });
  if (idx < 0) fail(['no saved hand-off in "Chain so far"']);
  const n = chain[idx].match(SAVED_RE)[1];
  const added = chain.slice(idx + 1).map((e) => `HANDOFF.md: ${e}${age(e)}`);

  const progress = (readText(path.join(dir, 'progress.md')) || '').split(/\r?\n/);
  const at = progress.findIndex((l) => l.includes(`Hand-off #${n} saved`));
  if (at >= 0) for (const l of progress.slice(at + 1)) if (l.trim()) added.push(`progress.md: ${l.trim()}`);

  if (!added.length) console.log('FRESH');
  else for (const a of added) console.log(a);
}

function age(entry) {
  const m = entry.match(/(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2})/);
  if (!m) return '';
  const hours = (Date.now() - new Date(`${m[1]}T${m[2]}:00`).getTime()) / 36e5;
  return Number.isFinite(hours) ? ` (${hours.toFixed(1)}h ago)` : '';
}

const args = process.argv.slice(2);
if (args.includes('--claude-md')) checkClaudeMd();
else {
  const folder = args.find((a) => !a.startsWith('--'));
  if (!folder) fail(['usage: node scripts/check-handoff.js jobs/<folder>/ [--resume] | --claude-md']);
  const dir = path.resolve(ROOT, folder);
  if (!fs.existsSync(dir)) fail([`folder not found: ${folder}`]);
  if (args.includes('--resume')) checkResume(dir);
  else checkFolder(dir);
}
