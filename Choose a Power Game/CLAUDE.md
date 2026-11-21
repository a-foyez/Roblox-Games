# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

This folder holds "Choose a Power, GET NERFED!", a PvP Roblox game: players take turns picking a
superpower, the others vote it a nerf, then everyone sword-fights in the arena. The place lives in its own Studio
place of that name with no Rojo yet; this folder
holds the Claude Code setup, job notes and helper scripts. Claude edits the place through the Roblox Studio
MCP and makes models through the Blender MCP; both need their app open (setup: `docs/mcp-setup.md`).
Prefer the MCP tools to inspect and edit the live place rather than guessing at its structure.

## Folder map

- `.mcp.json`: Roblox Studio and Blender MCP servers.
- `.claude/settings.json`: hooks and deny rules. `.claude/handoff-config.json`: context checkpoints.
- `.claude/skills/handoff/`: hand-off and resume procedure, plus job folder templates.
- `scripts/`: hook scripts and `check-handoff.js`. `scripts/test/`: their tests.
- `jobs/<YYYY-MM-DD>-<topic>/`: one folder per job (HANDOFF.md, findings.md, methods.md, progress.md).
- `docs/`: longer docs (`mcp-setup.md`, `handoff-system.md`).

## Run and test

- Game: open the "Choose a Power, GET NERFED!" place in Studio and press Play (F5), or use the Studio MCP play tools.
- Tooling tests: `node scripts/test/run-tests.js` (Node built-ins only, no npm packages).
- Check a job folder: `node scripts/check-handoff.js jobs/<folder>/`. CLAUDE.md size: `--claude-md`.

## Luau conventions

- Use `--!strict` in new scripts.
- Server-authoritative: never trust the client. Validate every RemoteEvent/RemoteFunction argument on the server.
- Shared code in `ReplicatedStorage` ModuleScripts, server logic in `ServerScriptService`, client logic in `StarterPlayerScripts`. Avoid `_G`.
- Disconnect connections and clean up instances to avoid memory leaks.
- Wrap DataStore calls in `pcall` with retries; save on `PlayerRemoving` and `game:BindToClose`.

## Rules

- Only work inside this project folder. Never use `--add-dir` or widen access; if you need something outside it, tell the user what and why.
- Hand-offs are automatic: checkpoint notes and "hand off here" start the handoff skill (`.claude/skills/handoff/SKILL.md`). "stay in this chat" holds one until the next checkpoint.
- Never compact a chat; recommend a new one instead.
- Explain any code you write in plain English.
- Requests sent after a hand-off has started go in the job's Queue unless the user says "do it now".
- Keep this file under 60 lines. Longer material goes in the skill, a job's methods.md or `docs/`, referenced by path, never @-imported.
