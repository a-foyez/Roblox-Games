# Hand-off: Custom Blender arenas (part 3)

## Goal
the main goal is to implement the maps attached to the roblox game as playable arenas. remove the placeholder ones. and specifically for the skyscraper map apparently theres too many background buildings so lower it to a optimal level.

i think you should just take the gemini prompt as a vague gauge of what i want.
(Gemini prompt summary: auto spawn points per map, an out-of-bounds kill zone under each arena (highrise especially), map vote lists ArenaTemplates children, and a note on MeshPart collision settings to check.)
Source: user message (first of session 50c0cdd5), 2026-11-22 ~14:00; carried over from jobs/2026-11-22-custom-arenas/ via jobs/2026-11-22-custom-arenas-2/

## Done when
the main goal is to implement the maps attached to the roblox game as playable arenas. remove the placeholder ones.
Source: same message (no separate done-when given)

## Don'ts
None given.
Source: same message

## Status
Highrise is done and playable: in ArenaTemplates, KillZone script live, solo spawn + fall test passed (F12). Placeholders parked in ServerStorage._PlaceholderHold (not deleted). Farm, colosseum, moon-base, beach untouched. SlipZones undecided. Place saved v47.

## Route so far
1. Located the 5 maps (F1); Blender bridge works (F2).
2. Vote/spawn contract known (F3); death = Health <= 0 poll, so KillZone just zeroes Health (F4, D4).
3. Inventoried all maps (F6, F8); user answers in (D3). Arenas sit at Y+10000, so each needs its own KillZone (F9).
4. Highrise trimmed per D2, exported, uploaded, imported, fixed and wrapped (F10, F5, F11).
5. ArenaZones script added, highrise moved into ArenaTemplates, tested (F12).

## Next action
Decide SlipZones (D4: server push vs tilt) and apply to highrise. Then do farm, colosseum, moon-base, beach, one at a time, with methods.md "Open a map", "Export and upload", "Fix an imported map" (check each map's background-part naming for step 2) and "Test a map solo". When all 5 are in ArenaTemplates, delete ServerStorage._PlaceholderHold (the placeholders) and save.

## Read first
1. jobs/2026-11-22-custom-arenas-3/findings.md
2. jobs/2026-11-22-custom-arenas-3/methods.md

## Leads to re-check
- F12: ArenaTemplates holds only Arena_Highrise; _PlaceholderHold holds the 3 placeholders; ServerScriptService.ArenaZones exists.

## Results to reuse
- Asset 118252970461216 (highrise Model); ServerStorage.ArenaTemplates.Arena_Highrise (F11, F12).
- ServerScriptService.ArenaZones handles every KillZone-tagged part, no per-map code needed (F12).
- assets/arenas/highrise.blend and assets/arenas/export/highrise.glb (F10).
- methods.md: Export and upload, Fix an imported map, Test a map solo.

## Waiting on me
None

## Don't redo
- Map vote registry already loops ArenaTemplates:GetChildren() (F3).
- TableManager read (F9; startMatch needs 2 seated players). Highrise trim, export, upload, import fix, spawn scan, KillZone script and test (F10-F12).
- Asking the user about upload, permissions, SlipZones or highrise trim (D3).

## Gotchas
- stay-in-project hook blocks paths outside the project (also /tmp). Run Bash from the project root with relative paths.
- script_grep takes Luau patterns: `a|b` never matches. Search one word per call.
- script_read partial reads need both start_line_one_indexed and end_line_one_indexed_inclusive.
- No python on PATH; edit files with Write/Edit.
- Friction 0 does not push a standing Humanoid; SlipZones need a push or a tilt (D4).
- GetPartBoundsInBox on the map always hits (bounding boxes); use GetPartsInPart for free-spot checks.
- Studio id: a8dafb2f-40d9-403c-96ba-00336a2bf161 (re-check with list_roblox_studios).
- MCP play is solo only; a real match can't start (needs 2), so use "Test a map solo".
- This chat's system prompt is large: the 50% checkpoint arrives early, so keep each chat to one map.

## Studio/Blender state
- Place saved in Studio: yes (v47, Team Create)
- Rojo in sync: not used
- .blend files: highrise.blend trimmed and saved, exported to assets/arenas/export/highrise.glb; others unmodified; Blender last had highrise.blend open, saved
- Only in Studio (not in this folder): all scripts incl. new ArenaZones, ArenaTemplates.Arena_Highrise, ServerStorage._PlaceholderHold (Arena_Classic/Lava/Sky)

## Queue
None

## Chain so far
- Started by session 77bb61bc-88c5-4636-bac7-5c7047c0ae64 at 2026-11-22 14:36 (continues jobs/2026-11-22-custom-arenas-2/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-22 14:37 by session 77bb61bc-88c5-4636-bac7-5c7047c0ae64
- Resumed by session 03ca2f93-5d1f-41d7-aca3-c03cf0cce9e6 at 2026-11-22 14:39
- Hand-off #2 saved 2026-11-22 14:41 by session 03ca2f93-5d1f-41d7-aca3-c03cf0cce9e6
