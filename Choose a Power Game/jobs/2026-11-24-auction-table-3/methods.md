# Methods: Auction Table

## Build order (next chat)
1. DONE (v83). Table5: attribute TableType="Auction", relabel billboard, gold Top (execute_luau Edit).
2. DONE (v84). Draft.MapVote(players, names, label?, nextText?); DraftClient shows "Vote: {label}", "{label}: {winner}", nextText.
3. DONE (v85). ReplicatedStorage.AuctionPowers (20 placeholders) with a self-check (20 unique ids).
4. DONE (v86). Remotes.Auction RemoteEvent; ServerScriptService.Auction with pure bid-check function + asserts (balance > bid, passed, leader).
5. DONE (v87). TableManager auction branch: map, rounds, powers votes, Auction.Run instead of Draft.Run; RoundsToWin from the vote.
6. DONE (v87). StarterPlayerScripts.AuctionClient LocalScript panel.
7. Solo playtest:
   1. start_stop_play is_start=true; get_studio_state until Server/Client exist.
   2. execute_luau Server: sit the player's Humanoid in workspace.Tables.Table5.HostSeat (seat:Sit(hum)), wait 1 s.
   3. Host starts: execute_luau Client: ReplicatedStorage.Remotes.HostAction:FireServer("Start").
   4. Votes run 10 s + 2.5 s each (3 votes, ~40 s); then lots of 5 s. In Client, read PlayerGui.Auction panel texts; press Bid with Remotes.Auction:FireServer("Bid") and check balance drops by the bid when sold.
   5. get_console_output: no errors from Auction/AuctionClient/TableManager/Draft. Stop playtest.
