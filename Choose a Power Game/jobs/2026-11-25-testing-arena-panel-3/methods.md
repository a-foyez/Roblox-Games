# Methods: In-game Superpower Testing Arena panel

## Playtest
1. list_roblox_studios, pick "Choose a Power, GET NERFED!".
2. start_stop_play is_start=true; check get_console_output for errors; start_stop_play is_start=false when done.

## Server check without clicking
1. During a playtest, execute_luau on Client: `game.ReplicatedStorage.Remotes.TestLoadout:FireServer("Juggernaut", {"Sluggish"})`, wait 2 s, read Humanoid MaxHealth/WalkSpeed/JumpPower and the TestMode/Loadout attributes. Wait over 1 s between fires (rate limit). `FireServer(nil)` resets.
