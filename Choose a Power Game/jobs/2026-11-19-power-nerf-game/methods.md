# Methods: Choose a Power, GET NERFED! game core

## Solo smoke test (via MCP)
1. start_stop_play is_start=true on studio "Choose a Power, GET NERFED!".
2. execute_luau Client: connect DraftRemote.OnClientEvent; on "choose" FireServer("pick", opts[1].id). Wait ~30 s.
3. execute_luau Server: check Players[1].Character position (z about 250), attributes, Sword in Backpack.
4. get_console_output for errors, then start_stop_play is_start=false.

## Add a power or nerf
1. Edit ServerScriptService.PowerDefs: add an entry to `powers` with id, name, desc, apply(char), and exactly 3 nerfs.
2. Use the helpers (every, scale, add, paint, popup); effects must live on the character so death clears them.
