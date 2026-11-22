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
All user answers in (D3). All leads but F5 (real upload) and F9 (arena placement) checked. Nothing edited in Blender or Studio yet.

## Route so far
1. Located the 5 maps (F1); Blender bridge works (F2).
2. Vote/spawn contract known (F3); death = Health <= 0 poll, so KillZone just zeroes Health (F4, D4).
3. Inventoried highrise (F6) and the other 4 maps, each in one clean collection (F8).
4. User approved upload, granted scopes and folder, SlipZones slide off, highrise trim (D3); token works (F5).

## Next action
Read game.ServerScriptService.TableManager to see where arena clones are placed per table (F9). Then start with highrise: apply the D2 trim in Blender, save highrise.blend, export GLB to assets/arenas/export/highrise.glb, and upload it per F5 (POST /assets/v1/assets, creator userId 46848670).

## Read first
1. jobs/2026-11-22-custom-arenas-2/findings.md
2. jobs/2026-11-22-custom-arenas-2/methods.md

## Leads to re-check
- F5: actual GLB upload untested (scale, anchoring, colours).
- F9: TableManager arena clone placement vs map size.

## Results to reuse
- assets/arenas/{farm,colosseum,highrise,moon-base,beach}.blend (user copies; originals in Downloads/Arenas_blender).
- Empty upload folder assets/arenas/export (approved by user in Studio MCP Permissions).
- Inventory numbers and bounds in findings F6, F8.

## Waiting on me
None

## Don't redo
- Map vote registry already loops ArenaTemplates:GetChildren() (F3).
- Blender bridge check (F2), collection walk (F8), MatchInstance death check (F4), scope probe (F5).
- Asking the user about upload, permissions, SlipZones or highrise trim (D3).

## Gotchas
- stay-in-project hook blocks paths outside the project, including Downloads, `../` from a subfolder, and a backslash-n inside sed. Run Bash from the project root with relative paths.
- script_grep takes Luau patterns: `a|b` never matches. Search one word per call.
- No python on PATH; edit files with Write/Edit.
- Friction 0 does not push a standing Humanoid; SlipZones need a push or a tilt (D4).
- Studio id this session: a8dafb2f-40d9-403c-96ba-00336a2bf161 (changes per session).
- MCP play is solo only.

## Studio/Blender state
- Place saved in Studio: yes (unchanged since map-voting v44)
- Rojo in sync: not used
- .blend files: assets/arenas/*.blend unmodified, nothing exported; Blender has beach.blend open, unmodified
- Only in Studio (not in this folder): all scripts and ArenaTemplates (placeholders Arena_Classic, Arena_Lava, Arena_Sky still present)

## Queue
None

## Chain so far
- Started by session a752d15a-2ae8-4972-a897-766202590814 at 2026-11-22 14:29 (continues jobs/2026-11-22-custom-arenas/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-22 14:31 by session a752d15a-2ae8-4972-a897-766202590814
- Resumed by session 5cd84e01-aecc-4004-9b57-c1448e5c28f7 at 2026-11-22 14:31
