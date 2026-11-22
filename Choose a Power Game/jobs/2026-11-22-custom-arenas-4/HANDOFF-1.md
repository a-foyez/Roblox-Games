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
Highrise playable in ArenaTemplates (F12). SlipZone push added and tagged on highrise (D5, F13): works on open tops, H12 untagged (D6), all zones tested (F14). Farm, colosseum, moon-base, beach untouched. Placeholders still parked in ServerStorage._PlaceholderHold. Place saved v50.

## Route so far
1. Located the 5 maps (F1); Blender bridge works (F2).
2. Vote/spawn contract known (F3); KillZone just zeroes Health (F4, D4); each map needs its own KillZone (F9).
3. Inventoried all maps (F6, F8); user answers in (D3).
4. Highrise trimmed, exported, uploaded, imported, fixed, wrapped and tested (F10, F5, F11, F12).
5. SlipZones: server push via "Knockback" remote with lift 30 (D5, F13).

## Next action
Fix H12 (crane mast SlipZone): simplest options are untag it (the crane parts already make it awkward to camp) or shrink/raise it above the crane cab; check by standing on the mast top. Optionally test the other 10 highrise SlipZones. Then farm, colosseum, moon-base, beach, one per chat, with methods.md "Open a map", "Export and upload", "Fix an imported map" (check each map's background-part naming for step 2) and "Test a map solo". When all 5 are in ArenaTemplates, delete ServerStorage._PlaceholderHold and save.

## Read first
1. jobs/2026-11-22-custom-arenas-4/findings.md
2. jobs/2026-11-22-custom-arenas-4/methods.md

## Leads to re-check
- F13: ArenaZones source contains SLIP_LIFT = 30 and watch("SlipZone", onSlip); 13 parts in Arena_Highrise carry tag "SlipZone".

## Results to reuse
- Asset 118252970461216 (highrise Model); ServerStorage.ArenaTemplates.Arena_Highrise (F11, F12).
- ServerScriptService.ArenaZones handles every KillZone- and SlipZone-tagged part, no per-map code (F12, F13).
- assets/arenas/highrise.blend and assets/arenas/export/highrise.glb (F10).
- methods.md: Export and upload, Fix an imported map (now incl. SlipZone tagging), Test a map solo (now incl. SlipZone check).

## Waiting on me
None

## Don't redo
- Map vote registry already loops ArenaTemplates:GetChildren() (F3).
- Highrise trim, export, upload, import fix, spawn scan, KillZone script and test (F10-F12).
- SlipZone approach choice (D5) and lift tuning (10 fails, 30 works, F13).
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

## Studio/Blender state
- Place saved in Studio: yes (v49, Team Create), play stopped
- Rojo in sync: not used
- .blend files: highrise.blend trimmed and saved, exported to assets/arenas/export/highrise.glb; others unmodified
- Only in Studio (not in this folder): all scripts incl. ArenaZones (KillZone + SlipZone), ArenaTemplates.Arena_Highrise, ServerStorage._PlaceholderHold (Arena_Classic/Lava/Sky)

## Queue
None

## Chain so far
- Started by session 0d634374-08b3-4b78-921a-4f312066fd6b at 2026-11-22 14:45 (continues jobs/2026-11-22-custom-arenas-3/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-22 14:46 by session 0d634374-08b3-4b78-921a-4f312066fd6b
- Resumed by session 3e0effb5-92cf-43c7-a22f-b969b8844a27 at 2026-11-22 14:47
