# Hand-off: 1v1v1v1 table (2-4 players)

## Goal
for the 1v1 tables in my game, add a 1v1v1v1 table but make it so that 2, 3 or 4 players can sit on it
Source: user message, 2026-11-19 23:05

## Done when
No separate criteria given; the goal itself is the bar.
Source: user message, 2026-11-19 23:05

## Don'ts
None given. Carried over from jobs/2026-11-19-table-lobby/: Do not build the superpower/nerf draft UI yet
Source: user message (pasted), 2026-11-19 ~22:30

## Status
Built and saved (place v10). Solo playtest passed (F3). A real 3-4 player match has not been run (needs the user).

## Route so far
1. Built Table3 (4 seats) and arena Spawn3/Spawn4 (F1).
2. Generalised TableManager, MatchInstance and TableClient from 2 players to 2-4 (F2, D1-D3).
3. Solo playtest (F3), place saved v10.

## Next action
Ask the user to run Test > Clients and Servers with 3 or 4 players on Table3 (methods.md, "Multi-player test") and report the result; also re-run one 1v1 on Table1 to confirm nothing regressed.

## Read first
1. jobs/2026-11-19-ffa-table/findings.md
2. jobs/2026-11-19-ffa-table/methods.md

## Leads to re-check
None

## Results to reuse
- Studio: Workspace.Tables.Table3, Workspace.Arenas.Arena1.Spawns.Spawn3/Spawn4, ServerScriptService.TableManager/MatchInstance, StarterPlayerScripts.TableClient.
- Earlier system notes: jobs/2026-11-19-table-lobby/findings.md.

## Waiting on me
- Run the 3-4 player Clients-and-Servers test (MCP play is solo only).

## Don't redo
- Table3, spawns and the script changes (F1, F2). Read them with script_read instead of rewriting.

## Gotchas
- MCP play is solo only; a real match needs a Clients-and-Servers run by the user.
- Scripts exist only in Studio (no Rojo), not in this folder.

## Studio/Blender state
- Place saved in Studio: yes, Roblox version 10, 2026-11-19 23:08 (Edit mode, no playtest running).
- Rojo in sync: not used
- .blend files: none for this job.
- Only in Studio (not in this folder): everything listed in Results to reuse.

## Queue
None

## Chain so far
- Started by session 1f5a3716-acfb-40c2-b389-76d1d77c51c9 at 2026-11-19 23:05 (follow-up of jobs/2026-11-19-table-lobby/, which was at hand-off #2)
- Hand-off #1 saved 2026-11-19 23:10 by session 1f5a3716-acfb-40c2-b389-76d1d77c51c9
