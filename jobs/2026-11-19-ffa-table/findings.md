# Findings: 1v1v1v1 table (2-4 players)

Current state only, under 8 KB. SETTLED = verified; LEAD = re-check before relying on it.

## Facts
- F1 SETTLED: Workspace.Tables.Table3 at (0,0,-45): 7x7 Top, Leg, Seats HostSeat (z-5.5), GuestSeat (z+5.5), GuestSeat2 (x-5.5), GuestSeat3 (x+5.5), all facing the centre; BillboardGui "1v1v1v1 (2-4 players)" on Top. Arena1.Spawns gained Spawn3 (-25,1.5,300) and Spawn4 (25,1.5,300) facing the centre. Source: execute_luau, 2026-11-19 23:06.
- F2 SETTLED: Script changes:
  - TableManager: a table is any Model with HostSeat + at least one more Seat (HostSeat listed first). Start needs >= 2 seated (was == 2). Players list = host first, then other occupants; all reseated after the series.
  - MatchInstance: new(players, settings, arena) for 2-4 players (old signature new(p1, p2, ...) is gone). Free-for-all: each round ends when one player is left; a lethal hit leaves the victim at 1 HP, marks them out and removes their Sword. Sword hits the nearest standing foe in range/in front. Timeout: highest health among those standing wins, tie for top = no point. Run returns the first to RoundsToWin, the last player present, or nil.
  - TableClient: Start enabled when SeatedCount >= 2.
  Source: multi_edit / execute_luau Source write, 2026-11-19 23:07.
- F3 SETTLED: Solo playtest 23:08: sitting in Table3.GuestSeat2 -> SeatedCount 1, that player became host; host panel visible with Start dimmed; MatchInstance.new({p}):Run() returns p at once; no console errors. Source: execute_luau Server/Client.

## Decisions
- D1: Knocked-out players stay in the arena with 1 HP and no sword until the round ends. Why: smallest change, reuses the "nobody really dies" rule (table-lobby D4). Rejected: sending them back to the lobby mid-round (they'd need re-teleporting each round anyway).
- D2: One sword hit picks the nearest valid foe instead of hitting all in range. Why: keeps damage per swing the same as 1v1. Rejected: area hits.
- D3: Table detection by "HostSeat + any other Seats" instead of fixed seat names. Why: 1v1 tables still match unchanged; new tables need no code change.
