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
Ghost-town exported and upload sent (operation pending). Nothing changed in Studio yet. Cargo-ship not started.

## Route so far
1. Job folder made; methods.md copied from part 9 (see findings: F1).
2. Ghost-town inspected, no trim, exported (F2).
3. Ghost-town upload sent (F3, LEAD).

## Next action
Poll GET /assets/v1/operations/73bba429-38d4-45f6-aa76-1273176f9b6b (scope asset:read, studio id in F4) until done:true, take response.assetId, then insert_asset into ServerStorage and run methods "Fix an imported map" for Arena_GhostTown (Deco_* = background; drop SlipZone_*; keep Barrier_* invisible walls; read floor top after insert). Then do cargo-ship from methods "Open a map".

## Read first
methods.md, findings.md

## Leads to re-check
F3: the upload operation finished and gave an asset id.

## Results to reuse
assets/arenas/export/ghost-town.glb (F2); upload operation 73bba429-38d4-45f6-aa76-1273176f9b6b (F3).

## Waiting on me
None

## Don't redo
Ghost-town inspection and export (F2). Do not upload ghost-town again unless F3 failed.

## Gotchas
- stay-in-project hook blocks Downloads AND the scratchpad; keep every file in the project. Bash from project root with relative paths.
- Don't put a `python - <<'PY'` heredoc in a long command: an unclosed heredoc swallows the rest.
- .blend files hold several scenes; set the right scene before export.

## Studio/Blender state
- Place saved in Studio: yes, v56, no changes since
- Rojo in sync: not used
- .blend files: ghost-town.blend open in Blender, unmodified (scene switched only), exported to export/ghost-town.glb; cargo-ship.blend untouched
- Only in Studio (not in this folder): ArenaTemplates (Farm, Highrise, Colosseum, MoonBase, Beach)

## Queue
None

## Chain so far
- Started by session f7fc6c1a-5ddd-48e2-ab4e-2fdff2149dbd at 2026-11-22 16:01
- Hand-off #1 saved 2026-11-22 16:05 by session f7fc6c1a-5ddd-48e2-ab4e-2fdff2149dbd
