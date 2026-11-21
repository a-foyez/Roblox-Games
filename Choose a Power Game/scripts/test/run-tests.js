#!/usr/bin/env node
'use strict';
// Tests for the hand-off hooks. Run: node scripts/test/run-tests.js
// Scratch files go in .claude/handoff-state/test-tmp/ (gitignored) so nothing leaves the project.
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const TMP = path.join(ROOT, '.claude', 'handoff-state', 'test-tmp');
const S = (name) => path.join(ROOT, 'scripts', name);
const IS_WIN = process.platform === 'win32';

fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });

function run(script, input, env = {}, args = []) {
  const r = spawnSync(process.execPath, [S(script), ...args], {
    input: typeof input === 'string' ? input : JSON.stringify(input),
    env: { ...process.env, CLAUDE_PROJECT_DIR: ROOT, ...env },
    encoding: 'utf8',
  });
  return { code: r.status, out: r.stdout, err: r.stderr };
}

let passed = 0;
let failed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ok   ${name}`);
  } catch (e) {
    failed++;
    console.log(`  FAIL ${name}\n       ${e.message.split('\n').join('\n       ')}`);
  }
}

// --- stay-in-project.js ------------------------------------------------------
console.log('stay-in-project.js');
const guard = (tool_name, tool_input, cwd = ROOT) => run('stay-in-project.js', { tool_name, tool_input, cwd, hook_event_name: 'PreToolUse' });
const outsideFile = path.join(os.homedir(), '.ssh', 'id_rsa');

test('blocks Read of a file outside the project', () => {
  const r = guard('Read', { file_path: outsideFile });
  assert.strictEqual(r.code, 2);
  assert.match(r.err, /outside the project/);
  assert.strictEqual(r.err.trim().split('\n').length, 1, 'reason must be one line');
});
test('allows Read of a file inside the project', () => assert.strictEqual(guard('Read', { file_path: path.join(ROOT, 'CLAUDE.md') }).code, 0));
test('allows relative path inside', () => assert.strictEqual(guard('Edit', { file_path: 'scripts/check-handoff.js' }).code, 0));
test('blocks .. escape', () => assert.strictEqual(guard('Write', { file_path: path.join(ROOT, 'scripts', '..', '..', 'x.txt') }).code, 2));
test('blocks ~ paths', () => assert.strictEqual(guard('Read', { file_path: '~/.aws/credentials' }).code, 2));
test('blocks a sibling folder that shares the name prefix', () => assert.strictEqual(guard('Read', { file_path: ROOT + '-evil/x' }).code, 2));
test('blocks NotebookEdit outside', () => assert.strictEqual(guard('NotebookEdit', { notebook_path: outsideFile }).code, 2));
test('blocks Grep path outside', () => assert.strictEqual(guard('Grep', { pattern: 'x', path: os.homedir() }).code, 2));
test('blocks Glob absolute pattern outside', () => assert.strictEqual(guard('Glob', { pattern: os.homedir().replace(/\\/g, '/') + '/**/*.pem' }).code, 2));
test('allows Glob relative pattern', () => assert.strictEqual(guard('Glob', { pattern: '**/*.md' }).code, 0));
test('blocks when cwd is outside', () => assert.strictEqual(guard('Read', { file_path: 'x' }, os.homedir()).code, 2));
test('allows MCP tools', () => assert.strictEqual(guard('mcp__Roblox_Studio__execute_luau', { code: 'print(1)', path: '/etc' }).code, 0));
test('blocks on unreadable input (fails closed)', () => assert.strictEqual(run('stay-in-project.js', 'not json').code, 2));

test('Bash: blocks absolute path, ~ and ../', () => {
  assert.strictEqual(guard('Bash', { command: 'cat /etc/passwd' }).code, 2);
  assert.strictEqual(guard('Bash', { command: 'cat ~/.ssh/id_rsa' }).code, 2);
  assert.strictEqual(guard('Bash', { command: 'ls ../' }).code, 2);
  assert.strictEqual(guard('Bash', { command: 'cat "$HOME/.bashrc"' }).code, 2);
  assert.strictEqual(guard('Bash', { command: 'grep x --file=/etc/hosts' }).code, 2);
});
test('Bash: allows commands that stay inside', () => {
  for (const command of ['ls scripts', 'git status 2>/dev/null', 'node scripts/check-handoff.js --claude-md', 'curl https://example.com/a/b', 'cat "$CLAUDE_PROJECT_DIR/CLAUDE.md"', `cat > notes.txt <<'EOF'\nsee /etc/passwd and ~/.ssh\nEOF`]) {
    const r = guard('Bash', { command });
    assert.strictEqual(r.code, 0, `${command} -> ${r.err}`);
  }
});
test('PowerShell: blocks $env:USERPROFILE and %APPDATA%', () => {
  assert.strictEqual(guard('PowerShell', { command: 'Get-Content $env:USERPROFILE\\.ssh\\id_rsa' }).code, 2);
  if (IS_WIN) assert.strictEqual(guard('PowerShell', { command: 'type %APPDATA%\\x.txt' }).code, 2);
});

if (IS_WIN) {
  test('Windows: backslashes, case and Git Bash drive paths', () => {
    assert.strictEqual(guard('Read', { file_path: ROOT.toUpperCase() + '\\CLAUDE.md' }).code, 0);
    assert.strictEqual(guard('Read', { file_path: ROOT.replace(/\\/g, '/') + '/CLAUDE.md' }).code, 0);
    const bashStyle = '/' + ROOT[0].toLowerCase() + ROOT.slice(2).replace(/\\/g, '/');
    assert.strictEqual(guard('Read', { file_path: bashStyle + '/CLAUDE.md' }).code, 0);
    assert.strictEqual(guard('Bash', { command: 'cat /c/Windows/win.ini' }).code, 2);
    assert.strictEqual(guard('Read', { file_path: 'D:\\x.txt' }).code, 2);
  });
}
test('blocks a symlink inside the project that points outside', () => {
  const link = path.join(TMP, 'home-link');
  try {
    fs.symlinkSync(os.homedir(), link, IS_WIN ? 'junction' : 'dir');
  } catch (e) {
    console.log(`       (skipped: cannot create symlink: ${e.code})`);
    return;
  }
  assert.strictEqual(guard('Read', { file_path: path.join(link, '.ssh', 'id_rsa') }).code, 2);
  fs.unlinkSync(link);
});

// --- chat-size-check.js --------------------------------------------------------
console.log('chat-size-check.js');
const stateDir = path.join(TMP, 'state');
const lowConfig = path.join(TMP, 'low-config.json');
fs.writeFileSync(lowConfig, JSON.stringify({ contextWindow: 200000, checkpoints: [{ at: 0.01, note: 'LOW NOTE' }, { at: 0.5, note: 'HALF' }] }));
const env = { HANDOFF_STATE_DIR: stateDir, HANDOFF_CONFIG: lowConfig };
const line = (usage, extra = {}) => JSON.stringify({ type: 'assistant', message: { role: 'assistant', usage }, ...extra });
const transcript = path.join(TMP, 'chat.jsonl');
fs.writeFileSync(
  transcript,
  [JSON.stringify({ type: 'user', message: { content: 'hi' } }), line({ input_tokens: 5, cache_creation_input_tokens: 2000, cache_read_input_tokens: 3000, output_tokens: 50 }), ''].join('\n')
);
const size = (extra) => run('chat-size-check.js', { session_id: 's1', transcript_path: transcript, hook_event_name: 'PostToolUse', ...extra }, env);

test('lowered checkpoint shows the note exactly once', () => {
  const first = size();
  assert.strictEqual(first.code, 0);
  const ctx = JSON.parse(first.out).hookSpecificOutput;
  assert.strictEqual(ctx.hookEventName, 'PostToolUse');
  assert.match(ctx.additionalContext, /LOW NOTE/);
  assert.match(ctx.additionalContext, /5005\/200000/);
  assert.strictEqual(size().out, '', 'second run must be silent');
  assert.strictEqual(size({ hook_event_name: 'UserPromptSubmit', prompt: 'hi' }).out, '', 'other event, same session: silent');
});
test('a new session gets its own note; UserPromptSubmit uses its event name', () => {
  const r = size({ session_id: 's2', hook_event_name: 'UserPromptSubmit', prompt: 'hi' });
  assert.strictEqual(JSON.parse(r.out).hookSpecificOutput.hookEventName, 'UserPromptSubmit');
});
test('below the first checkpoint: no note', () => {
  const r = run('chat-size-check.js', { session_id: 's3', transcript_path: transcript, hook_event_name: 'PostToolUse' }, { HANDOFF_STATE_DIR: stateDir });
  assert.strictEqual(r.code, 0);
  assert.strictEqual(r.out, '');
});
test('uses the newest assistant usage and skips sidechain lines', () => {
  const t = path.join(TMP, 'chat2.jsonl');
  fs.writeFileSync(t, [line({ input_tokens: 1 }), line({ input_tokens: 120000 }), line({ input_tokens: 2 }, { isSidechain: true })].join('\n'));
  const r = run('chat-size-check.js', { session_id: 's4', transcript_path: t }, env);
  assert.match(JSON.parse(r.out).hookSpecificOutput.additionalContext, /HALF/);
});
test('subagent gets the AGENT HAND-OFF (PARTIAL) note from its own transcript', () => {
  const dir = path.join(TMP, 's5', 'subagents');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'agent-a1.jsonl'), line({ input_tokens: 9000 }, { isSidechain: true }));
  const r = run('chat-size-check.js', { session_id: 's5', agent_id: 'a1', transcript_path: path.join(TMP, 's5.jsonl') }, env);
  assert.match(JSON.parse(r.out).hookSpecificOutput.additionalContext, /AGENT HAND-OFF \(PARTIAL\):/);
});
test('"stay in this chat" is acknowledged', () => {
  const r = size({ session_id: 's6', hook_event_name: 'UserPromptSubmit', prompt: 'please stay in this chat' });
  assert.match(JSON.parse(r.out).hookSpecificOutput.additionalContext, /Hold/);
});
test('survives missing, empty and corrupt transcripts and bad input', () => {
  const empty = path.join(TMP, 'empty.jsonl');
  const corrupt = path.join(TMP, 'corrupt.jsonl');
  fs.writeFileSync(empty, '');
  fs.writeFileSync(corrupt, '{"type":"assistant","message":{"usage":{"input_tok\n\u0000\u0001garbage "usage" {{{\n' + 'x'.repeat(300000));
  for (const tp of [path.join(TMP, 'missing.jsonl'), empty, corrupt, TMP, undefined]) {
    const r = run('chat-size-check.js', { session_id: 'sx', transcript_path: tp }, env);
    assert.strictEqual(r.code, 0, String(tp));
    assert.strictEqual(r.out, '', String(tp));
  }
  for (const raw of ['', 'not json', '[1,2']) assert.strictEqual(run('chat-size-check.js', raw, env).code, 0);
  fs.writeFileSync(path.join(TMP, 'bad-config.json'), '{oops');
  assert.strictEqual(run('chat-size-check.js', { session_id: 'sy', transcript_path: transcript }, { ...env, HANDOFF_CONFIG: path.join(TMP, 'bad-config.json') }).code, 0);
});
test('shipped config: last checkpoint sits below auto-compact', () => {
  const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, '.claude', 'handoff-config.json'), 'utf8'));
  const last = Math.max(...cfg.checkpoints.map((c) => c.at));
  assert.ok(last < cfg.autoCompactAt, `${last} >= ${cfg.autoCompactAt}`);
  assert.deepStrictEqual(cfg.checkpoints.map((c) => c.at), [0.5, 0.6, 0.7, 0.8]);
});

// --- check-handoff.js -----------------------------------------------------------
console.log('check-handoff.js');
const SECTIONS = ['Goal', 'Done when', "Don'ts", 'Status', 'Route so far', 'Next action', 'Read first', 'Leads to re-check', 'Results to reuse', 'Waiting on me', "Don't redo", 'Gotchas', 'Studio/Blender state', 'Queue', 'Chain so far'];
function makeJob(name, { handoff, findings } = {}) {
  const dir = path.join(TMP, 'jobs', name);
  fs.mkdirSync(dir, { recursive: true });
  const body = (s) => {
    if (['Goal', 'Done when', "Don'ts"].includes(s)) return 'Make the coin pickup work.\nSource: user message, 2026-10-31 10:00';
    if (s === 'Chain so far') return '- Started by session aaa at 2026-10-31 10:00\n- Hand-off #1 saved 2026-10-31 12:00 by session aaa';
    return 'None';
  };
  fs.writeFileSync(path.join(dir, 'HANDOFF.md'), handoff || '# Hand-off: coins\n\n' + SECTIONS.map((s) => `## ${s}\n${body(s)}\n`).join('\n'));
  fs.writeFileSync(path.join(dir, 'findings.md'), findings || '# Findings\n\n## Facts\n- F1 SETTLED: Coins are in Workspace.Coins. Source: MCP search_game_tree\n\n## Decisions\n- D1: Touched events. Why: simple. Rejected: raycasts\n');
  fs.writeFileSync(path.join(dir, 'methods.md'), '# Methods\n\n## Playtest\n1. Start play with the Studio MCP.\n');
  fs.writeFileSync(path.join(dir, 'progress.md'), '# Progress\n\n- 2026-10-31 12:00 — Hand-off #1 saved\n');
  return dir;
}
const check = (...args) => run('check-handoff.js', '', {}, args);

test('passes a good job folder', () => {
  const r = check(makeJob('good'));
  assert.strictEqual(r.out.trim(), 'OK', r.out);
  assert.strictEqual(r.code, 0);
});
test('fails a broken HANDOFF.md and lists every problem', () => {
  const dir = makeJob('broken', {
    handoff: '# Hand-off\n\n## Goal\nTODO\n\n## Done when\nTBD\nSource: x\n\n## Status\n<one or two lines>\n\n## Queue\n\n## Chain so far\n- Started\n',
    findings: '# Findings\n\n## Facts\n- unmarked fact\n' + 'x'.repeat(9000),
  });
  fs.unlinkSync(path.join(dir, 'methods.md'));
  const r = check(dir);
  assert.strictEqual(r.code, 1);
  for (const want of ['FAIL', 'missing file: methods.md', "missing section: ## Don'ts", 'missing section: ## Next action', 'empty section: ## Queue', '## Goal has no "Source:" line', 'placeholder in HANDOFF.md line 4: TODO', 'TBD', '<one or two lines>', 'findings.md is', 'not marked SETTLED or LEAD']) {
    assert.ok(r.out.includes(want), `expected "${want}" in:\n${r.out}`);
  }
});
test('the blank templates fail (placeholders left)', () => {
  const dir = path.join(TMP, 'jobs', 'template');
  fs.cpSync(path.join(ROOT, '.claude', 'skills', 'handoff', 'templates'), dir, { recursive: true });
  const r = check(dir);
  assert.strictEqual(r.code, 1);
  assert.match(r.out, /placeholder/);
});
test('--resume prints FRESH, then the entries added after the hand-off', () => {
  const dir = makeJob('resume');
  assert.strictEqual(check(dir, '--resume').out.trim(), 'FRESH');
  fs.appendFileSync(path.join(dir, 'HANDOFF.md'), '- Resumed by session bbb at 2026-10-31 13:00\n');
  fs.appendFileSync(path.join(dir, 'progress.md'), '- 2026-10-31 13:05 — Re-checked leads\n');
  const out = check(dir, '--resume').out;
  assert.match(out, /Resumed by session bbb at 2026-10-31 13:00 \(.*h ago\)/);
  assert.match(out, /Re-checked leads/);
});
test('CLAUDE.md passes the size check', () => {
  const r = check('--claude-md');
  assert.strictEqual(r.out.trim(), 'OK', r.out);
});
test('the real job folders pass', () => {
  const jobs = path.join(ROOT, 'jobs');
  for (const j of fs.existsSync(jobs) ? fs.readdirSync(jobs) : []) {
    const r = check(path.join(jobs, j));
    assert.strictEqual(r.out.trim(), 'OK', `${j}:\n${r.out}`);
  }
});

// --- session-start.js ---------------------------------------------------------
console.log('session-start.js');
const fakeRoot = path.join(TMP, 'fake-root');
fs.mkdirSync(fakeRoot, { recursive: true });
fs.cpSync(path.join(TMP, 'jobs', 'good'), path.join(fakeRoot, 'jobs', '2026-10-31-coins'), { recursive: true });
const start = (input) => run('session-start.js', input, { CLAUDE_PROJECT_DIR: fakeRoot, HANDOFF_STATE_DIR: path.join(TMP, 'ss-state') });

test('startup prints the session id and the unclaimed hand-off', () => {
  const o = JSON.parse(start({ session_id: 'abc-123', source: 'startup', hook_event_name: 'SessionStart' }).out);
  assert.match(o.hookSpecificOutput.additionalContext, /Session id: abc-123/);
  assert.match(o.systemMessage, /Unclaimed hand-off: jobs\/2026-10-31-coins\/ \(#1\)/);
});
test('a resumed job is no longer unclaimed', () => {
  fs.appendFileSync(path.join(fakeRoot, 'jobs', '2026-10-31-coins', 'HANDOFF.md'), '- Resumed by session zzz at 2026-10-31 13:00\n');
  const o = JSON.parse(start({ session_id: 'abc', source: 'clear' }).out);
  assert.doesNotMatch(o.systemMessage, /Unclaimed/);
});
test('compact: warns about auto-compaction and a cut-off hand-off', () => {
  fs.appendFileSync(path.join(fakeRoot, 'jobs', '2026-10-31-coins', 'progress.md'), '- 2026-10-31 14:00 — Hand-off #2 started\n');
  start({ session_id: 'c1', hook_event_name: 'PreCompact', trigger: 'auto' });
  const o = JSON.parse(start({ session_id: 'c1', source: 'compact', hook_event_name: 'SessionStart' }).out);
  assert.match(o.hookSpecificOutput.additionalContext, /auto-compacted/);
  assert.match(o.hookSpecificOutput.additionalContext, /recommend a fresh chat/);
  assert.match(o.hookSpecificOutput.additionalContext, /Hand-off #2 in jobs\/2026-10-31-coins\/ was cut off/);
});
test('never crashes on bad input', () => {
  for (const raw of ['', 'nope']) assert.strictEqual(run('session-start.js', raw, { CLAUDE_PROJECT_DIR: fakeRoot }).code, 0);
});

fs.rmSync(TMP, { recursive: true, force: true });
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
