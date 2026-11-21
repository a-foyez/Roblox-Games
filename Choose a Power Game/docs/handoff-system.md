# How the hand-off system works

Long chats get slow and forgetful, so work is split into **jobs** that move to a fresh chat at
checkpoints. The procedure itself is in [.claude/skills/handoff/SKILL.md](../.claude/skills/handoff/SKILL.md).

| Piece | What it does, in plain English |
|---|---|
| `scripts/stay-in-project.js` | Runs before every file or shell tool call. Works out the real location of every path (following `~`, `..`, symlinks, Windows drive letters and letter case) and refuses the call if it points outside this folder. MCP tools are not checked. |
| `.claude/settings.json` deny rules | A second fence: Claude Code itself refuses to read `~/.ssh`, `~/.aws`, `.env` files and browser profiles. |
| `scripts/chat-size-check.js` | After every prompt and tool call, reads the last part of the chat log, finds how many tokens the latest reply used, and compares it with the checkpoints in `.claude/handoff-config.json`. The first time a checkpoint is passed it slips a note to Claude saying how urgently to hand off. It remembers which notes it showed in `.claude/handoff-state/` (not committed), and it never crashes or blocks. |
| `scripts/session-start.js` | When a chat starts, tells you and Claude the session id and whether a job is waiting to be resumed. After a compaction, warns that detail was lost and has Claude recommend a fresh chat. |
| `scripts/check-handoff.js` | Checks a job folder is complete before a hand-off is committed: all files and sections there, no `TODO`/`TBD`/`<...>` left, findings.md under 8 KB. `--resume` shows anything added since the hand-off; `--claude-md` checks CLAUDE.md is under 60 lines. |
| `scripts/test/run-tests.js` | Tests all of the above. Run `node scripts/test/run-tests.js`. |

## Known limits

- The shell check reads the command text, so it can be fooled by paths built at run time (e.g. a script
  that opens a file itself) and it over-blocks `cd ..` or `../` even when a command first `cd`s deeper.
- On Windows, one-letter words like `/c` are treated as command switches, not drive paths.
- The hooks need `node` on PATH. If Node is missing the hooks fail open (Claude Code treats the error as
  non-blocking), so the deny rules are the only fence until Node is back.
