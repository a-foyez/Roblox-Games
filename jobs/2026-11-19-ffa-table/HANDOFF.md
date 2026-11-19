# Hand-off: 1v1v1v1 table (2-4 players)

## Goal
for the 1v1 tables in my game, add a 1v1v1v1 table but make it so that 2, 3 or 4 players can sit on it
Source: user message, 2026-11-19 23:05
Added: also, make the baseplate grass for now, hide the spawnpad, and implement a death animation, and when theres more than 1 player still remaining, create a spectator mode for the dead players
Source: user message, 2026-11-19 23:12

## Done when
No separate criteria given; the goal itself is the bar.
Source: user message, 2026-11-19 23:05

## Don'ts
None given. Carried over from jobs/2026-11-19-table-lobby/: Do not build the superpower/nerf draft UI yet
Source: user message (pasted), 2026-11-19 ~22:30

## Status
Closed at hand-off #3, continued in jobs/2026-11-19-ffa-table-2/

## Route so far
1. Built Table3 (4 seats) and arena Spawn3/Spawn4 (F1).
2. Generalised TableManager, MatchInstance and TableClient from 2 players to 2-4 (F2, D1-D3).
3. Solo playtest (F3), place saved v10.
4. Grass baseplate and hidden SpawnLocation (F4).
5. Death animation in _knockOut (F5, D4) and SpectateClient with the Fighting attribute (F6, D5); solo tested, saved v11.

## Next action
Ask the user to run Test > Clients and Servers with 3 or 4 players on Table3 (methods.md, "Multi-player test", steps 1-6) and report: knockouts fall over, spectate bar appears while 2+ fight, < > switch, bar goes at round end; also one 1v1 on Table1.

## Read first
1. jobs/2026-11-19-ffa-table/findings.md
2. jobs/2026-11-19-ffa-table/methods.md

## Leads to re-check
None (F5 re-checked 23:24, drop now 2.1, flush with floor).

## Results to reuse
- Studio: Workspace.Tables.Table3, Workspace.Arenas.Arena1.Spawns.Spawn3/Spawn4, ServerScriptService.TableManager/MatchInstance, StarterPlayerScripts.TableClient/SpectateClient, Workspace.Baseplate, Workspace.SpawnLocation.
- Earlier system notes: jobs/2026-11-19-table-lobby/findings.md.

## Waiting on me
- Run the 3-4 player Clients-and-Servers test (MCP play is solo only).

## Don't redo
- Table3, spawns, script changes, grass, hidden spawn, death animation, SpectateClient (F1-F6). Read them with script_read instead of rewriting.

## Gotchas
- MCP play is solo only; a real match and spectating need a Clients-and-Servers run by the user.
- Scripts exist only in Studio (no Rojo), not in this folder.
- The project hook blocks writes outside this folder, including the scratchpad; no Python on this machine (use node).

## Studio/Blender state
- Place saved in Studio: yes, Roblox version 12, 2026-11-19 23:25 (Edit mode, no playtest running).
- Rojo in sync: not used
- .blend files: none for this job.
- Only in Studio (not in this folder): everything listed in Results to reuse.

## Queue
None

## Chain so far
- Started by session 1f5a3716-acfb-40c2-b389-76d1d77c51c9 at 2026-11-19 23:05 (follow-up of jobs/2026-11-19-table-lobby/, which was at hand-off #2)
- Hand-off #1 saved 2026-11-19 23:10 by session 1f5a3716-acfb-40c2-b389-76d1d77c51c9
- Resumed by session fe0e179a-88f2-4592-9549-4a07b8f5c9cd at 2026-11-19 23:12
- Hand-off #2 saved 2026-11-19 23:16 by session fe0e179a-88f2-4592-9549-4a07b8f5c9cd
- Resumed by session 75757495-6f14-43e6-87a3-a7844a9a4502 at 2026-11-19 23:22
- Closed, continued in jobs/2026-11-19-ffa-table-2/
