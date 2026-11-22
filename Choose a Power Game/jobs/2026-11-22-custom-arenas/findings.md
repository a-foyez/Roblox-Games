# Findings: Custom Blender arenas

Current state only, under 8 KB. Each fact has a source and is SETTLED or LEAD.

## Facts
- F1 SETTLED: Maps are in assets/arenas: farm, colosseum, highrise (the "skyscraper" map), moon-base, beach (.blend). assets/basic_map.blend/.fbx are older and unrelated. Source: Glob 2026-11-22 14:12.
- F2 LEAD: Blender tools: *_for_cli fail ("Blender executable not found at 'blender'"); execute_blender_code fails "Cannot connect to Blender at localhost:9876". Source: tool calls 14:13.
- F3 SETTLED: TableManager mapChoices() picks up to 3 random Models from ServerStorage.ArenaTemplates and clones the voted one; MatchInstance reads arena.Spawns.Spawn1..4 (BaseParts), PivotTo spawn +3 Y. Source: jobs/2026-11-22-map-voting/findings.md F3, F8, D4.
- F4 LEAD: No known void/fall handling in MatchInstance (not yet checked). Source: assumption, unverified.
- F5 LEAD: Mesh upload to Roblox is untested (rbx-import-asset skill via Open Cloud; fallback: user uses Asset Manager Bulk Import). Source: not tried.

## Decisions
- D1 (14:14): Per map: trim in Blender (highrise: drop far background buildings), export FBX to assets/arenas/export/, import, wrap in Model `Arena_<Name>` in ArenaTemplates with hand-placed Spawns/Spawn1..4 parts (anchored, invisible, CanCollide false) and a KillZone part under the map; delete Arena_Classic/Lava/Sky. Why: static spawn parts fit the existing MatchInstance contract with no new code. Rejected: procedural bounding-box spawn generator (Gemini prompt), since it guesses floor height badly on non-flat maps like highrise.
