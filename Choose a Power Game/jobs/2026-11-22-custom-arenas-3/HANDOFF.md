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
Highrise uploaded (asset 118252970461216), imported, fixed and wrapped as ServerStorage.Arena_Highrise with Spawns and a KillZone part. Not yet in ArenaTemplates, no KillZone script, not playtested. Other 4 maps untouched. Place saved v46.

## Route so far
1. Located the 5 maps (F1); Blender bridge works (F2).
2. Vote/spawn contract known (F3); death = Health <= 0 poll, so KillZone just zeroes Health (F4, D4).
3. Inventoried all maps (F6, F8); user answers in (D3). Arenas sit at Y+10000, so each needs its own KillZone (F9).
4. Highrise trimmed per D2 and exported (F10), uploaded and imported: right scale, but unanchored and grey (F5).
5. Fixed and wrapped as Arena_Highrise with Spawns and KillZone part (F11).

## Next action
Add ServerScriptService.ArenaZones (--!strict Script): CollectionService tag "KillZone" -> Touched sets the toucher's Humanoid.Health = 0 (D4); connect existing and GetInstanceAddedSignal parts, disconnect on removal. Move Arena_Highrise into ArenaTemplates, playtest (temporarily force the vote or drop placeholders) to check spawns land on decks and falling kills. Then decide SlipZones (D4) and do farm, colosseum, moon-base, beach with methods.md "Export and upload" + "Fix an imported map". Delete Arena_Classic/Lava/Sky last.

## Read first
1. jobs/2026-11-22-custom-arenas-3/findings.md
2. jobs/2026-11-22-custom-arenas-3/methods.md

## Leads to re-check
- F11: Arena_Highrise still in ServerStorage with 147 children (145 parts + Spawns + KillZone).

## Results to reuse
- Asset 118252970461216 (highrise Model) and ServerStorage.Arena_Highrise (F11).
- assets/arenas/highrise.blend and assets/arenas/export/highrise.glb (F10).
- methods.md: Export and upload, Fix an imported map.

## Waiting on me
None

## Don't redo
- Map vote registry already loops ArenaTemplates:GetChildren() (F3).
- TableManager placement read (F9). Highrise trim, export, upload, import fix, spawn scan (F10, F11).
- Asking the user about upload, permissions, SlipZones or highrise trim (D3).

## Gotchas
- stay-in-project hook blocks paths outside the project (also /tmp). Run Bash from the project root with relative paths.
- script_grep takes Luau patterns: `a|b` never matches. Search one word per call.
- script_read partial reads need both start_line_one_indexed and end_line_one_indexed_inclusive.
- No python on PATH; edit files with Write/Edit.
- Friction 0 does not push a standing Humanoid; SlipZones need a push or a tilt (D4).
- GetPartBoundsInBox on the map always hits (bounding boxes); use GetPartsInPart for free-spot checks.
- Studio id this session: a8dafb2f-40d9-403c-96ba-00336a2bf161 (changes per session).
- MCP play is solo only.

## Studio/Blender state
- Place saved in Studio: yes (v46, includes ServerStorage.Arena_Highrise)
- Rojo in sync: not used
- .blend files: highrise.blend trimmed and saved, exported to assets/arenas/export/highrise.glb; others unmodified; Blender has highrise.blend open, saved
- Only in Studio (not in this folder): all scripts, ArenaTemplates (placeholders Arena_Classic, Arena_Lava, Arena_Sky still present), ServerStorage.Arena_Highrise

## Queue
None

## Chain so far
- Started by session 77bb61bc-88c5-4636-bac7-5c7047c0ae64 at 2026-11-22 14:36 (continues jobs/2026-11-22-custom-arenas-2/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-22 14:37 by session 77bb61bc-88c5-4636-bac7-5c7047c0ae64
