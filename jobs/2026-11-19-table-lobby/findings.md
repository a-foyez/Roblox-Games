# Findings: 1v1 Table Lobby system

Current state only, under 8 KB. SETTLED = verified; LEAD = re-check before relying on it.

## Facts
- F1 SETTLED: Before this job the place held only Baseplate + SpawnLocation; no scripts, no AbilityService (the old power-nerf build was deleted, see jobs/2026-11-19-power-nerf-game). Source: execute_luau tree dump, 2026-11-19 22:35.
- F2 SETTLED: Built: Workspace.Tables.Table1 (x=-14) and Table2 (x=14), z=-20, each a Model with Top, Leg, HostSeat, GuestSeat (Seats facing each other). Workspace.Arenas.Arena1 centred (0,0,300): 80x80 Floor, 4 see-through Walls, Spawns.Spawn1 (z=275) / Spawn2 (z=325), invisible, facing centre. ReplicatedStorage.Remotes with RemoteEvents HostAction and Ability. Source: execute_luau, 2026-11-19.
- F3 SETTLED: Written in ServerScriptService:
  - AbilityService (ModuleScript): Abilities.Dash {Cooldown 2, OnActivate -> Ability:FireClient(player, "Dash")}, Nerfs.Slowed {OnEquip WalkSpeed*=0.75, OnUnequip /=0.75}. API: Equip(player, character, abilityName, nerfName), Unequip(player). Listens to Remotes.Ability (no args): only acts if player is equipped, alive, same character, off cooldown.
  - MatchInstance (ModuleScript, OOP): new(p1, p2, {RoundsToWin, RoundTime}, arenaModel); :Run() yields and returns winner or nil. Each round: LoadCharacter both, PivotTo Spawn1/Spawn2, give server-checked Sword tool (20 dmg, 7 studs, in-front check, 0.5 s cooldown), Equip Dash+Slowed. Round ends on lethal hit (victim left at 1 HP), leave/reset/respawn, or timeout (lower health loses, tie = no point). Cleanup disconnects, unequips, waits 3 s.
  - TableManager (Script): tracks Occupant on both seats, pickHost keeps the host while seated, else first remaining occupant (assert self-check at load). Publishes attributes on each table: HostUserId, SeatedCount, RoundsToWin (default 3), RoundTime (default 60), InMatch, Status. HostAction.OnServerEvent(action, value): finds the table where host == player and not in match; "Start" needs 2 seated; "RoundsToWin" in {1,3,5}, "RoundTime" in {45,60}. After the series: LoadCharacter both and seat:Sit them back (host first, keeps host), Status shows winner.
  Source: multi_edit, 2026-11-19.
- F4 LEAD: None of the scripts has run yet (no playtest). Possible type warnings under --!strict not checked.

## Decisions
- D1: Client UI reads table attributes instead of a server->client state remote. Why: replication is free, one fewer remote to secure. Rejected: a TableState RemoteEvent.
- D2: HostAction carries no table id; the server looks up the table the sender hosts. Why: nothing to spoof, satisfies "firing player is the Host of that table". Rejected: client sends table name + server checks it.
- D3: Dash = server checks cooldown/match, then fires Ability back to that client, which sets its own velocity. Why: client owns its character physics; server velocity writes are unreliable. Rejected: SetNetworkOwner(nil) during dash (jitter).
- D4: Lethal sword hits set Health = 1 and end the round instead of killing. LoadCharacter each round resets health/speed/tools. Why: avoids auto-respawn racing the next round. Rejected: real deaths + CharacterAdded re-teleport.
- D5: One arena, so arenaBusy blocks a second table's Start (Status "Arena busy"), marked `shortcut:` in TableManager. Rejected for now: cloning Arena1 per match.
