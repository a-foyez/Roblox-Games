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
Not started on the model. Blocked in the old chat: the Blender and Roblox_Studio MCP servers dropped and would not come back in that session (see findings: F1).

## Route so far
1. Earlier job (same session): basic map built in Blender and recreated in Studio as Parts (see findings: F2, F3, D1).
2. Monster request arrived; MCP servers missing from the session, user reconnected, still missing (see findings: F1).

## Next action
Confirm the Blender and Roblox Studio MCP tools load (ToolSearch "blender", list_roblox_studios), then follow methods.md "Build and place the monster".

## Read first
1. jobs/2026-10-31-basic-monster/findings.md
2. jobs/2026-10-31-basic-monster/methods.md

## Leads to re-check
- F4: Workspace.BasicMap and the parked Baseplate in ServerStorage still exist in the open place.

## Results to reuse
- assets/basic_map.blend and assets/basic_map.fbx (committed in 01c2ebf).
- Workspace.BasicMap in the Studio place (Parts recreated from Blender data).

## Waiting on me
None

## Don't redo
- The basic map (Blender file, FBX and Studio Parts) is done and verified by screenshot.

## Gotchas
- Studio MCP cannot open local FBX files; recreate simple shapes as Parts from Blender transforms, or the user imports via File > Import 3D (see findings: D1).
- Blender is Z-up, Roblox Y-up: Roblox (x,y,z) = Blender (x,z,-y). Check rotation sign on tilted parts (the map ramp first came out backwards).
- Blender save_as writes a .blend1 backup; do not commit it.
- Bash cannot touch paths outside the project (stay-in-project hook), so no Blender CLI.

## Studio/Blender state
- Place saved in Studio: unknown; the user was told to press Ctrl+S after the map was added.
- Rojo in sync: not used
- .blend files: assets/basic_map.blend saved, assets/basic_map.fbx exported. No monster files yet.
- Only in Studio (not in this folder): Workspace.BasicMap; Baseplate moved to ServerStorage.

## Queue
None

## Chain so far
- Started by session 207767db-91c6-4b71-a7dc-9ab3284b869a at 2026-10-31 19:26
- Hand-off #1 saved 2026-10-31 19:27 by session 207767db-91c6-4b71-a7dc-9ab3284b869a
