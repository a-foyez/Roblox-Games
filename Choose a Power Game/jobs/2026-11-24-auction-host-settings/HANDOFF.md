# Hand-off: Auction table host settings (continues auction-settings-vote)

## Goal
for the bidding table,
when you vote for a map, number of rounds and number of bidding items, can you put it all on one screen, so you choose all 3 within the same timer.

the picture of the maps should take the most space, maybe do a 3:1:1 ratio. for the rounds to win, have the options 1,2,3,5
and for the number of bidding items, have the options 6, 8, 12, 16 for now
Source: user message, 2026-11-24 (session 12ced1c1-0bd4-4cb8-af4c-d2193121ac16), carried over from jobs/2026-11-24-auction-settings-vote/
Follow-up: "make it row wise instead of column wise" (session 2616938f-deb7-4930-b822-685c4b3b0a10, 2026-11-24 22:44)
Follow-up: "also the host should only now have the option to start the game on this table rather than choose rounds. give the host the option to choose 3,5 or 10 minute rounds" (session 5aa342d3-47f0-4b56-b999-41fa4514203c, 2026-11-24 22:51)

## Done when
can you put it all on one screen, so you choose all 3 within the same timer.
Source: same message (plus a playtest with no console errors)

## Don'ts
None stated (CLAUDE.md rules apply).
Source: same message

## Status
Closed 2026-11-24 22:56. Settings vote screen (v89) and auction host panel with 3/5/10 min round time (v90) both solo-playtested and saved. Multi-player test skipped by the user.

## Route so far
1. Settings vote screen built, rows layout, v89: see jobs/2026-11-24-auction-settings-vote/findings.md F1-F6.
2. Auction host panel: rounds button hidden, round time cycles 3/5/10 min, server validates per table type, v90 (F1).

## Next action
None. Job closed; the user skipped the optional 2-player test.

## Read first
findings.md, methods.md

## Leads to re-check
None

## Results to reuse
Draft.SettingsVote(players, groups) returns the winner of each group (old job F2). Host panel test steps in methods.md.

## Waiting on me
None

## Don't redo
Settings vote screen (old job steps 1-6) and host panel change (F1).

## Gotchas
- Team Create: re-read scripts right before editing.
- script_read with a line range needs both start_line_one_indexed and end_line_one_indexed_inclusive.
- start_stop_play only runs a 1-player playtest; multi-client needs the user to start it in Studio.
- Console shows an "Assistant plugin version changed" warning; harmless, a Studio restart clears it.
- The stay-in-project hook blocks relative paths with "../"; use absolute paths in Bash.

## Studio/Blender state
- Place saved in Studio: yes, v90 at 2026-11-24 22:53
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all script changes (Draft, TableManager, DraftClient, TableClient)

## Queue
None

## Chain so far
- Started by session 5aa342d3-47f0-4b56-b999-41fa4514203c at 2026-11-24 22:53 (continues jobs/2026-11-24-auction-settings-vote/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-24 22:54 by session 5aa342d3-47f0-4b56-b999-41fa4514203c
- Resumed by session 0a7f6392-e453-437a-aac3-527e3e25648a at 2026-11-24 22:54
