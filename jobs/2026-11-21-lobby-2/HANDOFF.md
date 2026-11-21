# Hand-off: lobby-2

## Goal
"The following below is a Gemini output. Use it as a vague guide but do what you think is best. The main outcome i want is a nice lobby area with cool features. use blender if you think it will be useful, or let me know if i should consider anything else."
(The Gemini text asked for: circular hub, multi-tier fountain in the centre, stone paths out to four 1v1 tables and two 1v1v1v1 tables, trees, rocks, warm lights, old tables cleaned up.)
Source: user message, 2026-11-21 13:30 (carried over from jobs/2026-11-21-lobby/)

## Done when
"The main outcome i want is a nice lobby area with cool features."
Source: user message, 2026-11-21 13:30

## Don'ts
None stated by the user. Project rules: tables must keep working with TableManager/TableClient.
Source: user message, 2026-11-21 13:30; CLAUDE.md

## Status
Closed at hand-off #3, continued in jobs/2026-11-21-lobby-3/

## Route so far
1. Previous job jobs/2026-11-21-lobby/: lobby, wall, sunset, scenery built (findings F1-F9, D1-D4).
2. Blocky Tree Pack and sakura inserted and used by the generator (F10, F11, D5).
3. Big trees crowded the garden path (F12, lead).
4. User reported big/floating trees and off-centre sakura; fixed and re-run (F13, F14, D6).

## Next action
Ask the user to playtest and walk the lobby and sakura path. If big trees still crowd the path (F12), widen clear() margins in scripts/build-lobby.luau (sakura clearing GARDEN_RADIUS + 8 + margin, path strip abs(Z) < 4 + margin), re-run, screenshot from (60,12,0) looking at (96,6,0), save.

## Read first
1. jobs/2026-11-21-lobby-2/findings.md (F12-F14, D6)
2. scripts/build-lobby.luau lines 194-260 (sakura, clear(), tree()) and 280-306 (cliff trees)

## Leads to re-check
- None (F12 settled 2026-11-21 15:00).

## Results to reuse
- scripts/build-lobby.luau: re-runnable generator, ends with a floating-tree self-check only in the MCP run (not in the file).
- In Studio: ServerStorage.LobbyAssets (BlockyTreePack, SakuraTree); Workspace.Lobby.

## Waiting on me
User to playtest the fix. Still-open suggestions: custom Blender fountain, ambient sound. Low-Poly-Tree link unused (D5).

## Don't redo
Floating-tree fix, Big Tree scale, sakura offset (F14); saving version 35.

## Gotchas
- TableManager and TableClient read workspace.Tables at startup, so tables must stay in Workspace.Tables.
- execute_luau can't read local files: paste the whole generator as the code.
- Raycasts need the lobby parented to workspace; the generator now parents it before the cliff-tree raycasts.
- The sakura offset (-1.52, 0, 3.33) only holds at scale 0.45 (D6).
- The stay-in-project hook blocks shell commands containing "../.." or Get-Date; use bash `date`.
- screen_capture can time out right after a heavy run; retry once.
- Keep scenery inside r=235: arena slot 0 would sit at (0,10,300).

## Studio/Blender state
- Place saved in Studio: yes, 2026-11-21 14:55 (version 35)
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): ServerStorage.LobbyAssets (re-add steps in methods.md) and the built instances (regenerate from scripts/build-lobby.luau).

## Queue
None

## Chain so far
- Started by session 5572c085-5e24-4168-bc8a-5db78cd52fe0 at 2026-11-21 14:30 (continues jobs/2026-11-21-lobby/)
- Hand-off #1 saved 2026-11-21 14:31 by session 5572c085-5e24-4168-bc8a-5db78cd52fe0
- Resumed by session f3b7c98a-8af9-4f0b-b8c7-788e93ce1a66 at 2026-11-21 14:40
- Hand-off #2 saved 2026-11-21 14:57 by session f3b7c98a-8af9-4f0b-b8c7-788e93ce1a66
- Resumed by session b8ba44d7-f7a7-4b22-978a-dfd51a1fab34 at 2026-11-21 14:59
- Closed, continued in jobs/2026-11-21-lobby-3/
