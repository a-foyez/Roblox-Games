# Methods: auction bid layout

## Solo auction screen check
1. start_stop_play is_start true.
2. execute_luau Server: `local p = game.Players:GetPlayers()[1]; task.spawn(function() require(game.ServerScriptService.Auction).Run({p}, 3) end)`
3. Within 5 s: screen_capture, then get_console_output.
4. start_stop_play is_start false.
