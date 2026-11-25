# Hand-off: In-game Superpower Testing Arena panel (part 3)

## Goal
"Yes, in Studio" (answer to: "Should I build this as an in-game test panel in Studio next?", where "this" is the web Superpower Testing Arena in docs/testing-arena.html)
Source: user message, 2026-11-25 22:50 (carried over from jobs/2026-11-25-testing-arena-panel/)

## Done when
"Yes, that's it" (answer to: "a ScreenGui listing AbilityRegistry powers in a column, selected one highlighted, its 3 nerfs as toggles, applied to your character in a playtest, with stat readout and log")
Source: user answer, 2026-11-25 22:55 (carried over)

## Don'ts
None given.
Source: user message, 2026-11-25 22:50 (carried over)

## Status
All 4 build steps done and saved (v101, F7). Server path playtested. Left: the click-through checks in Next action, then show the user.

## Route so far
1. Web prototype built and published (F1).
2. Registry, AbilityService and match signals read (F2, F3, F5).
3. User chose: all players, lobby only, real character (D2); TestMode flag for lobby actives (D3).
4. Server rules designed (D4, D5); standing() TestMode check built (F6).
5. TestLoadout remote, TestArena server script and TestArenaClient panel built, playtested, saved v101 (F7).

## Next action
1. Playtest (methods.md). Use user_mouse_input (or ask the user) to click TEST ARENA, a power, two nerfs, APPLY: check the power is highlighted, nerfs turn amber, stats and log update.
2. Apply Phase Dash, press R in the lobby: the dash should fire (D3). Then sit on a bench: TestMode should clear.
3. Fix anything found, re-check, save the place, then ask the user to try it (Done when).

## Read first
1. jobs/2026-11-25-testing-arena-panel-3/findings.md (F7, D4, D5)
2. jobs/2026-11-25-testing-arena-panel-3/methods.md

## Leads to re-check
None

## Results to reuse
- docs/testing-arena.html, published at https://claude.ai/artifact/KR2omjxN5F6kYZpkdg8WTu (private).
- Scripts in Studio: ServerScriptService.TestArena, StarterPlayer.StarterPlayerScripts.TestArenaClient (read them with script_read; no need to re-read AbilityRegistry/AbilityService).

## Waiting on me
None

## Don't redo
- The web prototype (F1). Answers D2, D3. The standing() edit (F6). Building the remote, server script and panel (F7). The server playtest in F7.

## Gotchas
- Server-authoritative: take only ids from the client; check them against the registry.
- Equip has no undo. Always LoadCharacter before Equip.
- Never Unequip in a CharacterAdded handler (D5).
- TestArena rate limit is 1 s: wait over 1 s between test fires.
- The HUD Loadout string pairs nerf i with power i, so only the first nerf shows there (cosmetic, F6).
- In Luau, a line starting with `(` after a statement is a parse error ("Ambiguous syntax"); use a local.
- TEMP SOLO TEST lines are in MatchInstance/TableManager. Leave them alone (not this job).
- The Studio id changes per session: get it with list_roblox_studios.
- The stay-in-project hook blocks Bash lines ending in `\` and `../` paths; run commands from the project root.

## Studio/Blender state
- Place saved in Studio: yes, v101 (2026-11-25 23:14), includes all four build steps
- Rojo in sync: not used
- .blend files: None
- Only in Studio (not in this folder): standing() edit (F6), Remotes.TestLoadout, TestArena, TestArenaClient (F7)

## Queue
None

## Chain so far
- Started by session f0004376-ac6e-4bb4-8c73-967f2efac322 at 2026-11-25 23:14 (continues jobs/2026-11-25-testing-arena-panel-2/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-25 23:15 by session f0004376-ac6e-4bb4-8c73-967f2efac322
- Resumed by session 6f3eca61-0949-4d43-b2e6-e8017e02d7ec at 2026-11-25 23:16
