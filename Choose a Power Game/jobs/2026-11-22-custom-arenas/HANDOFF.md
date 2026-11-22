# Hand-off: Custom Blender arenas

## Goal
the main goal is to implement the maps attached to the roblox game as playable arenas. remove the placeholder ones. and specifically for the skyscraper map apparently theres too many background buildings so lower it to a optimal level.

i think you should just take the gemini prompt as a vague gauge of what i want.
(Gemini prompt summary: auto spawn points per map, an out-of-bounds kill zone under each arena (highrise especially), map vote lists ArenaTemplates children, and a note on MeshPart collision settings to check.)
Source: user message (first of session 50c0cdd5), 2026-11-22 ~14:00

## Done when
the main goal is to implement the maps attached to the roblox game as playable arenas. remove the placeholder ones.
Source: same message (no separate done-when given)

## Don'ts
None given.
Source: same message

## Status
Closed at hand-off #3, continued in jobs/2026-11-22-custom-arenas-2/

## Route so far
1. Located the 5 maps in assets/arenas (F1).
2. Blender bridge now works (F2).
3. Checked vote/spawn code (F3) and fall handling: none exists (F4); chose static spawns + KillZone (D1).
4. Inventoried highrise (F6) and proposed the trim (D2); found the other 4 files share moon-base leftovers (F8).
5. Read the rbx-import-asset skill: upload needs permissions and consent (F5).

## Next action
Ask the user, in one message: (a) OK to upload each map as a permanent Model asset on their Roblox account; (b) grant asset:read + asset:write and approve an upload folder (suggest assets/arenas/export) in Studio Assistant Settings > MCP Permissions; (c) what SlipZones should do (F7); (d) OK for the highrise trim in D2. Meanwhile check F8 collections per file.

## Read first
1. jobs/2026-11-22-custom-arenas/findings.md
2. jobs/2026-11-22-custom-arenas/methods.md

## Leads to re-check
- F8: list collections + hide_viewport/exclude per file (farm, colosseum, moon-base, beach) to find which objects belong to each map.
- F5: probe open_cloud_invoke GET /cloud/v2/universes/10777903992 with scopes asset:read, asset:write.
- F4 follow-up: read MatchInstance to see how a death/elimination is detected (KillZone must trigger it, e.g. Humanoid.Health = 0).

## Results to reuse
- assets/arenas/{farm,colosseum,highrise,moon-base,beach}.blend (user copies; originals in Downloads/Arenas_blender).
- Inventory numbers and bounds in findings F6, F8 (no need to re-list highrise).

## Waiting on me
- User: answers (a)-(d) in Next action.

## Don't redo
- Map vote registry: already loops ArenaTemplates:GetChildren() (F3); no code change needed.
- Blender bridge check (F2).

## Gotchas
- stay-in-project hook blocks every path outside the project, including Downloads (and a bare `\` in find commands).
- No python on PATH; edit files with Write/Edit, not python scripts.
- Blender opened with C:\Users\Abdul\Downloads\farm.blend; this session switched it to the project copies (beach.blend open now, unmodified).
- Studio id this session: a8dafb2f-40d9-403c-96ba-00336a2bf161 (changes per session).
- MCP play is solo only.

## Studio/Blender state
- Place saved in Studio: yes (unchanged since map-voting v44)
- Rojo in sync: not used
- .blend files: assets/arenas/*.blend unmodified, nothing exported
- Only in Studio (not in this folder): all scripts and ArenaTemplates (placeholders Arena_Classic, Arena_Lava, Arena_Sky still present)

## Queue
None

## Chain so far
- Started by session 50c0cdd5-630f-41e5-8e11-edfae50f098f at 2026-11-22 14:00
- Hand-off #1 saved 2026-11-22 14:16 by session 50c0cdd5-630f-41e5-8e11-edfae50f098f
- Resumed by session 0ec5f264-f5f3-47e3-b88a-c2ee0f8540d3 at 2026-11-22 14:18
- Hand-off #2 saved 2026-11-22 14:24 by session 0ec5f264-f5f3-47e3-b88a-c2ee0f8540d3
- Resumed by session a752d15a-2ae8-4972-a897-766202590814 at 2026-11-22 14:28
- Closed, continued in jobs/2026-11-22-custom-arenas-2/
