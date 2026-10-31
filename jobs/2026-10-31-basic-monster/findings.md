# Findings: basic monster in Blender, imported into Studio

Current state only, under 8 KB. Each fact has a source and is SETTLED (verified, will not change) or
LEAD (may have changed, re-check before relying on it). Rewrite or drop facts that go stale.

## Facts
- F1 SETTLED: In session 207767db the Blender and Roblox_Studio servers disconnected and were not listed by session_connectors_status even after the user reconnected; .mcp.json still defines both. A new chat should load them. Source: session_connectors_status output, .mcp.json
- F2 SETTLED: The map is 1 Blender unit = 1 stud, ground top at Y=0, playable area X/Z -48..48; open floor around (0,0,-20) to (-10,0,10) is clear. Source: Blender export data, Studio screenshot
- F3 SETTLED: Studio instance name was "Place1"; SpawnLocation at (2, 0.5, 1). Source: list_roblox_studios, execute_luau
- F4 LEAD: Workspace.BasicMap exists and Baseplate sits in ServerStorage. Source: execute_luau in session 207767db; place may not have been saved

## Decisions
- D1: Bring Blender models into Studio by reading object transforms in Blender and creating matching anchored Parts with execute_luau; also export an FBX for manual File > Import 3D. Why: the Studio MCP has no local-file import. Rejected: Open Cloud upload (needs an API key the agent must not enter).
