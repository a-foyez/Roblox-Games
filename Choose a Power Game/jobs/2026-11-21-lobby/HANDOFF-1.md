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
Lobby built in Studio and saved (version 30). Not yet playtested: tables untested with players.

## Route so far
1. Inspected the old lobby and table scripts (see findings: F1, F2, F3).
2. Wrote the generator scripts/build-lobby.luau and ran it in Studio (see findings: F4, D1, D2, D3).
3. Screenshot from above looked right (see findings: F5). Place saved.

## Next action
Playtest with 2 players (Studio MCP start_stop_play, or Test > Clients and Servers with 2 players): sit both at Table1 (a 1v1), check the host settings panel appears for the HostSeat player, start a match, and check both get reseated at Table1 afterwards. Then sit 3 at Table2 (1v1v1v1) if possible. Then reply to the user with the summary and suggestions (see Waiting on me).

## Read first
1. jobs/2026-11-21-lobby/findings.md
2. scripts/build-lobby.luau (only if the layout needs changing)

## Leads to re-check
- F6 LEAD: new tables work with TableManager (not playtested yet).

## Results to reuse
- scripts/build-lobby.luau: the generator. Re-running it in the Command Bar rebuilds Workspace.Tables and Workspace.Lobby the same way (seeded random).
- In Studio: Workspace.Lobby (Fountain, Plaza, Paths, TablePads, Trees, Rocks, Lamps, Benches), Workspace.Tables.Table1..Table6, SpawnLocation moved.

## Waiting on me
The user has not seen the result yet. Tell them: what was built, that Blender was not used (parts are enough for now; Blender meshes would need Open Cloud upload), and suggestions to consider (custom Blender fountain/trees, ambient sound, a day/night or sunset Lighting tweak, an invisible boundary so players can't wander off into the empty grass).

## Don't redo
Inspecting the old lobby; writing and running the generator; saving the place.

## Gotchas
- TableManager and TableClient read workspace.Tables at startup, so tables must stay in Workspace.Tables (not Workspace.Lobby, as the Gemini prompt suggested).
- The old lobby had no ProximityPrompts; tables are plain Seats (HostSeat + GuestSeat...).
- Studio script_grep takes a Luau pattern, so "a|b" doesn't work; grep one word at a time.
- execute_luau can't read Lighting.Technology (capability error).

## Studio/Blender state
- Place saved in Studio: yes, 2026-11-21 13:50 (version 30)
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): the built instances themselves; they can be regenerated from scripts/build-lobby.luau.

## Queue
None

## Chain so far
- Started by session 94946051-587c-4d91-abc4-e8ef513c3639 at 2026-11-21 13:30
- Hand-off #1 saved 2026-11-21 13:52 by session 94946051-587c-4d91-abc4-e8ef513c3639
