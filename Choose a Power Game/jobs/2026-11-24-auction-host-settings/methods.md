# Methods: Auction table host settings

## Quick test of the auction host panel
1. start_stop_play true.
2. Server execute_luau: wait for the player's Humanoid, then workspace.Tables.Table5.HostSeat:Sit(hum).
3. Client execute_luau: Remotes.HostAction:FireServer("RoundTime", 300 / 600 / 45) and ("RoundsToWin", 5); read Table5 attributes and HostSettings.Frame button texts after each.
4. screen_capture, get_console_output, start_stop_play false.

## Quick test of the settings screen
See jobs/2026-11-24-auction-settings-vote/methods.md.
