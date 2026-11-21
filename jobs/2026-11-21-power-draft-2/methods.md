# Methods: Power & nerf draft

## Build order
1. DONE. Edit mode: create ReplicatedStorage.Remotes.Draft (RemoteEvent) with execute_luau.
2. DONE. multi_edit create ReplicatedStorage.AbilityRegistry (ModuleScript) per findings D4-D7.
3. DONE. Rewrite ServerScriptService.AbilityService to use the registry: Equip(player, character, loadout), Unequip(player), Ability remote takes one string key (D6).
4. DONE. Create ServerScriptService.Draft (ModuleScript): Draft.Run(players): loadouts? per D1, D8.
5. DONE. TableManager.startMatch: after the arenaBusy check and lock, call Draft.Run(players); on nil set Status "Draft cancelled", release lock, refresh, return. Pass loadouts to MatchInstance.new (4th arg).
6. DONE. MatchInstance: drop TEST_ABILITY/TEST_NERF, store loadouts, Equip with loadout after _giveSword.
7. DONE. StarterPlayerScripts.DraftClient (LocalScript): draft screen (3 cards, timer from endsAt - GetServerTimeNow, tallies, suspense text, reveal), loadout HUD line, Q/E keys -> Ability:FireServer(key), handle "Blink" / "Knockback" client events. Remove TableClient lines 104-118 (E/Dash).
8. Solo playtest (start_stop_play), get_console_output for errors; Draft with 1 player should abort cleanly. Test Draft logic by calling Draft pieces from execute_luau Server where possible.
9. Save place (save_place), ask the user to run Test > Clients and Servers with 2 and 3 players.

## Gotchas
- search_game_tree: always pass a path.
- Edits only in Edit mode (multi_edit rejects Server/Client).
