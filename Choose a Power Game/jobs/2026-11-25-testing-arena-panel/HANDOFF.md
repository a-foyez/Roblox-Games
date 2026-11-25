# Hand-off: In-game Superpower Testing Arena panel

## Goal
"Yes, in Studio" (answer to: "Should I build this as an in-game test panel in Studio next?", where "this" is the web Superpower Testing Arena in docs/testing-arena.html)
Source: user message, 2026-11-25 22:50

## Done when
"Yes, that's it" (answer to: "a ScreenGui listing AbilityRegistry powers in a column, selected one highlighted, its 3 nerfs as toggles, applied to your character in a playtest, with stat readout and log")
Source: user answer, 2026-11-25 22:55

## Don'ts
None given.
Source: user message, 2026-11-25 22:50

## Status
Closed at hand-off #3, continued in jobs/2026-11-25-testing-arena-panel-2/

## Route so far
1. Built and published the web prototype (F1).
2. Re-checked the registry and AbilityService in Studio (F2), then the match state signals (F3).
3. The user chose: all players can use it, lobby only, and it applies to the real character (D2).

## Next action
Decide F4 (actives in the lobby). Then build:
1. A RemoteEvent ReplicatedStorage.Remotes.TestLoadout.
2. A server Script ServerScriptService.TestArena: validate the power id is in Registry.Powers and each nerf is in that power's NerfPool (max 3). Reject if Fighting ~= nil, Loadout ~= nil, or the humanoid is seated (SeatPart). Rate limit it. LoadCharacter, then AbilityService.Equip(p, char, {powers={id}, nerfs=...}).
3. A LocalScript StarterPlayerScripts.TestArenaClient: a ScreenGui ported from docs/testing-arena.html, with the stat readout read from the live Humanoid and a log.
Then playtest it.

## Read first
1. jobs/2026-11-25-testing-arena-panel/findings.md
2. docs/testing-arena.html (the look to port)

## Leads to re-check
- F4: Do R/E still need Fighting == true? Check AbilityService `standing()`.

## Results to reuse
- docs/testing-arena.html, published at https://claude.ai/artifact/KR2omjxN5F6kYZpkdg8WTu (private).
- The API facts in F2 and F3 (no need to re-read the scripts unless they changed).

## Waiting on me
- F4: in the lobby, should R/E actives work (a lobby-only TestMode flag in AbilityService), or should the panel mark them "match only"? Ask the user; recommend the TestMode flag.

## Don't redo
- The web prototype (F1). The answers on access and effect (D2).

## Gotchas
- Server-authoritative: never take stats from the client, only ids. Check the ids against the registry.
- Equip has no undo. Always LoadCharacter before Equip, or the stats stack.
- TEMP SOLO TEST lines are in MatchInstance/TableManager. Leave them alone (not this job).
- The Studio id changes per session: get it with list_roblox_studios.

## Studio/Blender state
- Place saved in Studio: no changes made this job
- Rojo in sync: not used
- .blend files: None
- Only in Studio (not in this folder): None from this job

## Queue
None

## Chain so far
- Started by session 49aca0b6-3020-4a6b-a30a-56697fd4a401 at 2026-11-25 22:51
- Hand-off #1 saved 2026-11-25 22:53 by session 49aca0b6-3020-4a6b-a30a-56697fd4a401
- Resumed by session fee82101-98c2-41c6-9a72-d64423fabd6f at 2026-11-25 22:52
- Hand-off #2 saved 2026-11-25 22:56 by session fee82101-98c2-41c6-9a72-d64423fabd6f
- Resumed by session deb900ef-219c-45d1-a366-cf30672627ad at 2026-11-25 22:56
- Closed, continued in jobs/2026-11-25-testing-arena-panel-2/
