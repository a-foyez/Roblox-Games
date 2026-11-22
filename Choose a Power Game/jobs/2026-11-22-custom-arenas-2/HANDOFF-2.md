# Hand-off: Custom Blender arenas (part 2)

## Goal
the main goal is to implement the maps attached to the roblox game as playable arenas. remove the placeholder ones. and specifically for the skyscraper map apparently theres too many background buildings so lower it to a optimal level.

i think you should just take the gemini prompt as a vague gauge of what i want.
(Gemini prompt summary: auto spawn points per map, an out-of-bounds kill zone under each arena (highrise especially), map vote lists ArenaTemplates children, and a note on MeshPart collision settings to check.)
Source: user message (first of session 50c0cdd5), 2026-11-22 ~14:00; carried over from jobs/2026-11-22-custom-arenas/

## Done when
the main goal is to implement the maps attached to the roblox game as playable arenas. remove the placeholder ones.
Source: same message (no separate done-when given)

## Don'ts
None given.
Source: same message

## Status
Highrise trimmed, saved, exported and uploaded (upload still processing). Other 4 maps untouched. Nothing edited in Studio yet.

## Route so far
1. Located the 5 maps (F1); Blender bridge works (F2).
2. Vote/spawn contract known (F3); death = Health <= 0 poll, so KillZone just zeroes Health (F4, D4).
3. Inventoried all maps (F6, F8); user answers in (D3).
4. Arena placement settled: 50k-stud slots at Y+10000, so each map needs its own KillZone (F9).
5. Highrise trimmed per D2 and exported (F10); uploaded, operation pending (F5).

## Next action
Poll GET /assets/v1/operations/7bb823da-7a1d-4486-b7cb-3eb3166e1f7f until done:true and note the assetId. Insert it in Studio (Edit), check scale, anchoring, colours and collisions (F5), then wrap it as ServerStorage.ArenaTemplates.Arena_Highrise with Spawns/Spawn1..4 on the decks and a KillZone (D1, D4). If the import looks right, repeat Export and upload (methods.md) for farm, colosseum, moon-base, beach.

## Read first
1. jobs/2026-11-22-custom-arenas-2/findings.md
2. jobs/2026-11-22-custom-arenas-2/methods.md

## Leads to re-check
- F5: upload operation result and how the GLB imports (scale, anchoring, colours).

## Results to reuse
- assets/arenas/highrise.blend (trimmed, saved) and assets/arenas/export/highrise.glb (F10).
- Upload operation 7bb823da-7a1d-4486-b7cb-3eb3166e1f7f (F5).
- Export and upload steps in methods.md.

## Waiting on me
None

## Don't redo
- Map vote registry already loops ArenaTemplates:GetChildren() (F3).
- TableManager placement read (F9). Highrise trim and export (F10). Re-uploading highrise: poll the existing operation first.
- Asking the user about upload, permissions, SlipZones or highrise trim (D3).

## Gotchas
- stay-in-project hook blocks paths outside the project, including Downloads, `../` from a subfolder, and a backslash-n inside sed. Run Bash from the project root with relative paths.
- script_grep takes Luau patterns: `a|b` never matches. Search one word per call.
- script_read partial reads need both start_line_one_indexed and end_line_one_indexed_inclusive.
- No python on PATH; edit files with Write/Edit.
- Friction 0 does not push a standing Humanoid; SlipZones need a push or a tilt (D4).
- Studio id this session: a8dafb2f-40d9-403c-96ba-00336a2bf161 (changes per session).
- MCP play is solo only.

## Studio/Blender state
- Place saved in Studio: yes (unchanged since map-voting v44)
- Rojo in sync: not used
- .blend files: highrise.blend trimmed and saved, exported to assets/arenas/export/highrise.glb; others unmodified; Blender has highrise.blend open, saved
- Only in Studio (not in this folder): all scripts and ArenaTemplates (placeholders Arena_Classic, Arena_Lava, Arena_Sky still present)

## Queue
None

## Chain so far
- Started by session a752d15a-2ae8-4972-a897-766202590814 at 2026-11-22 14:29 (continues jobs/2026-11-22-custom-arenas/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-22 14:31 by session a752d15a-2ae8-4972-a897-766202590814
- Resumed by session 5cd84e01-aecc-4004-9b57-c1448e5c28f7 at 2026-11-22 14:31
- Hand-off #2 saved 2026-11-22 14:34 by session 5cd84e01-aecc-4004-9b57-c1448e5c28f7
- Resumed by session 77bb61bc-88c5-4636-bac7-5c7047c0ae64 at 2026-11-22 14:34
