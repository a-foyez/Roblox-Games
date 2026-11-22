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
Highrise DONE (F12-F14). Farm exported to assets/arenas/export/farm.glb but not yet uploaded (F15). Colosseum, moon-base and beach untouched. Placeholders are still parked in ServerStorage._PlaceholderHold. Place saved v50.

## Route so far
1. Located the 5 maps (F1); the Blender bridge works (F2).
2. Vote/spawn contract known (F3); KillZone only zeroes Health (F4, D4); each map needs its own KillZone (F9).
3. Inventoried all maps (F8); user answers in (D3).
4. Highrise finished (F10, F5, F11-F14, D5, D6).
5. Farm: the extra groups were other scenes in farm.blend; the Farm scene needs no trim; exported (F15).

## Next action
Upload assets/arenas/export/farm.glb (methods.md "Export and upload", steps 3-4, displayName Arena_Farm). Then insert_asset into ServerStorage and run "Fix an imported map" (background = name starts "Deco_"; 6 SlipZone_F0x parts) and "Test a map solo". Then do colosseum, moon-base and beach, one per chat. Check first whether colosseum.blend and moon-base.blend also hold several scenes (F15): export only the matching scene. When all 5 maps are in ArenaTemplates, delete ServerStorage._PlaceholderHold and save.

## Read first
1. jobs/2026-11-22-custom-arenas-5/findings.md
2. jobs/2026-11-22-custom-arenas-5/methods.md

## Leads to re-check
None

## Results to reuse
- Asset 118252970461216 (highrise Model); ServerStorage.ArenaTemplates.Arena_Highrise.
- ServerScriptService.ArenaZones handles every KillZone- and SlipZone-tagged part, with no per-map code (F12, F13).
- assets/arenas/export/highrise.glb and farm.glb (F10, F15).
- methods.md: Open a map, Export and upload, Fix an imported map, Test a map solo.

## Waiting on me
None

## Don't redo
- The map vote registry already loops ArenaTemplates:GetChildren() (F3).
- Everything on highrise (F10-F14).
- The farm trim decision and export (F15): no trim, the glb exists.
- Asking the user about upload, permissions, SlipZones or the highrise trim (D3).

## Gotchas
- The stay-in-project hook blocks paths outside the project (/tmp too). Run Bash from the project root with relative paths.
- script_grep takes Luau patterns, so `a|b` never matches. Search one word per call.
- script_read partial reads need both start_line_one_indexed and end_line_one_indexed_inclusive.
- No python on PATH. Edit files with Write/Edit.
- The Edit datamodel is unavailable during play: stop play before changing script Source.
- Touched fires only on new contact, so one failed SlipZone push leaves the player standing there.
- GetPartBoundsInBox on the map always hits (bounding boxes). Use GetPartsInPart for free-spot checks.
- .blend files can hold several scenes; bpy.data.objects counts all of them. Count per collection/scene (F15).
- Studio id: a8dafb2f-40d9-403c-96ba-00336a2bf161 (re-check with list_roblox_studios).
- MCP play is solo only and a real match needs 2 players, so use "Test a map solo".
- The checkpoint arrives early: keep each chat to one map.
- findings.md is near the 8 KB cap: shorten finished-map entries when adding new ones.

## Studio/Blender state
- Place saved in Studio: yes (v50, Team Create), play stopped
- Rojo in sync: not used
- .blend files: farm.blend open in live Blender (active scene set to Farm, unmodified, is_dirty false); farm.glb exported. highrise.blend saved earlier. Others unmodified.
- Only in Studio (not in this folder): all scripts incl. ArenaZones, ArenaTemplates.Arena_Highrise, ServerStorage._PlaceholderHold (Arena_Classic/Lava/Sky)

## Queue
None

## Chain so far
- Started by session b3c04190-b20e-4167-8d44-b618888592fb at 2026-11-22 14:53 (continues jobs/2026-11-22-custom-arenas-4/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-22 14:54 by session b3c04190-b20e-4167-8d44-b618888592fb
- Resumed by session 75777247-4391-4616-9192-3936353551a5 at 2026-11-22 14:54
