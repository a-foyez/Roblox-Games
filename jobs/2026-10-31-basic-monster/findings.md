# Findings: basic monster in Blender, imported into Studio

Current state only, under 8 KB. Each fact has a source and is SETTLED (verified, will not change) or
LEAD (may have changed, re-check before relying on it). Rewrite or drop facts that go stale.

## Facts
- F1 SETTLED: In session 207767db the Blender and Roblox_Studio servers disconnected and were not listed by session_connectors_status even after the user reconnected; .mcp.json still defines both. A new chat should load them. Source: session_connectors_status output, .mcp.json
- F2 SETTLED: The map is 1 Blender unit = 1 stud, ground top at Y=0, playable area X/Z -48..48; open floor around (0,0,-20) to (-10,0,10) is clear. Source: Blender export data, Studio screenshot
- F3 SETTLED: Studio instance name was "Place1"; SpawnLocation at (2, 0.5, 1). Source: list_roblox_studios, execute_luau
- F4 SETTLED: Workspace.BasicMap exists and Baseplate sits in ServerStorage. Source: execute_luau 2026-10-31 19:27 (session a7e2e4ce)
- F5 SETTLED: Workspace.Monster (Model, 11 anchored Parts, PrimaryPart Body) stands at (-5,0,-20) facing +Z; 11 studs tall. Source: execute_luau + screen_capture 2026-10-31 19:29

- F6 SETTLED: ServerScriptService.MonsterAI (Script, --!strict, server only) moves Workspace.Monster by PivotTo each Heartbeat: wanders random points in X/Z -44..44, chases the nearest living player within 60 studs to 20 studs away, throws an anchored Neon fireball every 2.5 s (60 studs/s, raycast hit, 20 damage, 3 s life) into Workspace.Fireballs (folder made at runtime). Source: playtest 2026-10-31 19:31 (moved 38 studs, health 45->35, no console errors)

## Decisions
- D1: Bring Blender models into Studio by reading object transforms in Blender and creating matching anchored Parts with execute_luau; also export an FBX for manual File > Import 3D. Why: the Studio MCP has no local-file import. Rejected: Open Cloud upload (needs an API key the agent must not enter).
- D2: Monster stays anchored Parts moved with PivotTo, fireballs stepped by the script with raycasts. Why: smallest server-only version, no physics ownership or remotes to secure. Rejected: Humanoid rig with welds (more parts to get right), physics-driven fireballs (gravity drop, unreliable Touched). Known limit: monster slides through blocks/platform (shortcut comment in script).
