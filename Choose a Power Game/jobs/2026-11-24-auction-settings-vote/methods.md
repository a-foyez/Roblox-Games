# Methods: Auction table combined settings vote

## Quick test of the settings screen
1. start_stop_play true.
2. Server execute_luau: require(ServerScriptService.Draft).SettingsVote(Players:GetPlayers(), {mapNames, {"1","2","3","5"}, {"6","8","12","16"}}) in task.spawn, print the result.
3. Client execute_luau: Remotes.Draft:FireServer("Setting", i, g); screen_capture; get_console_output after 10s.
