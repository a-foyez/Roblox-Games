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
Latest request done (F16): rocks swapped for the Stylized Rocks pack, cliff rebuilt from Mountain Rocks clusters plus big boulders, 90 Light Grass clumps added, sky replaced with Simple Sunset Sky. Saved version 38. User hasn't looked at it yet.

## Route so far
1. jobs/2026-11-21-lobby/: lobby, wall, sunset, scenery built (F1-F9, D1-D4).
2. jobs/2026-11-21-lobby-2/: tree pack and sakura (F10-F14, D5, D6).
3. This job: tree tilt fixed (F15); new rocks, cliff, grass and sky (F16).

## Next action
Ask the user to look in Studio/playtest and say whether the new cliff, rocks, grass and sky look right (grass reads golden in the sunset light; cliff clusters may want tuning). Fix in scripts/build-lobby.luau and re-run (methods.md "Rebuild the lobby"). If done, close the job.

## Read first
1. jobs/2026-11-21-lobby-3/findings.md F16, F17
2. scripts/build-lobby.luau lines 254-290 (rock, grass) and 300-325 (cliff) only if a fix is needed

## Leads to re-check
None

## Results to reuse
- scripts/build-lobby.luau: re-runnable, seeded generator (now needs six assets in ServerStorage.LobbyAssets).
- In Studio: ServerStorage.LobbyAssets (BlockyTreePack, SakuraTree, SunsetSky, MountainRocks, StylizedRocks, LightGrass); Workspace.Lobby.

## Waiting on me
User to look at the new rocks/cliff/grass/sky. Still-open suggestions: custom Blender fountain, ambient sound.

## Don't redo
Inserting the four new assets; F16 generator changes; tilt fix (F15); saving version 38.

## Gotchas
- execute_luau can't read local files or fetch from localhost (F17): paste the whole generator (~22 KB, costly in context).
- Some pack models have tilted pivots; place() levels the pivot (F15).
- TableManager and TableClient read workspace.Tables at startup, so tables must stay in Workspace.Tables.
- The sakura offset (-1.52, 0, 3.33) only holds at scale 0.45 (D6).
- The stay-in-project hook blocks shell commands containing "../.." or Get-Date; use bash `date`.
- Stop the user's playtest before re-running the generator.
- Keep scenery inside r=235 on the arena side: arena slot 0 would sit at (0,10,300).
- The cliff is ~1400 unions; if the lobby lags, thin the back row first.

## Studio/Blender state
- Place saved in Studio: yes, 2026-11-21 15:23 (version 38)
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): ServerStorage.LobbyAssets (re-add steps in methods.md) and the built instances (regenerate from scripts/build-lobby.luau).

## Queue
None

## Chain so far
- Started by session b8ba44d7-f7a7-4b22-978a-dfd51a1fab34 at 2026-11-21 15:04 (continues jobs/2026-11-21-lobby-2/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-21 15:04 by session b8ba44d7-f7a7-4b22-978a-dfd51a1fab34
- Resumed by session b97a95d5-e816-421a-b986-651ee09424b4 at 2026-11-21 15:10 (new user request, F16)
- Hand-off #2 saved 2026-11-21 15:25 by session b97a95d5-e816-421a-b986-651ee09424b4
