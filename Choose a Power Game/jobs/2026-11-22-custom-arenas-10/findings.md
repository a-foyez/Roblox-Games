# Findings: Custom Blender arenas (part 10)

Current state only, under 8 KB. Each fact has a source and is SETTLED or LEAD.
Earlier facts (F1-F26, D1-D9): jobs/2026-11-22-custom-arenas-9/findings.md.

## Facts
- F1 SETTLED: ghost-town.blend and cargo-ship.blend are in assets/arenas (user copy). Source: ls 2026-11-22 16:01.

- F2 SETTLED: ghost-town.blend scenes: GhostTown (137 meshes / 23.9k polys, none over 2048, no trim), Scene (1 Cube). Prefixes: Deco 83, SlipZone 14, Barrier 4, Porch/PorchRoof/PorchPost 4 each, WaterTower 5, Trestle 3, Wagon 3, RedRock 3, Balcony 2, Well 2, Cactus 2, Floor 1, Ladder 1, OreCart 1, WindPump 1. Deco_Ground_E3C07E is 1200 across (background). Exported to assets/arenas/export/ghost-town.glb (2.7 MB). Source: execute_blender_code 2026-11-22 16:01.
- F3 LEAD: ghost-town uploaded as Model Arena_GhostTown; operation 73bba429-38d4-45f6-aa76-1273176f9b6b was still done:false at 16:03. Poll GET /assets/v1/operations/73bba429-38d4-45f6-aa76-1273176f9b6b for response.assetId. Source: open_cloud_invoke 16:02-16:03.
- F4 SETTLED: Studio id a8dafb2f-40d9-403c-96ba-00336a2bf161 (placeId 132554684595689), Edit mode. Source: list_roblox_studios 16:02.

## Decisions
None yet.
