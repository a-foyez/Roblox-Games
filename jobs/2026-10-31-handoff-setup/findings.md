# Findings: hand-off system setup

Current state only, under 8 KB.

## Facts
- F1 SETTLED: The folder had only .mcp.json, CLAUDE.md and README.md; no Rojo project, no .claude/, not a git repo. Source: `ls -la` and `git status` at job start.
- F2 SETTLED: Node was not installed; Node LTS v26.13.0 was installed with winget at the user's choice, to `C:\Program Files\nodejs`. Source: `winget install OpenJS.NodeJS.LTS` output, `node --version`.
- F3 LEAD: Shells already running when Node was installed (including Claude Code's hook runner) don't have Node on PATH until the Claude app restarts. Until then the hooks fail open. Source: `which node` failed in Git Bash until PATH was extended by hand.
- F4 SETTLED: Hook facts from the current docs: PreToolUse exit 2 blocks the call and stderr is shown to Claude; additionalContext goes in `hookSpecificOutput` with `hookEventName`; SessionStart `source` is startup/resume/clear/compact/fork; PreCompact `trigger` is manual/auto; subagent tool calls fire the parent's hooks with `agent_id`/`agent_type`. Source: code.claude.com/docs/en/hooks.
- F5 SETTLED: Read deny rules use `~/` for home and `//` for absolute paths, and also block Edit/Write on the same path. Source: code.claude.com/docs/en/permissions.
- F6 LEAD: Transcript lines look like `{"type":"assistant","message":{"usage":{...}}}`, and subagent transcripts sit at `<transcript dir>/<session_id>/subagents/agent-<agent_id>.jsonl`. This layout is not documented; it is assumed from known Claude Code behaviour and still needs checking against a live session. Source: scripts/chat-size-check.js design; docs say the schema is undocumented.
- F7 SETTLED: All 36 tests in scripts/test/run-tests.js pass on Windows (Git Bash, Node 26). Source: `node scripts/test/run-tests.js`.

## Decisions
- D1: Hook commands use shell form `node "$CLAUDE_PROJECT_DIR/..."`. Why: works in Git Bash, macOS and Linux shells and is long supported. Rejected: exec form with `args` (newer feature; may not exist in older Claude Code builds).
- D2: The boundary hook fails closed (exit 2) on its own errors; the size and session hooks fail open (exit 0). Why: a boundary that errors should not let calls through, while a size note is never worth breaking a chat. Rejected: failing open everywhere.
- D3: PowerShell was added to the boundary matcher. Why: it is a second shell tool in this app and could otherwise bypass the check. Rejected: Bash only, as originally listed.
- D4: The MCP setup detail moved from CLAUDE.md to docs/mcp-setup.md. Why: keeps CLAUDE.md under 60 lines without losing anything. Rejected: @-importing it (it would load into every chat).
- D5: The "hand-off started / saved" state is tracked as lines in progress.md, not in a hidden file. Why: the session-start hook can then spot a cut-off hand-off from committed files alone. Rejected: a gitignored marker file (lost on a fresh clone).
