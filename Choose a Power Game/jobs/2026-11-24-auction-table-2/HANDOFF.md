# Hand-off: Auction Table (bidding match type), part 2

## Goal
this is a prompt from gemini. take it as a vague guide but do what you think is best

Update the Roblox game architecture to introduce a new bidding-based match type. Follow these exact requirements and implement the necessary Luau logic and UI components:
1. Table Modifications
* Locate the existing round lobby area and replace exactly one of the two `1v1v1v1` tables with a new table type named `"Auction Table"`.
* Update the `TableManager` to handle this distinct table type differently from the standard draft/nerf tables.
2. Pre-Match Voting Phase Updates
* Modify the current map voting phase for the Auction Table. When the host starts the game, players at this table must now vote on three things:
   * The Map (existing logic).
   * Number of Rounds.
   * Total Superpowers to go on bid.
3. The Bidding System Mechanics (MatchInstance)
* Initialization: Once voting concludes and the match starts, initialize each player's balance to $20.
* Item Pool: Create a module with 20 placeholder superpowers.
* The Auction Loop:
   * Randomly select one superpower from the pool to put on the block. A superpower cannot appear more than once per match.
   * Display the current superpower and a short countdown timer.
   * Player Controls: Provide each active player with two UI buttons: `Bid (+$1)` and `Pass`.
   * Bidding Logic: The base bid starts at $0 (meaning the first bid is $1). If a player clicks `Bid`, the current bid increases by $1, and the short timer resets.
   * Validation: A player can only bid if their current balance is strictly greater than the current bid. (e.g., If the current bid is $10, a player with exactly $10 cannot bid, as the next bid is $11). Disable the `Bid` button for players who cannot afford the next bid.
   * Passing: If a player clicks `Pass`, they are immediately removed from the bidding war for this specific superpower and can no longer bid on it.
   * Resolution: When the timer runs out or all other players pass, the last player to bid wins. Deduct the final bid amount from the winning player's balance and assign them the superpower.
* Repeat the auction loop until the voted "Total Superpowers" limit is reached, then transition to the combat phase.
4. Placeholder Data
* Generate the 20 placeholder superpowers with simple distinct names (e.g., "Fireball", "Invisibility", "Teleportation") to populate the pool so the bidding UI can be tested immediately.

Ensure the server validates all bids to prevent client-side exploitation, and make sure the UI accurately reflects current balances, the active bid, and the countdown timer for all players in real time.
Source: user message, 2026-11-24 22:05

## Done when
Ensure the server validates all bids to prevent client-side exploitation, and make sure the UI accurately reflects current balances, the active bid, and the countdown timer for all players in real time.
Source: same message (plus every numbered requirement above built and a solo playtest with no console errors)

## Don'ts
take it as a vague guide but do what you think is best
Source: same message (no explicit don'ts; CLAUDE.md rules apply)

## Status
Steps 1-3 of 7 done (Table5 is the Auction Table; MapVote takes label/nextText; AuctionPowers module), saved v85. Steps 4-7 not started. Carried over from jobs/2026-11-24-auction-table/ (closed at its hand-off #3).

## Route so far
1. Read the table, draft and client scripts and the registry (F2-F7).
2. Chose Table5 and the build plan (D1-D4, methods.md).
3. Built step 1 (F8); found AbilityService needs real ids only (F9) and how to generalise the vote (F10, D5).
4. Built step 2 (F11); re-read TableManager for step 5 (F12).
5. Built step 3 (F13); read Draft for the step 4 style (F14).

## Next action
methods.md step 4: create Remotes.Auction (RemoteEvent) and ServerScriptService.Auction (ModuleScript, Auction.Run(players, total) -> loadouts?) following D4 rules and the Draft style in F14, with a pure canBid(balance, bid, passed, isLeader) check plus asserts.

## Read first
findings.md (F6, F9, F12-F14, D3, D4), methods.md. Re-read TableManager before step 5 (Team Create).

## Leads to re-check
None (all facts SETTLED; re-read scripts before editing anyway).

## Results to reuse
Table5 converted (F8). Draft.MapVote label/nextText params and DraftClient display (F11). AuctionPowers module (F13).

## Waiting on me
None.

## Don't redo
Exploration of TableManager/Draft/DraftClient/TableClient/AbilityRegistry/AbilityService (F3-F6, F9, F10, F12, F14). Steps 1-3.

## Gotchas
- TEMP SOLO TEST min-player changes by another person (F7): keep them.
- ArenaTemplates is in ReplicatedStorage (TableManager line 14).
- Team Create: user Abdul981234 is also in the session; re-read a script right before editing it.
- Equip overwrites the Loadout attribute (F9).
- execute_luau returns only the first value; use print + get_console_output for more.
- No Python on this PC; use the Edit tool for job files. The project hook blocks relative paths like ../.. and sed patterns that start with a slash; use absolute paths and line numbers.
- The PC clock (date) reads earlier than the times logged in this job; keep log times increasing.

## Studio/Blender state
- Place saved in Studio: yes, v85 (Team Create) after step 3
- Rojo in sync: not used
- .blend files: not used
- Only in Studio (not in this folder): all game scripts, the Table5 change, the Draft/DraftClient edits and ReplicatedStorage.AuctionPowers

## Queue
None

## Chain so far
- Started by session 1740ec75-1b16-404b-a0c2-41c75ff54add at 2026-11-24 22:34
- Hand-off #1 saved 2026-11-24 22:36 by session 1740ec75-1b16-404b-a0c2-41c75ff54add
- Resumed by session 3f5a8a2e-4e84-4d72-b0e4-81287660dc83 at 2026-11-24 22:37
- Hand-off #2 saved 2026-11-24 22:42 by session 3f5a8a2e-4e84-4d72-b0e4-81287660dc83
