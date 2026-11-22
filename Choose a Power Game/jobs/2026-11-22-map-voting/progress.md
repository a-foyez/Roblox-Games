# Progress: Map voting + arena offset

Dated log, newest last. Format: `YYYY-MM-DD HH:MM — what happened`.

- 2026-11-22 13:20 — Job started by session c4fdd47f-b057-4566-876a-03c6b84bb2dd
- 2026-11-22 13:28 — Read TableManager, MatchInstance, Draft, DraftClient, ServerStorage tree (F1-F5); plan D1-D3. No edits yet.
- 2026-11-22 13:30 — Hand-off #1 started (50% checkpoint)
- 2026-11-22 13:32 — Hand-off #1 saved
- 2026-11-22 13:34 — Resumed by session 0f410153-5870-4671-add1-f0f5a30d93e5; re-read TableManager, Draft, DraftClient (F1, F4 confirmed)
- 2026-11-22 13:35 — Workflow step 1 done: TableManager offset is now `arenaOffset(slot)` = Vector3.new(0, 10000, slot * 50000); compiles (loadstring); place saved v43. Not playtested.
- 2026-11-22 13:35 — Hand-off #2 started (50% checkpoint)
- 2026-11-22 13:37 — Hand-off #2 saved
- 2026-11-22 13:56 — Resumed; F2 re-checked; placeholder maps built.
- 2026-11-22 13:58 — MapVote + client + TableManager done, solo-tested, saved v44. Step 4 summary given; waiting on user test.
