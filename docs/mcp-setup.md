# MCP setup

Both servers are configured in [.mcp.json](../.mcp.json).

## Roblox Studio MCP

The `Roblox_Studio` MCP server launches Roblox's bundled `StudioMCP.exe` via `%LOCALAPPDATA%\Roblox\mcp.bat`.

- Roblox Studio must be open with the "Choose a Power, GET NERFED!" place loaded for the MCP tools to work.
- Prefer the MCP tools to inspect and edit the live place (instances, scripts, properties) rather than guessing at its structure.
- If the tools are missing or fail, check that Studio is running and that the MCP server is enabled in Studio (Assistant/MCP settings).

## Blender MCP

The `Blender` MCP server (Blender Lab's `blender-mcp`) runs from a venv at `%LOCALAPPDATA%\blender-mcp\venv` and
talks to the Blender "MCP" add-on over `localhost:9876`.

- Blender must be open, with Preferences → System → Network → Allow Online Access on, and the MCP add-on's bridge
  server running (add-on preferences → Start MCP Bridge Server, or Auto Start).
