# Hand-off: Custom Blender arenas (part 8)

## Goal
the main goal is to implement the maps attached to the roblox game as playable arenas. remove the placeholder ones. and specifically for the skyscraper map apparently theres too many background buildings so lower it to a optimal level.

i think you should just take the gemini prompt as a vague gauge of what i want.
(Gemini prompt summary: auto spawn points per map, an out-of-bounds kill zone under each arena (highrise especially), map vote lists ArenaTemplates children, and a note on MeshPart collision settings to check.)
Source: user message (first of session 50c0cdd5), 2026-11-22 ~14:00; carried over from jobs/2026-11-22-custom-arenas/ via -2 to -7

## Done when
the main goal is to implement the maps attached to the roblox game as playable arenas. remove the placeholder ones.
Source: same message (no separate done-when given)

## Don'ts
None given.
Source: same message

## Status
Closed at hand-off #3, continued in jobs/2026-11-22-custom-arenas-9/
(At hand-off #2:) Highrise, Farm and Colosseum DONE (3 of 5 in ArenaTemplates). Moon-base exported to .glb, not uploaded yet (F23). Beach not started. Placeholders still parked in ServerStorage._PlaceholderHold. Place saved v54 (unchanged since).

## Route so far
1. Located the 5 maps (F1); the Blender bridge works (F2).
2. Vote/spawn contract known (F3); KillZone only zeroes Health (F4, D4); each map needs its own KillZone (F9).
3. Highrise finished (F10-F14, D2, D6). Farm finished (F15, F16).
4. All SlipZones removed; vote screen hides empty cards (F17, D8). Barrier_* walls are kept as invisible solid walls (F18).
5. Colosseum exported, uploaded (F19), inserted, fixed, tested, statue solid (F21, D9); statue collision proven in play (F22).
6. Moon-base inventoried and exported, no trim needed (F23).

## Next action
Moon-base: upload assets/arenas/export/moon-base.glb as Arena_MoonBase (methods "Export and upload" steps 3-4), insert_asset into ServerStorage, "Fix an imported map" (background = "Deco_"; drop the 1 SlipZone_*, keep the 16 Barrier_* invisible; floor = Floor_D9DCE0), "Test a map solo", save. Then beach, one per chat. When all 5 maps are in ArenaTemplates, delete ServerStorage._PlaceholderHold and save.

## Read first
1. jobs/2026-11-22-custom-arenas-8/findings.md
2. jobs/2026-11-22-custom-arenas-8/methods.md

## Leads to re-check
- F23: moon-base.glb exists in assets/arenas/export (check with ls; ~2.47 MB).

## Results to reuse
- ArenaTemplates: Arena_Highrise (asset 118252970461216), Arena_Farm (117768832918480), Arena_Colosseum (95952731137542).
- ServerScriptService.ArenaZones handles every KillZone-tagged part with no per-map code (F12).
- assets/arenas/export/highrise.glb, farm.glb, colosseum.glb, moon-base.glb.
- methods.md: Open a map, Export and upload, Fix an imported map, Test a map solo (rewrite scripts from the steps).

## Waiting on me
- Optional: the user may delete ServerStorage._RemovedMapBlocks (now 23 SlipZones) once sure they're not wanted back.

## Don't redo
- The map vote registry already loops ArenaTemplates:GetChildren() (F3); DraftClient already hides empty vote cards (F17).
- Everything on highrise, farm and colosseum (F10-F22). The moon-base inventory and export (F23).
- Asking the user about upload, permissions, the highrise trim (D3) or the statue (D9).

## Gotchas
- The stay-in-project hook blocks paths outside the project (/tmp too), trips on a `\` line continuation, and on sed scripts containing `/`-paths. Run Bash from the project root with relative paths, one line; use Edit for file edits.
- The auto-mode classifier blocked :Destroy() on map parts; moving them to a ServerStorage folder worked (F17). Destroying the emptied import package worked.
- Set part properties AFTER moving parts out of the imported package: CollisionFidelity set inside the package did not stick (F22).
- script_grep takes Luau patterns, so `a|b` never matches. script_read with a line range errors.
- No python on PATH. Edit files with Write/Edit.
- The Edit datamodel is unavailable during play: stop play before changing script Source.
- GetPartBoundsInBox on the map always hits (bounding boxes). Use GetPartsInPart for free-spot checks.
- .blend files can hold several scenes (F15, F19). From the bridge, bpy.context.window is None: set the scene with `bpy.context.window_manager.windows[0].scene = bpy.data.scenes["<Scene>"]`.
- The glTF exporter prints a line per object: wrap the export in contextlib.redirect_stdout.
- Upload operations take ~30 s to finish: wait (execute_luau task.wait(20)) between polls.
- Studio id: a8dafb2f-40d9-403c-96ba-00336a2bf161 (re-check with list_roblox_studios).
- MCP play is solo only and a real match needs 2 players, so use "Test a map solo".
- The checkpoint arrives early: keep each chat to one map.

## Studio/Blender state
- Place saved in Studio: yes (v54, Team Create), play stopped.
- Rojo in sync: not used
- .blend files: moon-base.blend open in live Blender, unmodified (only the active scene was switched; not saved, no need). Others unmodified. highrise.glb, farm.glb, colosseum.glb, moon-base.glb exported.
- Only in Studio (not in this folder): all scripts incl. ArenaZones and DraftClient, ArenaTemplates.Arena_Highrise/Farm/Colosseum, ServerStorage._PlaceholderHold (Arena_Classic/Lava/Sky), ServerStorage._RemovedMapBlocks (23 SlipZone parts)

## Queue
None

## Chain so far
- Started by session 6aec579b-b814-401d-b096-686ede6a182c at 2026-11-22 15:37 (continues jobs/2026-11-22-custom-arenas-7/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-22 15:38 by session 6aec579b-b814-401d-b096-686ede6a182c
- Resumed by session e5d30e45-b79e-4130-b10d-6944ef54cec1 at 2026-11-22 15:38
- Hand-off #2 saved 2026-11-22 15:44 by session e5d30e45-b79e-4130-b10d-6944ef54cec1
- Resumed by session ceb7cb1c-229d-4ff7-a947-38f2dd392f27 at 2026-11-22 15:42
- Closed, continued in jobs/2026-11-22-custom-arenas-9/
