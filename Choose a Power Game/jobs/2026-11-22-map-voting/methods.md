# Methods: Map voting + arena offset

Procedures that get repeated, as exact numbered steps.

## Edit and test in Studio
1. `list_roblox_studios` (the id changes per session).
2. Edit scripts with `multi_edit` (Edit datamodel); scripts exist only in Studio (no Rojo).
3. Solo test: `start_stop_play` true, drive with `execute_luau` on Server. MCP play is solo only, so a 2-player vote needs the user's test (Test tab, Clients and Servers, 2 players).
4. Stop play, then save the place (`save_place`, or ask the user for Ctrl+S).
