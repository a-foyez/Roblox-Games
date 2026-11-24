# Hand-off: auction bid layout

## Goal
the bidding screen looks a bit cluttered. make the picture of the players and their cash amount smaller. add a thin grey  line above the 4 buttons. instead of a number timer, add a thick white line where this thin line is placed that reduces to nothing in the centre
Source: user message, 2026-11-24 23:00

## Done when
None given by the user. Taken as: the three changes show in a playtest of a lot. ("Yes, playtest it", user message, 2026-11-24 23:12)
Source: user message, 2026-11-24 23:12

## Don'ts
None
Source: user messages, 2026-11-24 23:00 and 23:12

## Status
Closed. All three changes built and seen in a solo playtest (F2); place saved v93. Bottom Cash tile left as is (user, 2026-11-24).

## Route so far
1. Shrank the leader face and cash tiles, added the grey divider and the shrinking white timer bar, removed the seconds text (see findings: F1, D1, D2).
2. Solo playtest of a lot: layout correct, no script errors (see findings: F2).
3. Place saved v93 (see findings: F3).

## Next action
None: the job is done. If the user wants more, ask whether the bottom-row "Cash: $N" tile should also shrink (D2).

## Read first
jobs/2026-11-24-auction-bid-layout/findings.md

## Leads to re-check
None

## Results to reuse
- StarterPlayer.StarterPlayerScripts.AuctionClient: divider and timerBar frames, Heartbeat sizes the bar.
- ServerScriptService.Auction: lot state carries lotTime = LOT_TIME.

## Waiting on me
- Whether the bottom-row "Cash" tile should shrink too (D2).
- A multi-player check that a bid refills the bar (solo cannot bid against anyone).

## Don't redo
The layout changes and the solo playtest (F1, F2).

## Gotchas
- MCP play is solo only; Auction.Run({p}, 3) on the Server starts a lot directly.
- Auction.lua line 108 still has the TEMP SOLO TEST (< 1, was < 2); not part of this job.

## Studio/Blender state
- Place saved in Studio: yes, Roblox version 93, 2026-11-24 23:17 (Edit mode, playtest stopped)
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all scripts (AuctionClient, Auction)

## Queue
None

## Chain so far
- Started by session 91d539c5-4d30-4e09-be82-3979f7bfb0d3 at 2026-11-24 23:00
- Hand-off #1 saved 2026-11-24 23:18 by session 91d539c5-4d30-4e09-be82-3979f7bfb0d3
- Resumed by session 9cd92972-f554-4dfe-ad98-960ccabb2afa at 2026-11-24 23:18
