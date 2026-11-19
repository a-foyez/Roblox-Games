# Hand-off: 1v1v1v1 table (2-4 players), part 2

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
Everything is built. The health bar fix (F8) most likely works: the failed run used an old server (F10). Needs one fresh Clients and Servers run to confirm, then Done.

## Route so far
1. Part 1 (jobs/2026-11-19-ffa-table/): Table3, 2-4 player TableManager/MatchInstance/TableClient, grass, hidden spawn, death animation, spectator mode (F1-F6).
2. Death pose drop tuned to 2.1, flush with Arena1.Floor (F5).
3. User's 3-player test passed (F7).
4. Overhead health bar hidden on knock-out (F8); user says the bar still shows (F9).
5. Code re-checked and a solo dummy test run: solo cannot show the bar (F9). Candidates: F10.

## Next action
Ask the user for one fresh Clients and Servers run (stop any running test first so the server reloads v13). No bar over knocked-out bodies -> set Status to Done. Bar still shows -> use the fix ideas in F9/F10.

## Read first
1. jobs/2026-11-19-ffa-table-2/findings.md
2. jobs/2026-11-19-ffa-table-2/methods.md

## Leads to re-check
- F8: confirm in a fresh multi-player run (user).

## Results to reuse
- Studio: Workspace.Tables.Table3, Workspace.Arenas.Arena1.Spawns.Spawn3/Spawn4, ServerScriptService.TableManager/MatchInstance, StarterPlayerScripts.TableClient/SpectateClient, Workspace.Baseplate, Workspace.SpawnLocation.
- Earlier system notes: jobs/2026-11-19-table-lobby/findings.md.

## Waiting on me
- A fresh Clients-and-Servers run to confirm F8.

## Don't redo
- F1-F7: built and tested. Read scripts with script_read instead of rewriting.
- Solo dummy bar test (F9): solo play shows no overhead bar, so it proves nothing.

## Gotchas
- MCP play is solo only; a real match and spectating need a Clients-and-Servers run by the user.
- Scripts exist only in Studio (no Rojo), not in this folder.
- The project hook blocks writes outside this folder, including the scratchpad; no Python on this machine (use node).
- The player's own top-right health bar still shows 1 HP while knocked out; only the overhead bar is hidden (user only asked about the body on the floor).

## Studio/Blender state
- Place saved in Studio: yes, Roblox version 13 (no changes since). Edit mode, playtest stopped (the test dummy was play-only and is gone).
- Rojo in sync: not used
- .blend files: none for this job.
- Only in Studio (not in this folder): everything listed in Results to reuse.

## Queue
None

## Chain so far
- Started by session 75757495-6f14-43e6-87a3-a7844a9a4502 at 2026-11-19 23:34 (continues jobs/2026-11-19-ffa-table/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-19 23:35 by session 75757495-6f14-43e6-87a3-a7844a9a4502
- Resumed by session 0eb94565-c48c-40d4-8869-902cdc35c417 at 2026-11-19 23:36
- Hand-off #2 saved 2026-11-19 23:45 by session 0eb94565-c48c-40d4-8869-902cdc35c417
