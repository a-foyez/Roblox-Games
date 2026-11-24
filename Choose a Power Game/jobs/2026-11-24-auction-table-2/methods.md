# Methods: Auction Table

## Build order (next chat)
1. DONE (v83). Table5: attribute TableType="Auction", relabel billboard, gold Top (execute_luau Edit).
2. DONE (v84). Draft.MapVote(players, names, label?, nextText?); DraftClient shows "Vote: {label}", "{label}: {winner}", nextText.
3. DONE (v85). ReplicatedStorage.AuctionPowers (20 placeholders) with a self-check (20 unique ids).
4. Remotes.Auction RemoteEvent; ServerScriptService.Auction with pure bid-check function + asserts (balance > bid, passed, leader).
5. TableManager: if model:GetAttribute("TableType") == "Auction": map vote, rounds vote, powers vote, Auction.Run instead of Draft.Run; set RoundsToWin from the vote.
6. AuctionClient LocalScript: panel with power name, current bid + leader, countdown, all balances, Bid (+$1) / Pass buttons.
7. Solo playtest (start_stop_play, sit in Table5 via execute_luau Server, fire HostAction Start), check console.
