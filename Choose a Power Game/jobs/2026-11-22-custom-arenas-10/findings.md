# Findings: Custom Blender arenas (part 10)

Current state only, under 8 KB. Each fact has a source and is SETTLED or LEAD.
Earlier facts (F1-F26, D1-D9): jobs/2026-11-22-custom-arenas-9/findings.md.

## Facts
- F1 SETTLED: ghost-town.blend and cargo-ship.blend are in assets/arenas (user copy). Source: ls 2026-11-22 16:01.

- F2 SETTLED: ghost-town.blend scenes: GhostTown (137 meshes / 23.9k polys, none over 2048, no trim), Scene (1 Cube). Prefixes: Deco 83, SlipZone 14, Barrier 4, Porch/PorchRoof/PorchPost 4 each, WaterTower 5, Trestle 3, Wagon 3, RedRock 3, Balcony 2, Well 2, Cactus 2, Floor 1, Ladder 1, OreCart 1, WindPump 1. Deco_Ground_E3C07E is 1200 across (background). Exported to assets/arenas/export/ghost-town.glb (2.7 MB). Source: execute_blender_code 2026-11-22 16:01.
- F3 SETTLED: ghost-town asset id 108716445857889 (operation done, Approved). Source: open_cloud_invoke 2026-11-22 16:04.
- F5 SETTLED: Arena_GhostTown is in ServerStorage.ArenaTemplates: 123 parts (83 Deco background, 4 Barrier invisible walls); 14 SlipZone moved to _RemovedMapBlocks. Floor_EDCB86 top Y 2.707. Spawn1-4 at 79 studs from floor centre, Y 3.207. KillZone 2000x4x2000 at Y -29.3. Solo test: every spawn dy 2.17 HP 100, KillZone HP 0. Saved v58. Source: execute_luau + save_place 16:04-16:05.
- F6 SETTLED: cargo-ship.blend scenes: CargoShip (252 meshes / 31k polys, none over 2048, no trim; 23 Floor_ parts, 177 Deco, 6 SlipZone, 6 Barrier, 8 Ladder, StackA/B, Crane...), plus a GhostTown copy and Scene. CargoShip exported to assets/arenas/export/cargo-ship.glb (3.5 MB). Source: execute_blender_code 16:05.
- F7 SETTLED: cargo-ship asset id 87138548471776 (operation eaeb8ffc done, Approved). Source: open_cloud_invoke 16:07.
- F8 SETTLED: Arena_CargoShip is in ServerStorage.ArenaTemplates: 246 parts (177 Deco background, 6 Barrier invisible walls, 23 Floor); 6 SlipZone moved to _RemovedMapBlocks. Deck top Y 40; 1147 free probe spots; Spawn1-4 at (-115,-169) (37,-177) (-115,-129) (37,-125), Y 40.5, 79-80 studs from centre (-38,-151). KillZone 2000x4x2000 at Y 8. Solo test: every spawn dy 2.18 HP 100, KillZone HP 0. Saved v59. Source: execute_luau + save_place 16:08-16:10.
- F4 SETTLED: Studio id a8dafb2f-40d9-403c-96ba-00336a2bf161 (placeId 132554684595689), Edit mode. Source: list_roblox_studios 16:02.

## Decisions
None yet.
