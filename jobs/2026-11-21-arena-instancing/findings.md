# Findings: Dynamic arena instancing

## Facts
- F1 SETTLED: Before this job, TableManager held one `arenaBusy` lock and passed workspace.Arenas.Arena1 to MatchInstance; nothing else referenced the arena. Source: script_grep "Arena" / "workspace%." 2026-11-21.
- F2 SETTLED: Draft keeps per-player turn state (`turnOf[player]`), so drafts at two tables already run side by side; only its comment mentioned the lock. Source: script_read Draft.
- F3 SETTLED: Arena1 bounding box 84x22x84 at (0,10,300), pivot (0,0,300), PrimaryPart Floor. Workspace.StreamingEnabled = true. Source: execute_luau, Edit.
- F4 SETTLED: Spectating had no match scope: SpectateClient watched any player with Fighting == true, so it would cross matches once two run at once. Source: script_read SpectateClient.
- F5 SETTLED: Built (Studio, saved v19): Arena1 moved to ServerStorage.ArenaTemplates.Arena1; Workspace.Arenas is now an empty container for clones. TableManager: lock removed, `takeSlot()` (lowest free slot, self-checked), clone named `Arena_` + slot number pivoted to template pivot + (2000,0,0)*slot, Destroy() + slot freed right after the pcall'd match.Run (covers win, timeout, leavers and errors). MatchInstance: RequestStreamAroundAsync before PivotTo; sets player attribute `Arena` with Fighting, clears both in _cleanup. SpectateClient: only fighters whose `Arena` equals mine.
- F6 SETTLED: Solo server test: clone at slot 1, MatchInstance._combat placed the player at (2000,4.5,275), Arena attr = "Arena_1", cleared after _cleanup, 0 clones left after Destroy. No console errors. Source: execute_luau Server, 2026-11-21 ~11:55.
- F7 LEAD: Two concurrent matches + cross-match spectating not tested yet (MCP play is solo only).

## Decisions
- D1: Reuse lowest free slot, slot 0 = the template's original spot. Why: positions stay bounded and a lone match plays exactly where it used to. Rejected: Gemini's ever-growing match_index * 2000 at Y 10000 (unbounded coordinates, no gain).
- D2: Spectator scoping via a player attribute `Arena`. Why: one line on each side, client already reads player attributes. Rejected: a remote telling the client which arena (more code, same result).
- D3: Skipped lobby-table spectating of other matches: it doesn't exist in the game; only knocked-out players spectate. Ask the user if they want it.
