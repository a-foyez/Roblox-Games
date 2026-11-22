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
Files copied in (F1). Nothing edited in Blender or Studio. Blocked: Blender bridge not reachable (F2).

## Route so far
1. Located the 5 maps in assets/arenas (see findings: F1).
2. Tried Blender CLI and the live bridge; both failed (F2).
3. Checked the existing vote/spawn code from the map-voting job (F3, F4); chose the approach (D1).

## Next action
Ask the user to open Blender with the MCP bridge started, then open assets/arenas/highrise.blend via execute_blender_code (bpy.ops.wm.open_mainfile) and list mesh objects with poly counts and bounds to find the background buildings.

## Read first
1. jobs/2026-11-22-custom-arenas/findings.md
2. jobs/2026-11-22-custom-arenas/methods.md

## Leads to re-check
- F2: is the Blender bridge up now (execute_blender_code `result={"ok":1}`)?
- F4: MatchInstance has no fall/void handling (script_grep "FallenPartsDestroyHeight|Touched|Health = 0" in MatchInstance).
- F5: Open Cloud mesh upload works (load rbx-import-asset skill).

## Results to reuse
- assets/arenas/{farm,colosseum,highrise,moon-base,beach}.blend (user copies; originals in Downloads/Arenas_blender).

## Waiting on me
- User: open Blender, enable the MCP add-on bridge (Preferences > Add-ons > MCP > Start MCP Bridge Server).

## Don't redo
- Map vote registry: already loops ArenaTemplates:GetChildren() (F3); no code change needed.

## Gotchas
- stay-in-project hook blocks every path outside the project, including Downloads (and a bare `\` in find commands).
- `blender` is not on PATH, so the *_for_cli Blender tools fail; use the live bridge.
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
