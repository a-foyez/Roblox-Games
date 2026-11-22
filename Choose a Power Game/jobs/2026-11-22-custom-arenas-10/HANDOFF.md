# Hand-off: Custom Blender arenas (part 10: ghost-town, cargo-ship)

## Goal
last two maps to import can you do it the exact same way as you did the previous maps
Source: user message, 2026-11-22 16:00 (files ghost-town.blend, cargo-ship.blend; user copied them into assets/arenas)

## Done when
last two maps to import can you do it the exact same way as you did the previous maps
Source: same message (no separate criteria: both maps in ServerStorage.ArenaTemplates per methods.md, passing "Test a map solo", place saved)

## Don'ts
None stated.
Source: same message. Carried over: keep Barrier_* as invisible walls, drop SlipZone_* (jobs/2026-11-22-custom-arenas-9 F17, F18).

## Status
Done. Ghost-town (F5) and cargo-ship (F8) both in ArenaTemplates, solo tests passed, place saved v59.

## Route so far
1. Job folder made; methods.md copied from part 9 (see findings: F1).
2. Ghost-town inspected, exported, uploaded (F2, F3).
3. Ghost-town inserted, fixed, solo test passed, saved v58 (F5).
4. Cargo-ship inspected, exported, uploaded (F6, F7).
5. Cargo-ship inserted, fixed, solo test passed, saved v59 (F8).

## Next action
None: job done. Optional: a real 2-player match on GhostTown and CargoShip (MCP play is solo only).

## Read first
methods.md, findings.md

## Leads to re-check
None

## Results to reuse
assets/arenas/export/cargo-ship.glb (F6); upload operation eaeb8ffc-e45d-4b7e-bf2a-2c18d52e2a05 (F7). Ghost-town fix used methods steps 1-4 unchanged (F5).

## Waiting on me
None

## Don't redo
Both maps entirely (F5, F8).

## Gotchas
- stay-in-project hook blocks Downloads AND the scratchpad; keep every file in the project. Bash from project root with relative paths.
- No python on this machine; the hook also misreads regex strings like "\n## " in inline node scripts as paths. Use Edit/Write for job files.
- .blend files hold several scenes (cargo-ship.blend also has a GhostTown scene); set CargoShip before any re-export.

## Studio/Blender state
- Place saved in Studio: yes, v59, no changes since
- Rojo in sync: not used
- .blend files: cargo-ship.blend open in Blender, unmodified (scene switched to CargoShip only), exported to export/cargo-ship.glb; ghost-town.blend unmodified
- Only in Studio (not in this folder): ArenaTemplates (Farm, Highrise, Colosseum, MoonBase, Beach, GhostTown, CargoShip), ServerStorage._RemovedMapBlocks

## Queue
None

## Chain so far
- Started by session f7fc6c1a-5ddd-48e2-ab4e-2fdff2149dbd at 2026-11-22 16:01
- Hand-off #1 saved 2026-11-22 16:05 by session f7fc6c1a-5ddd-48e2-ab4e-2fdff2149dbd
- Resumed by session d406cd36-babd-42fe-8812-24f3a9dd1460 at 2026-11-22 16:03
- Hand-off #2 saved 2026-11-22 16:07 by session d406cd36-babd-42fe-8812-24f3a9dd1460
- Resumed by session 9187c830-f94f-4451-afc7-029ba2b70d99 at 2026-11-22 16:07
