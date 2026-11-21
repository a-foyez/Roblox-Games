# Findings: lobby

## Facts
- F1 SETTLED: Old lobby was 3 tables (Table1, Table2 = 1v1, Table3 = 4 seats) in Workspace.Tables on a 2048-stud grass Baseplate, SpawnLocation at the origin. Source: execute_luau tree dump, 2026-11-21.
- F2 SETTLED: TableManager treats any Model in workspace.Tables with a Seat named HostSeat plus at least one other Seat as a table; TableClient watches workspace.Tables attributes. No script references table names, positions, BillboardGuis or the Baseplate. Source: script_read TableManager, TableClient; script_grep "Tables", "Top".
- F3 SETTLED: Arenas are cloned from ServerStorage.ArenaTemplates.Arena1 (centre 0,10,300, size 84) and offset 2000 studs on X per slot, so they don't overlap the lobby. Source: TableManager lines 15-16, 90-93; GetBoundingBox.
- F4 SETTLED: Generator built 524 instances: fountain at the origin (3 tiers, water spray particles), cobblestone plaza r=28, 6 paths, 6 table pads at r=55 (1v1 at 30/150/210/330 deg = Table1,3,4,6 in red; 1v1v1v1 at 90/270 deg = Table2,5 in gold), lamps with PointLights, 5 benches, 57 trees, 28 rocks. Spawn moved to (19,0.4,0). Source: execute_luau output.
- F5 SETTLED: Screenshot from (70,55,70) shows the layout as intended, labels readable. Source: screen_capture 2026-11-21.
- F6 LEAD: New tables work with TableManager (seat, host panel, start, reseat after match). Not playtested.

## Decisions
- D1: Tables stay in Workspace.Tables; decor goes in Workspace.Lobby. Why: both table scripts look up workspace.Tables. Rejected: grouping everything into Workspace.Lobby (Gemini's idea) as it breaks the scripts.
- D2: Build with plain parts from a re-runnable generator, no Blender. Why: parts look fine in this style, and Blender meshes need an Open Cloud upload step. Rejected: Blender models now (could come later for a fancier fountain or trees).
- D3: Kept the Baseplate as the grass ground. Why: it's the grass between paths. Rejected: deleting it.
- F7 SETTLED: Boundary built: 48 invisible, collidable wall parts (200 tall) in a ring at r=122 (Workspace.Lobby.Boundary), just past the outer woods (r<=115). Source: execute_luau run of the generator, 2026-11-21 14:00.
- F8 SETTLED: Scenery past the wall (Workspace.Lobby.Scenery, 202 children): 14 grass hills (sunk balls, angles -60..160, r 130-230), a slate cliff face at r~175 over 190-310 deg with trees on top, 55 trees and 30 rocks at r 128-200. Kept inside r=235 because arena slot 0 would sit at z=300. Source: execute_luau output + screenshot ScreenCapture_3.
- F9 SETTLED: Sunset lighting: ClockTime 17.6 (18.1 already showed night stars), Brightness 1.6, warm Ambient/OutdoorAmbient, ColorShift_Top orange, Atmosphere density 0.38 haze 1.8 warm. Lamps stand out; screenshot looked right. Place saved (version 32). Source: screen_capture 2026-11-21 14:02.
- D4: Hills and cliff made from parts, not Terrain. Why: matches the part style and the generator can delete/rebuild them; Terrain is empty (0 cells). Rejected: Terrain hills (would need Terrain clearing on re-run).
- F10 SETTLED: Blocky Tree Pack (asset 7298117174, the link the user gave) holds Models Bush, Mini Tree, Pine Tree (4x16x4), Big Tree (15x25x15), Pile of leaves. Sakura (16014247305) is one Model "Cherry Blossom M", about 67x73x51. Neither has any scripts. Both stored in ServerStorage.LobbyAssets. Source: execute_luau, 2026-11-21 14:25.
- F11 SETTLED: Generator updated and run: all procedural trees (lobby, outer scenery, cliff top) are now clones from the pack (pines weighted 3/7, big 2/7, mini 1/7, bush 1/7). New Workspace.Lobby.SakuraGarden: cobblestone path at 0 deg (spawn gap) from the plaza to a 15-stud clearing at r=96 with the sakura scaled 0.45, two lamps and falling-petal particles. Place saved (version 34). Source: execute_luau + ScreenCapture_1.
- F12 LEAD: Big blocky trees crowd the sakura path and garden (one stands at the garden's entrance edge and hides the sakura from the plaza). Cause: clear() margins were sized for the old small trees, but Big Tree canopies are ~20 studs wide at scale 1.3. Source: ScreenCapture_1, 2026-11-21 14:27.
- D5: Low-Poly-Tree (5981035698) not used: the user only said to use the sakura and blocky trees. Rejected: guessing a role for it.
