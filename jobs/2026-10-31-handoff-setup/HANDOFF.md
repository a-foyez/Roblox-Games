# Hand-off: hand-off system setup

## Goal
Set up an automatic hand-off system for this Roblox game project. Plan it first and show me the plan, then build, test and commit it (don't push). Use Node built-ins only, no npm packages. Scripts must work on Windows (Git Bash), macOS and Linux.
Source: user message, 2026-10-31 18:40 (first message of session e0f2b688)

## Done when
- a test with a lowered checkpoint shows the note exactly once, and the size script survives a missing, empty and corrupt transcript;
- the checker fails a broken HANDOFF.md and passes a good one;
- the boundary hook blocks reading a file outside the project and allows one inside;
- CLAUDE.md passes the size check;
- everything is committed and nothing is pushed.
Source: user message, 2026-10-31 18:40

## Don'ts
- Don't overwrite or delete existing files; merge into them.
- Never use --add-dir or widen access yourself. If you need something outside the project, tell me what and why.
- Use Node built-ins only, no npm packages.
- (don't push)
Source: user message, 2026-10-31 18:40

## Status
Done. All Done-when items pass (findings F7) and the work is committed locally. The hooks go live after the Claude app restarts (F3).

## Route so far
1. Inspected the project and read the current hooks and permissions docs (F1, F4, F5).
2. Installed Node with winget at the user's choice (F2).
3. Built the scripts, skill, settings and CLAUDE.md (D1 to D5), tested them (F7) and committed.

## Next action
Restart the Claude desktop app so hooks find Node, then try a checkpoint note live (methods.md, "Try a checkpoint note live") to settle F3 and F6.

## Read first
- docs/handoff-system.md
- this folder's findings.md

## Leads to re-check
- F3: after the restart, does a new chat show "Session id: ..." from the SessionStart hook?
- F6: does the size hook find usage in a real transcript and in a real subagent transcript?

## Results to reuse
- scripts/test/run-tests.js: the full test suite.
- .claude/skills/handoff/templates/: blank job files.

## Waiting on me
Restart the Claude app (it picks up Node on PATH and loads the new hooks).

## Don't redo
Node install, the docs research (F4, F5), and the test suite. They are done and verified.

## Gotchas
- After settings.json is loaded, the boundary hook also blocks Claude's own commands that use absolute paths outside the project, scratchpad folders included.
- `cd ..` and `../` in shell commands are blocked even when the command first moves deeper.

## Studio/Blender state
- Place saved in Studio: not touched by this job.
- Rojo in sync: Rojo not used.
- .blend files: none.
- Only in Studio (not in this folder): the whole TestGame place.

## Queue
None

## Chain so far
- Started by session e0f2b688-a6ad-4464-aebc-bdf308e9e4f1 at 2026-10-31 18:40
