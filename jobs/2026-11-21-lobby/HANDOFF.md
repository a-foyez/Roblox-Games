# Hand-off: lobby

## Goal
"The following below is a Gemini output. Use it as a vague guide but do what you think is best. The main outcome i want is a nice lobby area with cool features. use blender if you think it will be useful, or let me know if i should consider anything else."
(The Gemini text asked for: circular hub, multi-tier fountain in the centre, stone paths out to four 1v1 tables and two 1v1v1v1 tables, trees, rocks, warm lights, old tables cleaned up.)
Source: user message, 2026-11-21 13:30

## Done when
"The main outcome i want is a nice lobby area with cool features."
Source: user message, 2026-11-21 13:30

## Don'ts
None stated by the user. Project rules: tables must keep working with TableManager/TableClient.
Source: user message, 2026-11-21 13:30; CLAUDE.md

## Status
Closed at hand-off #3, continued in jobs/2026-11-21-lobby-2/

## Route so far
1. Inspected the old lobby and table scripts (see findings: F1, F2, F3).
2. Wrote the generator scripts/build-lobby.luau and ran it in Studio (see findings: F4, D1, D2, D3).
3. Screenshot from above looked right (see findings: F5).
4. User asked "implement these changes first": wall, sunset, scenery past the wall. Added to the generator, re-ran, screenshot checked (see findings: F7, F8, F9, D4).

## Next action
Playtest done by the user (wall and tables work). Do the Queue item: trees (a path to a new area with one sakura tree, blocky trees everywhere else).

## Read first
1. jobs/2026-11-21-lobby/findings.md
2. scripts/build-lobby.luau (only if the layout needs changing)

## Leads to re-check
- None. F6 confirmed by the user's playtest: tables work with TableManager.

## Results to reuse
- scripts/build-lobby.luau: the generator. Re-running it rebuilds Workspace.Tables, Workspace.Lobby (incl. Boundary and Scenery) and sets Lighting, same layout every run (seeded random).
- In Studio: Workspace.Lobby (Fountain, Plaza, Paths, TablePads, Trees, Rocks, Lamps, Benches, Boundary, Scenery), Workspace.Tables.Table1..Table6.

## Waiting on me
The user has seen nothing of this session's work yet beyond the final reply. Suggestions still open for them: custom Blender fountain/trees, ambient sound.

## Don't redo
Inspecting the old lobby; writing and running the generator; the wall, sunset and outer scenery; saving the place.

## Gotchas
- TableManager and TableClient read workspace.Tables at startup, so tables must stay in Workspace.Tables.
- Studio script_grep takes a Luau pattern, so "a|b" doesn't work; grep one word at a time.
- execute_luau can't read Lighting.Technology (capability error).
- execute_luau can't read local files: to run the generator, paste the whole file contents as the code.
- ClockTime 18.1 is already night (stars); 17.6 is the sunset.
- Keep scenery inside r=235: arena slot 0 would sit at (0,10,300).

## Studio/Blender state
- Place saved in Studio: yes, 2026-11-21 14:02 (version 32)
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): the built instances themselves; they can be regenerated from scripts/build-lobby.luau.

## Queue
- (moved to jobs/2026-11-21-lobby-2/, done there)

## Chain so far
- Started by session 94946051-587c-4d91-abc4-e8ef513c3639 at 2026-11-21 13:30
- Hand-off #1 saved 2026-11-21 13:52 by session 94946051-587c-4d91-abc4-e8ef513c3639
- Resumed by session 44a67919-458c-426d-92cf-481df310c353 at 2026-11-21 13:58
- Hand-off #2 saved 2026-11-21 14:05 by session 44a67919-458c-426d-92cf-481df310c353
- Resumed by session 5572c085-5e24-4168-bc8a-5db78cd52fe0 at 2026-11-21 14:20
- Closed, continued in jobs/2026-11-21-lobby-2/
