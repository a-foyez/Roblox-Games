# Findings: Map voting + arena offset

Current state only, under 8 KB. Each fact has a source and is SETTLED (verified, will not change) or
LEAD (may have changed, re-check before relying on it). Rewrite or drop facts that go stale.

## Facts
- F1 LEAD: Arena cloning lives in ServerScriptService.TableManager `startMatch` (lines ~85-110): `local ArenaTemplate = ServerStorage.ArenaTemplates.Arena1` (line 15), `ARENA_SPACING = Vector3.new(2000, 0, 0)` (line 16), slot from `takeSlot()` (lowest free, starts at 0, self-checked), `arena:PivotTo(ArenaTemplate:GetPivot() + ARENA_SPACING * slot)`, parent workspace.Arenas, Destroy + free slot after pcall'd match.Run. Draft runs first via `pcall(Draft.Run, players)` while players stay seated; Status attribute "Drafting powers". Source: script_read TableManager, 2026-11-22 13:25.
- F2 LEAD: ArenaTemplates holds only `Arena1` (Model: Spawns folder with 4 Parts Spawn1..Spawn4, Floor (PrimaryPart), 4 Walls; 84x22x84, pivot (0,0,300)). Source: search_game_tree ServerStorage 2026-11-22 13:25, and jobs/2026-11-21-arena-instancing findings F3.
- F3 LEAD: MatchInstance._combat reads `self.arena.Spawns["Spawn"..i]` (i = player order 1..4), RequestStreamAroundAsync, then PivotTo spawn +3 Y. Any new template needs `Spawns/Spawn1..Spawn4` BaseParts; teleport already follows whichever clone is passed in. Source: script_read MatchInstance.
- F4 LEAD: Draft pattern to copy: server `Remotes.Draft:FireClient(p, state)` with `phase`, `options`, `tallies`, `endsAt` (workspace:GetServerTimeNow()); client sends ("Vote", i), server validates integer 1..3 and membership; `Draft._winner(counts, rng)` already does max with random tie-break (self-checked). DraftClient builds ScreenGui "Draft" in code: 3 card buttons with tally labels, timer on Heartbeat. Source: script_read Draft, DraftClient.
- F5 LEAD: Remotes in ReplicatedStorage.Remotes (HostAction, Draft, MeleeRequest, Ability). Scripts: TableManager (Script), MatchInstance/Draft/AbilityService (ModuleScripts in SSS), TableClient/SpectateClient/DraftClient/SprintController/MeleeController (StarterPlayerScripts). Source: search_game_tree.

## Decisions
- D1: Plan (not built): new ModuleScript `ServerScriptService.MapVote` with `Run(players) -> string?` modelled on Draft (reuse `Draft._winner`), new RemoteEvent `Remotes.MapVote`, new LocalScript `MapVoteClient` (DraftClient-style 3-card UI). TableManager calls MapVote.Run before Draft.Run (Status "Voting on map") and clones `ArenaTemplates[mapName]`. Why: proven pattern, least new code. Rejected: folding the vote into Draft (Draft is per-chooser turns).
- D2: Offset: pivot = template pivot + Vector3.new(0, 10000, slot * 50000), as the user asked; keep slot reuse so coordinates stay bounded. Supersedes arena-instancing D1 (user asked explicitly).
- D3: Placeholder maps: rename Arena1 -> Arena_Classic, clone to Arena_Lava (red neon floor) and Arena_Sky (no walls, floating platform), each with Spawns/Spawn1..4.
