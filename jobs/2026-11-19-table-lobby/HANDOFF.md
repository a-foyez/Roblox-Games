# Hand-off: 1v1 Table Lobby system

## Goal
Let's update our Phase 1 architecture to use an instanced 1v1 Table Lobby system instead of a single global round loop. Do not build the superpower/nerf draft UI yet—focus on the table seating, host controls, and isolated combat loop.

1. `TableManager` (Server): Detect tables in `Workspace.Tables` containing two `Seat` parts (`HostSeat` and `GuestSeat`). Track occupancy via `Occupant` changes. The first player seated becomes the `Host` (transferring host status if they leave while someone else is seated).
2. Host Settings UI (Client/Server): When a player is `Host`, show a simple ScreenGui allowing them to toggle two settings (`RoundsToWin`: 1, 3, or 5; `RoundTime`: 45s or 60s) validated on the server, plus a `Start Match` button enabled only when 2 players are seated.
3. `MatchInstance` (Server OOP Class): When the Host clicks Start, instantiate an isolated `MatchInstance` for those two players, teleport them to `Workspace.Arenas.Arena1` spawns, run the `Combat` → `Cleanup` loop, and return them to the lobby when the series ends.
4. `AbilityService`: Keep the modular `OnEquip`, `OnActivate`, and `OnUnequip` hooks with our hardcoded test Dash (`E`) and `-25% WalkSpeed` nerf auto-applied per `MatchInstance`.

Ensure all RemoteEvents validate that the firing player is actually the current `Host` of that specific table."
Source: user message (pasted), 2026-11-19 ~22:30

## Done when
No separate criteria given; the goal itself is the bar (all four numbered items plus host validation on every RemoteEvent).
Source: user message (pasted), 2026-11-19 ~22:30

## Don'ts
Do not build the superpower/nerf draft UI yet
Source: user message (pasted), 2026-11-19 ~22:30

## Status
All four items built, place saved (v9). Solo playtest passed (F4, F5); user ran the 2-player test 2026-11-19 23:01 and reported it in order (F8). Host stand-up hand-over confirmed by the user (F7). Job closed 2026-11-19 23:04.

## Route so far
1. Found the place was a bare baseplate; no AbilityService existed, so it was created new (F1).
2. Built Workspace.Tables (2 tables), Workspace.Arenas.Arena1, ReplicatedStorage.Remotes (F2).
3. Wrote AbilityService, MatchInstance, TableManager (F3, D1-D5).

## Next action
None. Job closed.

## Read first
1. jobs/2026-11-19-table-lobby/findings.md
2. jobs/2026-11-19-table-lobby/methods.md

## Leads to re-check
None

## Results to reuse
- Studio place "Choose a Power, GET NERFED!" (studio id from list_roblox_studios): Workspace.Tables.Table1/Table2, Workspace.Arenas.Arena1 (Floor, Wall x4, Spawns.Spawn1/Spawn2), ReplicatedStorage.Remotes.HostAction/Ability, ServerScriptService.AbilityService/MatchInstance/TableManager.

## Waiting on me
None

## Don't redo
- World build and the three server scripts (F2, F3). Read them with script_read instead of rewriting.

## Gotchas
- Scripts exist only in Studio (no Rojo), not in this folder.
- search_game_tree without a path dumps everything; pass a path.
- The client owns its character physics, so Dash velocity must be set on the client after the server approves (D3).
- MCP play is solo only; Start Match needs 2 players, so the full loop needs a Test > Clients and Servers run by the user.

## Studio/Blender state
- Place saved in Studio: yes, Roblox version 8, 2026-11-19 22:45 (Edit mode, no playtest running).
- Rojo in sync: not used
- .blend files: none for this job.
- Only in Studio (not in this folder): everything listed in Results to reuse.

## Queue
None

## Chain so far
- Started by session a9fdb504-1f02-477d-b3aa-f186305073f1 at 2026-11-19 22:30
- Hand-off #1 saved 2026-11-19 22:47 by session a9fdb504-1f02-477d-b3aa-f186305073f1
- Resumed by session 52d4762b-afa3-4ef1-8084-ea98b9b2261e at 2026-11-19 22:49
- Hand-off #2 saved 2026-11-19 22:53 by session 52d4762b-afa3-4ef1-8084-ea98b9b2261e
- Resumed by session 808080b7-b61c-436c-bbdc-d15f0ac0506c at 2026-11-19 23:01
- Follow-up work continued in jobs/2026-11-19-ffa-table/
