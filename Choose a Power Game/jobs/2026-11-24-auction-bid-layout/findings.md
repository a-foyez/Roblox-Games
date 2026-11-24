# Findings: auction bid layout

## Facts
- F1 SETTLED: AuctionClient: leader slot `left` is box(panel, 0.02, 0.27, 0.3, 0.3) (was 0.13 / 0.58 high), so the face and leader-cash squares are about half size. Grey `divider` (0.96 x 0.004 of panel, centred at y 0.735) sits above the bottom row; white `timerBar` (clone, 0.016 high, ZIndex 2, rounded) has width 0.96 * timeLeft/lotTime, anchored at its centre so it shrinks to the middle; hidden when endsAt is 0. Status line no longer shows seconds. Auction.lua lot state sends lotTime = LOT_TIME (5). Source: multi_edit, loadstring compile check, 2026-11-24 23:10.
- F2 SETTLED: Solo playtest, Auction.Run({p}, 3) on Server: lot 1 shows small tiles, grey line, white bar about half width and centred; console has no script errors. Source: screen_capture + get_console_output, 2026-11-24 23:15.
- F3 SETTLED: Place saved, Roblox version 93. Source: save_place, 2026-11-24 23:17.

## Decisions
- D1: Server sends lotTime with each lot state. Why: the bar needs the full length and LOT_TIME lives on the server. Rejected: copying 5 into the client (two places to change).
- D2: Shrank only the top-left leader face + cash tiles, not the bottom-row "Cash" tile. Why: that one is part of the 4-tile row with the buttons. Rejected: shrinking both (user can ask).
