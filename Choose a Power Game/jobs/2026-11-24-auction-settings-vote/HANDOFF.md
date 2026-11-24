# Hand-off: Auction table combined settings vote

## Goal
for the bidding table,
when you vote for a map, number of rounds and number of bidding items, can you put it all on one screen, so you choose all 3 within the same timer.

the picture of the maps should take the most space, maybe do a 3:1:1 ratio. for the rounds to win, have the options 1,2,3,5
and for the number of bidding items, have the options 6, 8, 12, 16 for now
Source: user message, 2026-11-24 (session 12ced1c1-0bd4-4cb8-af4c-d2193121ac16)
Follow-up: "make it row wise instead of column wise" (session 2616938f-deb7-4930-b822-685c4b3b0a10, 2026-11-24 22:44)

## Done when
can you put it all on one screen, so you choose all 3 within the same timer.
Source: same message (plus a playtest with no console errors)

## Don'ts
None stated (CLAUDE.md rules apply).
Source: same message

## Status
Closed at hand-off #3, continued in jobs/2026-11-24-auction-host-settings/

## Route so far
1. Read Draft, TableManager, DraftClient (F1).
2. Added Draft.SettingsVote and the "Setting" remote action (F2, D1).
3. Switched TableManager's auction branch to it (F3).
4. Added the 3:1:1 screen to DraftClient (F4).
5. Solo playtest passed, v88 (F5).
6. Switched the screen to rows (map row 0.6, rounds 0.2, powers 0.2), playtest passed, v89 (F6).

## Next action
Waiting on the user for the optional 2+ player test: they start Test > Clients and Servers > 2 Players > Start in Studio, then the next chat checks the MCP can reach those windows and has both players vote.

## Read first
findings.md, methods.md

## Leads to re-check
None

## Results to reuse
Draft.SettingsVote(players, groups) returns the winner of each group (F2). Quick test steps in methods.md.

## Waiting on me
User to start the 2-player local server in Studio (optional test).

## Don't redo
Steps 1-6.

## Gotchas
- Team Create: re-read scripts right before editing.
- script_read with a line range needs both start_line_one_indexed and end_line_one_indexed_inclusive.
- start_stop_play only runs a 1-player playtest; multi-client needs the user to start it in Studio.
- Console shows an "Assistant plugin version changed" warning; harmless, a Studio restart clears it.

## Studio/Blender state
- Place saved in Studio: yes, v89 at 2026-11-24 22:46
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all script changes (Draft, TableManager, DraftClient)

## Queue
None

## Chain so far
- Started by session 12ced1c1-0bd4-4cb8-af4c-d2193121ac16 at 2026-11-24 22:42
- Hand-off #1 saved 2026-11-24 22:42 by session 12ced1c1-0bd4-4cb8-af4c-d2193121ac16
- Resumed by session 2616938f-deb7-4930-b822-685c4b3b0a10 at 2026-11-24 22:43
- Hand-off #2 saved 2026-11-24 22:47 by session 2616938f-deb7-4930-b822-685c4b3b0a10
- Resumed by session 5aa342d3-47f0-4b56-b999-41fa4514203c at 2026-11-24 22:51
- Closed, continued in jobs/2026-11-24-auction-host-settings/
