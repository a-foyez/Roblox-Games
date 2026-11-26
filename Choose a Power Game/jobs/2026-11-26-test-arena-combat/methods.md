# Methods: Test arena combat + multi-power terminal

## Playtest the test arena via MCP
1. start_stop_play(true); in Client datamodel fire Remotes.TestTeleport:FireServer(true).
2. Fire Remotes.TestLoadout:FireServer({"PhaseDash","Shockwave"}, {...}) and check Loadout/TestMode attributes on Server.
3. get_console_output for errors; start_stop_play(false); save_place.
