# Hand-off: basic monster in Blender, imported into Studio

## Goal
can you create a basic monster in blender and import it to the roblox game
Source: user message, 2026-10-31 19:22

## Done when
can you create a basic monster in blender and import it to the roblox game
Source: user message, 2026-10-31 19:22 (no separate criteria given; the goal itself is the bar)

## Don'ts
None stated for this job.
Source: user message, 2026-10-31 19:22

## Status
Done and verified. Monster model built and imported (F5); follow-up request "make the monster move around and throw fireballs" (user message 2026-10-31 19:30) is done and playtested (F6). Only the user's place save is left.

## Route so far
1. Basic map built in Blender and recreated in Studio as Parts (see findings: F2, F3, D1).
2. Old chat lost its MCPs (F1); new session reconnected, re-checked the map (F4).
3. Monster built in Blender, exported, recreated in Studio as Workspace.Monster (F5).
4. MonsterAI script added and playtested: wanders, chases, throws fireballs that damage (F6, D2).

## Next action
Ask whether the user saved the place (Ctrl+S). If they want more (e.g. monster health, pathfinding around blocks), start from findings F6/D2.

## Read first
1. jobs/2026-10-31-basic-monster/findings.md

## Leads to re-check
- F6: ServerScriptService.MonsterAI and Workspace.Monster still exist (place save unconfirmed); re-run methods.md "Re-check the monster AI" if anything changed.

## Results to reuse
- assets/basic_map.blend/.fbx, assets/monster.blend/.fbx (committed).
- Workspace.BasicMap, Workspace.Monster, ServerScriptService.MonsterAI in the Studio place.

## Waiting on me
The user must press Ctrl+S in Studio to save the place.

## Don't redo
- The basic map and the monster model (Blender, FBX, Studio Parts) are done and verified by screenshot.
- MonsterAI is done and verified by playtest.

## Gotchas
- Studio MCP cannot open local FBX files; recreate simple shapes as Parts from Blender transforms, or the user imports via File > Import 3D (see findings: D1).
- Blender is Z-up, Roblox Y-up: Roblox (x,y,z) = Blender (x,z,-y). Check rotation sign on tilted parts.
- Blender save_as writes a .blend1 backup; do not commit it.
- Bash cannot touch paths outside the project (stay-in-project hook), so no Blender CLI.
- The monster model faces +Z, so CFrame.lookAt needs a half turn (done in MonsterAI).
- MonsterAI source exists only in Studio (no Rojo), not in this folder.

## Studio/Blender state
- Place saved in Studio: unknown; user asked to press Ctrl+S. Playtest stopped, Studio in Edit mode.
- Rojo in sync: not used
- .blend files: assets/basic_map.blend, assets/monster.blend saved; basic_map.fbx, monster.fbx exported. The open Blender session itself is unsaved (holds both collections).
- Only in Studio (not in this folder): Workspace.BasicMap, Workspace.Monster, ServerScriptService.MonsterAI; Baseplate moved to ServerStorage.

## Queue
None

## Chain so far
- Started by session 207767db-91c6-4b71-a7dc-9ab3284b869a at 2026-10-31 19:26
- Hand-off #1 saved 2026-10-31 19:27 by session 207767db-91c6-4b71-a7dc-9ab3284b869a
- Resumed by session a7e2e4ce-be1c-4fc5-8132-3930fec63934 at 2026-10-31 19:27
- Hand-off #2 saved 2026-10-31 19:33 by session a7e2e4ce-be1c-4fc5-8132-3930fec63934
