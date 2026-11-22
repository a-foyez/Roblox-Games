# Findings: Custom Blender arenas

Current state only, under 8 KB. Each fact has a source and is SETTLED or LEAD.

## Facts
- F1 SETTLED: Maps are in assets/arenas: farm, colosseum, highrise (the "skyscraper" map), moon-base, beach (.blend). assets/basic_map.blend/.fbx are older and unrelated. Upload folder: assets/arenas/export. Source: Glob 2026-11-22 14:12, ls 14:29.
- F2 SETTLED: Live bridge works (Blender 5.2.3, execute_blender_code). *_for_cli still fail (no blender on PATH). Source: tool call 14:18, again 14:28.
- F3 SETTLED: TableManager picks up to 3 random Models from ServerStorage.ArenaTemplates and clones the voted one; MatchInstance reads arena.Spawns.Spawn1..4 (BaseParts), PivotTo spawn +3 Y. Source: jobs/2026-11-22-map-voting/findings.md F3, F8, D4.
- F4 SETTLED: MatchInstance._combat polls every 0.2 s and knocks out any fighter who left, respawned or has Health <= 0 (line 170). Lethal melee sets 1 HP. So a KillZone only has to set Health = 0. Source: script_read MatchInstance + execute_luau 14:29.
- F5 SETTLED: Upload flow works (methods "Export and upload"). insert_asset brings the Model in as a package with each MeshPart in a "NAME_Node" Model; 1 Blender m = 1 stud; all parts arrive unanchored, CanCollide true, Default fidelity, grey colour. Source: open_cloud_invoke + execute_luau 14:35.
- F6 SETTLED: Object names end in a hex colour = intended part Color. Source: execute_blender_code 14:19.
- F7 SETTLED: SlipZone_* boxes (6 polys, white) exist in every map as anti-camping spots. Source: same.
- F8 SETTLED: Per-collection counts: farm "Farm" 188 meshes/39.0k polys, colosseum "Colosseum" 103/67.4k, moon-base "MoonBase" 179/25.8k, beach "Beach" 209/19.4k, plus an empty *_Render collection each. Source: execute_blender_code 14:28.
- F9 SETTLED: TableManager clones the template, PivotTo(pivot + (0, 10000, slot*50000)) into workspace.Arenas, destroys it after the match. FallenPartsDestroyHeight (-500) is far below, so each map needs its own KillZone (D4). Source: script_read TableManager 14:33.
- F10 SETTLED: highrise trimmed (D2), exported to assets/arenas/export/highrise.glb (145 meshes, none over 2048). Asset 118252970461216. Source: execute_blender_code 14:32.
- F11 SETTLED: Arena_Highrise built per methods "Fix an imported map" (City* = background, deck tops Y 202, KillZone Y 160). Source: execute_luau 14:35.
- F12 SETTLED: ServerScriptService.ArenaZones (--!strict): every "KillZone"-tagged BasePart (incl. match clones) Touched -> Health = 0. Placeholders Arena_Classic/Lava/Sky parked in ServerStorage._PlaceholderHold. Highrise passed "Test a map solo". 2-player match not tested (MCP play is solo). Source: execute_luau 14:40.
- F13 SETTLED: ArenaZones also handles tag "SlipZone": Touched -> Knockback remote, outward*45 + (0,30,0), 0.4 s cooldown (lift 10 failed). Source: execute_luau 14:43-14:45.
- F14 SETTLED: Highrise SlipZone_H12 untagged (crane parts box the player in, D6); the other 12 push. Source: execute_luau 14:50.
- F15 SETTLED: farm.blend holds 4 scenes: Colosseum, Farm, MoonBase, Scene, so bpy.data.objects counts all of them. Export only the active scene (use_active_scene=True). Other .blend files may also hold several scenes: check. Source: execute_blender_code 14:57.
- F16 SETTLED: Farm DONE. Asset 117768832918480 (Model, Approved). ServerStorage.ArenaTemplates.Arena_Farm: 188 MeshParts anchored + coloured; 116 Deco_* = background (no collide/touch/query, Box). Floor_6CC24A top Y 3 (200x200 at -45,-152). Barrier_F01..F06 (white) = boundary walls: Transparency 1, still collide. Spawns 1-4 at XZ (-89,-217) (1,-217) (-89,-87) (-19,-77), Y 3.5. KillZone 1200x10x1200 at Y -37. 6 SlipZone_F0x tagged. Solo test: spawns dy 2.2 HP 100; 6/6 SlipZones push; KillZone HP 0 in 0.6 s. Place saved v51. Source: open_cloud_invoke + execute_luau 2026-11-22 14:55-15:00.

## Decisions
- D1 (14:14): Per map: trim in Blender if needed, export, upload, import, wrap in Model `Arena_<Name>` in ArenaTemplates with hand-placed Spawns/Spawn1..4 and a KillZone under the map; delete Arena_Classic/Lava/Sky at the end. Why: fits the MatchInstance contract with no new code. Rejected: procedural bounding-box spawn generator (Gemini prompt), guesses floor height badly on non-flat maps.
- D2 (14:22, user OK 14:28): highrise trim = delete CityOuter_*, CityFar_*, stray Cube; shrink CityStreet under 2048. Rejected: deleting all city layers (rooftop would float in a void).
- D3 (14:28, user answers): (a) upload each map as a permanent Model asset: YES. (b) asset:read + asset:write granted, upload folder assets/arenas/export approved. (c) SlipZones: make players slide off (for now). (d) highrise trim D2: YES.
- D4 (14:29): KillZone = anchored invisible CanCollide-false part tagged "KillZone" under each map (F4, F12). Rejected: editing MatchInstance to watch Y height.
- D5 (14:43): SlipZones = server push via the existing "Knockback" remote (F13). Rejected: tilting SlipZone tops, Friction 0 (does not move a standing Humanoid).
- D6 (14:49): H12 untagged instead of resized. Rejected: shrinking/raising the zone (still boxed in).
- D7 (14:58): Farm Barrier_* (white, 68 tall, around the floor edge) made invisible but kept solid, like SlipZones' white = gameplay helper. Rejected: deleting them (players could walk off the farm).
