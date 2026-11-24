# Findings: Auction table host settings

Earlier facts (F1-F6, D1) on the settings vote screen: jobs/2026-11-24-auction-settings-vote/findings.md.

## Facts
- F1 SETTLED: Auction host panel. TableManager: AUCTION_ALLOWED = { RoundTime = {180,300,600} }; tables with TableType "Auction" (only Table5) start at RoundTime 180; HostAction validates against AUCTION_ALLOWED there, so RoundsToWin changes are rejected (rounds come from the vote). TableClient: rounds button hidden on auction tables, time button shows "Round time: N min" and cycles 3 -> 5 -> 10 -> 3 min; other tables unchanged (45/60s). MatchInstance uses RoundTime as a plain deadline, so long rounds need no other change. Playtest: panel shows only Round time + Start Match; 300/600/180 accepted, 45 and RoundsToWin=5 rejected; no script errors. Saved v90. Source: multi_edit TableManager/TableClient, client execute_luau log, screen_capture, console.

## Decisions
- D1: Per-table allowed list instead of widening ALLOWED. Why: normal tables keep 45/60s and their rounds button. Rejected: one shared list (would let normal tables pick 10 min and auction hosts pick rounds).
