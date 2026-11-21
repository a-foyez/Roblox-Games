# Hand-off: lobby-3

## Goal
"The following below is a Gemini output. Use it as a vague guide but do what you think is best. The main outcome i want is a nice lobby area with cool features. use blender if you think it will be useful, or let me know if i should consider anything else."
(The Gemini text asked for: circular hub, multi-tier fountain in the centre, stone paths out to four 1v1 tables and two 1v1v1v1 tables, trees, rocks, warm lights, old tables cleaned up.)
Source: user message, 2026-11-21 13:30 (carried over from jobs/2026-11-21-lobby/ and jobs/2026-11-21-lobby-2/)

## Done when
"The main outcome i want is a nice lobby area with cool features."
Source: user message, 2026-11-21 13:30

## Don'ts
None stated by the user. Project rules: tables must keep working with TableManager/TableClient.
Source: user message, 2026-11-21 13:30; CLAUDE.md

## Status
User's latest fix request done: blocky trees now stand flat (F15), saved version 36. F12 (trees crowding the sakura path) settled. User hasn't playtested the tilt fix yet.

## Route so far
1. jobs/2026-11-21-lobby/: lobby, wall, sunset, scenery built (F1-F9, D1-D4).
2. jobs/2026-11-21-lobby-2/: Blocky Tree Pack and sakura added (F10, F11, D5); floating/big trees and sakura offset fixed (F13, F14, D6); path crowding settled (F12).
3. This job: tilted trees fixed by levelling each clone's pivot in place() (F15).

## Next action
Ask the user to playtest and say whether the trees look right now, and whether anything else in the lobby needs work. If done, close the job; else fix in scripts/build-lobby.luau and re-run (methods.md "Rebuild the lobby").

## Read first
1. jobs/2026-11-21-lobby-3/findings.md (F12-F15, D6)
2. scripts/build-lobby.luau lines 182-197 (place(), sakura) only if a tree/sakura fix is needed

## Leads to re-check
None

## Results to reuse
- scripts/build-lobby.luau: re-runnable, seeded generator. The tilt/gap self-check used in the MCP run is in findings F15 (not in the file).
- In Studio: ServerStorage.LobbyAssets (BlockyTreePack, SakuraTree); Workspace.Lobby.

## Waiting on me
User to playtest the tilt fix. Still-open suggestions: custom Blender fountain, ambient sound.

## Don't redo
Tilt fix (F15), floating-tree fix, Big Tree scale, sakura offset (F14); saving version 36.

## Gotchas
- Some pack models have tilted pivots over upright parts; place() levels the pivot (F15). Pine Tree's top still leans by design.
- TableManager and TableClient read workspace.Tables at startup, so tables must stay in Workspace.Tables.
- execute_luau can't read local files: paste the whole generator as the code (~19 KB, costly in context).
- The sakura offset (-1.52, 0, 3.33) only holds at scale 0.45 (D6).
- The stay-in-project hook blocks shell commands containing "../.." or Get-Date; use bash `date`.
- Stop the user's playtest before re-running the generator (edits in Play mode don't stick).
- Keep scenery inside r=235: arena slot 0 would sit at (0,10,300).

## Studio/Blender state
- Place saved in Studio: yes, 2026-11-21 15:04 (version 36)
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): ServerStorage.LobbyAssets (re-add steps in methods.md) and the built instances (regenerate from scripts/build-lobby.luau).

## Queue
None

## Chain so far
- Started by session b8ba44d7-f7a7-4b22-978a-dfd51a1fab34 at 2026-11-21 15:04 (continues jobs/2026-11-21-lobby-2/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-21 15:04 by session b8ba44d7-f7a7-4b22-978a-dfd51a1fab34
