# Hand-off: Auction table combined settings vote

## Goal
for the bidding table,
when you vote for a map, number of rounds and number of bidding items, can you put it all on one screen, so you choose all 3 within the same timer.

the picture of the maps should take the most space, maybe do a 3:1:1 ratio. for the rounds to win, have the options 1,2,3,5
and for the number of bidding items, have the options 6, 8, 12, 16 for now
Source: user message, 2026-11-24 (session 12ced1c1-0bd4-4cb8-af4c-d2193121ac16)

## Done when
can you put it all on one screen, so you choose all 3 within the same timer.
Source: same message (plus a playtest with no console errors)

## Don'ts
None stated (CLAUDE.md rules apply).
Source: same message

## Status
Done. Built, solo-playtested and saved as place v88 (F1-F4). Multi-player vote not tested.

## Route so far
1. Read Draft, TableManager, DraftClient (F1).
2. Added Draft.SettingsVote and the "Setting" remote action (F2, D1).
3. Switched TableManager's auction branch to it (F3).
4. Added the 3:1:1 screen to DraftClient (F4).
5. Solo playtest via direct SettingsVote call passed (F5).

## Next action
None. Optional: 2+ client test (Studio Test > Clients) of the auction table start.

## Read first
findings.md

## Leads to re-check
None

## Results to reuse
Draft.SettingsVote(players, groups) returns the winner of each group (F2).

## Waiting on me
None

## Don't redo
Steps 1-5.

## Gotchas
- Team Create: re-read scripts right before editing.
- script_read with a line range needs both start and end params.

## Studio/Blender state
- Place saved in Studio: yes, v88 at 2026-11-24 22:42
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all script changes (Draft, TableManager, DraftClient)

## Queue
None

## Chain so far
- Started by session 12ced1c1-0bd4-4cb8-af4c-d2193121ac16 at 2026-11-24 22:42
- Hand-off #1 saved 2026-11-24 22:42 by session 12ced1c1-0bd4-4cb8-af4c-d2193121ac16
- Resumed by session 2616938f-deb7-4930-b822-685c4b3b0a10 at 2026-11-24 22:43
