# Progress: Power & nerf draft (part 2)

- 2026-11-21 11:06 — Job started (continues jobs/2026-11-21-power-draft/, closed at its hand-off #3)
- 2026-11-21 11:05 — Build order step 7 done in the old folder's session: DraftClient built, TableClient E/Dash removed, place saved v17
- 2026-11-21 11:06 — Hand-off #1 started (50% checkpoint)
- 2026-11-21 11:07 — Hand-off #1 saved
- 2026-11-21 11:10 — Resumed by session 48ea92e9
- 2026-11-21 11:20 — Step 8 done: solo playtest clean (F9); Juggernaut ScaleTo speed bug fixed (F10); place saved v18
- 2026-11-21 11:22 — Hand-off #2 started (50% checkpoint)
- 2026-11-21 11:23 — Hand-off #2 saved

- 2026-11-21 11:17 — Resumed by session 776f954e; Studio open in Edit, place saved (v18). Multi-player leads need the user's Clients-and-Servers run; asked.

- 2026-11-21 — User's multi-player test passed (F11). JOB DONE.

## Final summary (Done when)
Created in Studio:
- ReplicatedStorage.Remotes.Draft (RemoteEvent): draft messages between server and clients.
- ReplicatedStorage.AbilityRegistry (ModuleScript): list of powers, each with its 3 nerfs. Placeholder content; replace here.
- ServerScriptService.Draft (ModuleScript): turn-based draft (pick 1 of 3, others vote the nerf, reveal), 2 rounds per player.
- StarterPlayerScripts.DraftClient (LocalScript): draft screen, loadout HUD line, Q/E keys, Blink/Knockback on the client.
Modified in Studio:
- ServerScriptService.AbilityService: uses the registry; Equip/Unequip/Describe; key-based ability remote.
- ServerScriptService.TableManager: runs Draft.Run before the match; cancels if fewer than 2 players.
- ServerScriptService.MatchInstance: equips each player's drafted loadout instead of the test ability.
- StarterPlayerScripts.TableClient: old E/Dash test code removed.
Manual Studio setup: none. Place saved (version 18).
