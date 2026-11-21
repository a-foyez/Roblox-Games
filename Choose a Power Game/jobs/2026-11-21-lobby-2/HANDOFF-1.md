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
Tree request mostly done: blocky trees everywhere and a sakura garden, built and saved (version 34). One fix open: big trees crowd the sakura path/garden (F12). User hasn't seen it yet.

## Route so far
1. Previous job jobs/2026-11-21-lobby/: lobby, wall, sunset, scenery built; user playtested OK (see findings: F1-F9, D1-D4).
2. Inserted the Blocky Tree Pack and sakura, checked for scripts, stored in ServerStorage.LobbyAssets (see findings: F10).
3. Generator now clones pack trees and builds the sakura garden; run and saved (see findings: F11, D5).
4. Screenshot shows big trees crowding the garden path (see findings: F12).

## Next action
Fix F12 in scripts/build-lobby.luau: in clear(), widen the sakura clearing (e.g. GARDEN_RADIUS + 14 + margin) and the sakura path strip (abs(Z) < 9 + margin); maybe drop "Big Tree" from KINDS for the inner ring. Re-run the generator (paste the whole file into execute_luau), screenshot from (40,40,30) looking at (96,8,0) and from the plaza, save, then tell the user and ask them to walk the sakura path in a playtest.

## Read first
1. jobs/2026-11-21-lobby-2/findings.md
2. scripts/build-lobby.luau lines 169-260 (garden, clear(), tree())

## Leads to re-check
- F12 LEAD: big trees crowd the sakura path/garden. Re-check by screenshot after the fix.

## Results to reuse
- scripts/build-lobby.luau: re-runnable generator (Tables, Lobby incl. SakuraGarden, Boundary, Scenery, Lighting). Needs ServerStorage.LobbyAssets.
- In Studio: ServerStorage.LobbyAssets (BlockyTreePack, SakuraTree); Workspace.Lobby.SakuraGarden.

## Waiting on me
The user hasn't seen the new trees yet. Still-open suggestions: custom Blender fountain, ambient sound. Low-Poly-Tree link unused (D5): ask the user if they wanted it somewhere.

## Don't redo
Inserting and script-checking the tree models; the tree() rewrite and sakura garden; saving version 34.

## Gotchas
- TableManager and TableClient read workspace.Tables at startup, so tables must stay in Workspace.Tables.
- execute_luau can't read local files: paste the whole generator as the code.
- The stay-in-project hook blocks shell commands containing "../.." or Get-Date (it sees a node path); use absolute paths and Edit.
- screen_capture can time out right after a heavy run; retry once.
- Keep scenery inside r=235: arena slot 0 would sit at (0,10,300).
- ClockTime 18.1 is already night; 17.6 is the sunset.

## Studio/Blender state
- Place saved in Studio: yes, 2026-11-21 14:28 (version 34)
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): ServerStorage.LobbyAssets (re-add steps in methods.md) and the built instances (regenerate from scripts/build-lobby.luau).

## Queue
None

## Chain so far
- Started by session 5572c085-5e24-4168-bc8a-5db78cd52fe0 at 2026-11-21 14:30 (continues jobs/2026-11-21-lobby/)
- Hand-off #1 saved 2026-11-21 14:31 by session 5572c085-5e24-4168-bc8a-5db78cd52fe0
