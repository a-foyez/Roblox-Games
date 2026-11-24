# Hand-off: Auction Table (bidding match type)

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
Design done (D1-D4), nothing built yet. No Studio changes this chat.

## Route so far
1. Read the table, draft and client scripts and the registry (see findings: F2-F7).
2. Chose Table5 as the Auction Table and the build plan (D1-D4, methods.md).

## Next action
methods.md step 1: set Table5 attribute TableType="Auction", billboard text "Auction Table (2-4 players)", gold Top colour.

## Read first
findings.md, methods.md, then script_read TableManager and Draft in Studio.

## Leads to re-check
None (all facts SETTLED; re-read scripts before editing anyway).

## Results to reuse
None yet.

## Waiting on me
None.

## Don't redo
Exploration of TableManager/Draft/DraftClient/TableClient/AbilityRegistry (summarised in F3-F6).

## Gotchas
- TEMP SOLO TEST min-player changes by another person (F7): keep them.
- ArenaTemplates is in ReplicatedStorage now (TableManager line 14), not ServerStorage.

## Studio/Blender state
- Place saved in Studio: no changes made this chat (last save v59 or later by someone else)
- Rojo in sync: not used
- .blend files: not used
- Only in Studio (not in this folder): all game scripts

## Queue
None

## Chain so far
- Started by session 289f171d-ee0e-4fc2-a3e1-272d181b0b89 at 2026-11-24 22:05
- Hand-off #1 saved 2026-11-24 22:13 by session 289f171d-ee0e-4fc2-a3e1-272d181b0b89
