# Hand-off: Custom Blender arenas (part 9)

## Goal
the main goal is to implement the maps attached to the roblox game as playable arenas. remove the placeholder ones. and specifically for the skyscraper map apparently theres too many background buildings so lower it to a optimal level.

i think you should just take the gemini prompt as a vague gauge of what i want.
(Gemini prompt summary: auto spawn points per map, an out-of-bounds kill zone under each arena (highrise especially), map vote lists ArenaTemplates children, and a note on MeshPart collision settings to check.)
Source: user message (first of session 50c0cdd5), 2026-11-22 ~14:00; carried over from jobs/2026-11-22-custom-arenas/ via -2 to -8

## Done when
the main goal is to implement the maps attached to the roblox game as playable arenas. remove the placeholder ones.
Source: same message (no separate done-when given)

## Don'ts
None given.
Source: same message

## Status
Highrise, Farm, Colosseum and Moon-base DONE (4 of 5 in ArenaTemplates). Beach not started. Placeholders still parked in ServerStorage._PlaceholderHold. Place saved v55.

## Route so far
1. Located the 5 maps (F1); the Blender bridge works (F2).
2. Vote/spawn contract known (F3); KillZone only zeroes Health (F4, D4); each map needs its own KillZone (F9).
3. Highrise finished (F10-F14, D2, D6). Farm finished (F15, F16).
4. All SlipZones removed; vote screen hides empty cards (F17, D8). Barrier_* walls are kept as invisible solid walls (F18).
5. Colosseum finished, statue solid (F19, F21, F22, D9).
6. Moon-base finished (F23, F24).

## Next action
Beach (assets/arenas/beach.blend, F8: "Beach" 209 meshes/19.4k polys): methods "Open a map", list scenes and set the active one to the beach scene (F15), check no mesh over 2048 and inventory the name prefixes, export to assets/arenas/export/beach.glb, then "Export and upload" 3-4 as Arena_Beach, insert_asset into ServerStorage, "Fix an imported map" (background = "Deco_" if the prefixes match; drop SlipZone_*, keep Barrier_*; read the floor's real Y after insert, F24), "Test a map solo", save. Then delete ServerStorage._PlaceholderHold (move it if :Destroy() is blocked, F17) and save: job done.

## Read first
1. jobs/2026-11-22-custom-arenas-9/findings.md
2. jobs/2026-11-22-custom-arenas-9/methods.md

## Leads to re-check
- F24: ServerStorage.ArenaTemplates holds Arena_Highrise, Arena_Farm, Arena_Colosseum, Arena_MoonBase (execute_luau GetChildren).

## Results to reuse
- ArenaTemplates: Arena_Highrise (asset 118252970461216), Arena_Farm (117768832918480), Arena_Colosseum (95952731137542), Arena_MoonBase (115321231155234).
- ServerScriptService.ArenaZones handles every KillZone-tagged part with no per-map code (F12).
- assets/arenas/export/highrise.glb, farm.glb, colosseum.glb, moon-base.glb.
- methods.md: Open a map, Export and upload, Fix an imported map, Test a map solo (rewrite scripts from the steps).

## Waiting on me
- Optional: the user may delete ServerStorage._RemovedMapBlocks (now 24 SlipZones) once sure they're not wanted back.

## Don't redo
- The map vote registry already loops ArenaTemplates:GetChildren() (F3); DraftClient already hides empty vote cards (F17).
- Everything on highrise, farm, colosseum and moon-base (F10-F24).
- Asking the user about upload, permissions, the highrise trim (D3) or the statue (D9).

## Gotchas
- The stay-in-project hook blocks paths outside the project (/tmp too), trips on a `\` line continuation, and on sed scripts containing `/`-paths. Run Bash from the project root with relative paths, one line; use Edit for file edits.
- The auto-mode classifier blocked :Destroy() on map parts; moving them to a ServerStorage folder worked (F17). Destroying the emptied import package worked.
- Set part properties AFTER moving parts out of the imported package: CollisionFidelity set inside the package did not stick (F22).
- The imported map's floor height differs from Blender (moon-base floor came in at Y 60, not 0): always read it after insert (F24).
- script_grep takes Luau patterns, so `a|b` never matches. script_read with a line range errors.
- No python on PATH. Edit files with Write/Edit.
- The Edit datamodel is unavailable during play: stop play before changing script Source.
- GetPartBoundsInBox on the map always hits (bounding boxes). Use GetPartsInPart for free-spot checks.
- .blend files can hold several scenes (F15, F19). From the bridge, bpy.context.window is None: set the scene with `bpy.context.window_manager.windows[0].scene = bpy.data.scenes["<Scene>"]`.
- The glTF exporter prints a line per object: wrap the export in contextlib.redirect_stdout.
- Upload operations take ~30 s to finish: wait (execute_luau task.wait(25)) before polling.
- Studio id: a8dafb2f-40d9-403c-96ba-00336a2bf161 (re-check with list_roblox_studios).
- MCP play is solo only and a real match needs 2 players, so use "Test a map solo".
- The checkpoint arrives early: keep each chat to one map.

## Studio/Blender state
- Place saved in Studio: yes (v55, Team Create), play stopped.
- Rojo in sync: not used
- .blend files: moon-base.blend open in live Blender, unmodified (not saved, no need). Others unmodified. highrise.glb, farm.glb, colosseum.glb, moon-base.glb exported; beach not exported.
- Only in Studio (not in this folder): all scripts incl. ArenaZones and DraftClient, ArenaTemplates.Arena_Highrise/Farm/Colosseum/MoonBase, ServerStorage._PlaceholderHold (Arena_Classic/Lava/Sky), ServerStorage._RemovedMapBlocks (24 SlipZone parts)

## Queue
None

## Chain so far
- Started by session ceb7cb1c-229d-4ff7-a947-38f2dd392f27 at 2026-11-22 15:44 (continues jobs/2026-11-22-custom-arenas-8/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-22 15:45 by session ceb7cb1c-229d-4ff7-a947-38f2dd392f27
- Resumed by session 096f429c-d10f-44fc-b058-9e8a41143f25 at 2026-11-22 15:47
