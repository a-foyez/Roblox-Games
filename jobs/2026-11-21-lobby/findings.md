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
