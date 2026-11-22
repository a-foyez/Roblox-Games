# Hand-off: Custom Blender arenas (part 4)

## Goal
the main goal is to implement the maps attached to the roblox game as playable arenas. remove the placeholder ones. and specifically for the skyscraper map apparently theres too many background buildings so lower it to a optimal level.

i think you should just take the gemini prompt as a vague gauge of what i want.
(Gemini prompt summary: auto spawn points per map, an out-of-bounds kill zone under each arena (highrise especially), map vote lists ArenaTemplates children, and a note on MeshPart collision settings to check.)
Source: user message (first of session 50c0cdd5), 2026-11-22 ~14:00; carried over from jobs/2026-11-22-custom-arenas/ via jobs/2026-11-22-custom-arenas-2/ and jobs/2026-11-22-custom-arenas-3/

## Done when
the main goal is to implement the maps attached to the roblox game as playable arenas. remove the placeholder ones.
Source: same message (no separate done-when given)

## Don'ts
None given.
Source: same message

## Status
Highrise DONE: in ArenaTemplates, spawns + KillZone + 12 working SlipZones, H12 untagged (F12-F14, D6). Farm opened in Blender only (read, not modified); its contents look odd (F15). Colosseum, moon-base, beach untouched. Placeholders still parked in ServerStorage._PlaceholderHold. Place saved v50.

## Route so far
1. Located the 5 maps (F1); Blender bridge works (F2).
2. Vote/spawn contract known (F3); KillZone just zeroes Health (F4, D4); each map needs its own KillZone (F9).
3. Inventoried all maps (F8); user answers in (D3).
4. Highrise trimmed, exported, uploaded, imported, fixed, wrapped and tested (F10, F5, F11, F12).
5. SlipZones: server push via "Knockback" remote with lift 30 (D5, F13); H12 untagged, all 13 tested (D6, F14).
6. Farm inventory started (F15).

## Next action
Farm: first settle F15 (check bpy.data.filepath, list collections and which collection Lander/Rocket/Rover/Module/Sand/DustRing/Pad sit in; if moon-base parts are really in farm.blend, ask the user whether they belong). Then decide the farm trim (Deco_* background, 133k polys: likely drop the far ring as with highrise D2; ask the user if unsure), then methods.md "Export and upload", "Fix an imported map" (background = Deco_*) and "Test a map solo". Then colosseum, moon-base, beach, one per chat. When all 5 are in ArenaTemplates, delete ServerStorage._PlaceholderHold and save.

## Read first
1. jobs/2026-11-22-custom-arenas-4/findings.md
2. jobs/2026-11-22-custom-arenas-4/methods.md

## Leads to re-check
- F15: farm.blend group counts (Deco 276 meshes/133k polys, plus Lander/Rocket/Rover/Module groups) vs F8's 188 meshes/39k polys.

## Results to reuse
- Asset 118252970461216 (highrise Model); ServerStorage.ArenaTemplates.Arena_Highrise (F11-F14).
- ServerScriptService.ArenaZones handles every KillZone- and SlipZone-tagged part, no per-map code (F12, F13).
- assets/arenas/highrise.blend and assets/arenas/export/highrise.glb (F10).
- methods.md: Open a map, Export and upload, Fix an imported map, Test a map solo (the step 4 SlipZone loop tested all zones in one Server call, ~40 s).

## Waiting on me
None

## Don't redo
- Map vote registry already loops ArenaTemplates:GetChildren() (F3).
- Everything on highrise (F10-F14): it is finished.
- SlipZone approach choice (D5), lift tuning (F13), H12 fix (D6).
- Asking the user about upload, permissions, SlipZones or highrise trim (D3).

## Gotchas
- stay-in-project hook blocks paths outside the project (also /tmp). Run Bash from the project root with relative paths.
- script_grep takes Luau patterns: `a|b` never matches. Search one word per call.
- script_read partial reads need both start_line_one_indexed and end_line_one_indexed_inclusive.
- No python on PATH; edit files with Write/Edit.
- Edit datamodel is unavailable during play: stop play before changing script Source.
- Touched fires only on new contact, so one failed SlipZone push leaves the player standing there.
- GetPartBoundsInBox on the map always hits (bounding boxes); use GetPartsInPart for free-spot checks.
- Studio id: a8dafb2f-40d9-403c-96ba-00336a2bf161 (re-check with list_roblox_studios).
- MCP play is solo only; a real match can't start (needs 2), so use "Test a map solo".
- This chat's system prompt is large: the 50% checkpoint arrives early, so keep each chat to one map.
- findings.md is near the 8 KB cap: shorten finished-map entries when adding new ones.

## Studio/Blender state
- Place saved in Studio: yes (v50, Team Create), play stopped
- Rojo in sync: not used
- .blend files: highrise.blend trimmed and saved, exported to assets/arenas/export/highrise.glb; farm.blend open in live Blender, unmodified, not saved; others unmodified
- Only in Studio (not in this folder): all scripts incl. ArenaZones (KillZone + SlipZone), ArenaTemplates.Arena_Highrise, ServerStorage._PlaceholderHold (Arena_Classic/Lava/Sky)

## Queue
None

## Chain so far
- Started by session 0d634374-08b3-4b78-921a-4f312066fd6b at 2026-11-22 14:45 (continues jobs/2026-11-22-custom-arenas-3/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-22 14:46 by session 0d634374-08b3-4b78-921a-4f312066fd6b
- Resumed by session 3e0effb5-92cf-43c7-a22f-b969b8844a27 at 2026-11-22 14:47
- Hand-off #2 saved 2026-11-22 14:54 by session 3e0effb5-92cf-43c7-a22f-b969b8844a27
