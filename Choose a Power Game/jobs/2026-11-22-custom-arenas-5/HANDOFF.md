# Hand-off: Custom Blender arenas (part 5)

## Goal
the main goal is to implement the maps attached to the roblox game as playable arenas. remove the placeholder ones. and specifically for the skyscraper map apparently theres too many background buildings so lower it to a optimal level.

i think you should just take the gemini prompt as a vague gauge of what i want.
(Gemini prompt summary: auto spawn points per map, an out-of-bounds kill zone under each arena (highrise especially), map vote lists ArenaTemplates children, and a note on MeshPart collision settings to check.)
Source: user message (first of session 50c0cdd5), 2026-11-22 ~14:00; carried over from jobs/2026-11-22-custom-arenas/ via -2, -3 and -4

## Done when
the main goal is to implement the maps attached to the roblox game as playable arenas. remove the placeholder ones.
Source: same message (no separate done-when given)

## Don'ts
None given.
Source: same message

## Status
Highrise DONE (F10-F14). Farm DONE (F16). Colosseum, moon-base and beach untouched. Placeholders still parked in ServerStorage._PlaceholderHold. Place saved v51.

## Route so far
1. Located the 5 maps (F1); the Blender bridge works (F2).
2. Vote/spawn contract known (F3); KillZone only zeroes Health (F4, D4); each map needs its own KillZone (F9).
3. Inventoried all maps (F8); user answers in (D3).
4. Highrise finished (F10-F14, D5, D6).
5. Farm finished: one scene of a multi-scene file (F15), uploaded, fixed, tested (F16, D7).

## Next action
Colosseum: open assets/arenas/colosseum.blend (methods "Open a map"), list its scenes first (F15) and set the active scene to "Colosseum". Inventory meshes (67.4k polys, F8: check for background layers to mark or trim), then "Export and upload" (displayName Arena_Colosseum), "Fix an imported map", "Test a map solo". Then moon-base and beach, one per chat. When all 5 maps are in ArenaTemplates, delete ServerStorage._PlaceholderHold and save.

## Read first
1. jobs/2026-11-22-custom-arenas-5/findings.md
2. jobs/2026-11-22-custom-arenas-5/methods.md

## Leads to re-check
None

## Results to reuse
- ArenaTemplates now holds Arena_Highrise (asset 118252970461216) and Arena_Farm (asset 117768832918480).
- ServerScriptService.ArenaZones handles every KillZone- and SlipZone-tagged part, no per-map code (F12, F13).
- assets/arenas/export/highrise.glb and farm.glb.
- methods.md: Open a map, Export and upload, Fix an imported map, Test a map solo (scripts were run inline, not saved as files: rewrite them from the steps).

## Waiting on me
None

## Don't redo
- The map vote registry already loops ArenaTemplates:GetChildren() (F3).
- Everything on highrise (F10-F14) and farm (F16).
- Asking the user about upload, permissions, SlipZones or the highrise trim (D3).

## Gotchas
- The stay-in-project hook blocks paths outside the project (/tmp too) and also trips on a `\` line continuation in Bash. Run Bash from the project root with relative paths, one line.
- script_grep takes Luau patterns, so `a|b` never matches. Search one word per call.
- No python on PATH. Edit files with Write/Edit.
- The Edit datamodel is unavailable during play: stop play before changing script Source.
- Touched fires only on new contact, so one failed SlipZone push leaves the player standing there.
- GetPartBoundsInBox on the map always hits (bounding boxes). Use GetPartsInPart for free-spot checks.
- .blend files can hold several scenes; count per collection/scene (F15).
- Upload operations take ~30 s to finish: wait (execute_luau task.wait(20)) between polls.
- Studio id: a8dafb2f-40d9-403c-96ba-00336a2bf161 (re-check with list_roblox_studios).
- MCP play is solo only and a real match needs 2 players, so use "Test a map solo".
- The checkpoint arrives early: keep each chat to one map.
- findings.md is near the 8 KB cap: shorten finished-map entries when adding new ones.

## Studio/Blender state
- Place saved in Studio: yes (v51, Team Create), play stopped
- Rojo in sync: not used
- .blend files: farm.blend open in live Blender (unmodified). highrise.blend saved earlier. Others unmodified. highrise.glb and farm.glb exported.
- Only in Studio (not in this folder): all scripts incl. ArenaZones, ArenaTemplates.Arena_Highrise and Arena_Farm, ServerStorage._PlaceholderHold (Arena_Classic/Lava/Sky)

## Queue
None

## Chain so far
- Started by session b3c04190-b20e-4167-8d44-b618888592fb at 2026-11-22 14:53 (continues jobs/2026-11-22-custom-arenas-4/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-22 14:54 by session b3c04190-b20e-4167-8d44-b618888592fb
- Resumed by session 75777247-4391-4616-9192-3936353551a5 at 2026-11-22 14:54
- Hand-off #2 saved 2026-11-22 14:59 by session 75777247-4391-4616-9192-3936353551a5
