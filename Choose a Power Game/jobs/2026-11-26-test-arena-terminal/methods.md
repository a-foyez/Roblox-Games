# Methods: Test arena combat + multi-power terminal

## Playtest the test arena via MCP
1. start_stop_play(true); in Client datamodel fire Remotes.TestTeleport:FireServer(true).
2. Fire Remotes.TestLoadout:FireServer({"PhaseDash","Shockwave"}, {...}) and check Loadout/TestMode attributes (Loadout should read "R Phase Dash (...) | E Shockwave (...)"). A nerf from an unchosen power must leave the loadout unchanged (wait 1.1 s between sends: 1 s rate limit).
3. Melee check: on Server set InTestArena true, PivotTo 3 studs in front of Dummy1 facing it; on Client fire Remotes.MeleeRequest:FireServer("Punch"); wait 0.5 s and read Dummy1 Humanoid.Health (first fire right after the teleport may miss: fire twice).
4. get_console_output for errors; start_stop_play(false); save_place.
