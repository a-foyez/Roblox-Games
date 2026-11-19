# Hand-off: Choose a Power, GET NERFED! game core

## Goal
I want to make a roblox game with this premise

Its a pvp format, where each player gets a turn choosing a superpower, and then the remaining players choose a nerf. Such as superspeed, but friction causes you to set on fire. Each player will end up with 2 or 3 superpowers, and will need some form of fighting ability or weapon.

can you make the necessary changes to this project folder and the files within.
The game for now is called "Choose a Power, GET NERFED!"
Source: user message, 2026-11-19 21:08

## Done when
I want to make a roblox game with this premise ... The game for now is called "Choose a Power, GET NERFED!"
Source: user message, 2026-11-19 21:08 (no separate criteria given; the goal itself is the bar)

## Don'ts
None stated for this job.
Source: user message, 2026-11-19 21:08

## Status
Core game built and solo-tested (draft, powers, nerfs, arena, sword). Not yet tested with 2+ players.

## Route so far
1. Found the user's new Studio place for this game (see findings: F1).
2. Built arena, 8 powers x 3 nerfs, round loop, sword and HUD (F2, D1-D5).
3. Solo playtest passed; place saved (F3, F5).

## Next action
Run a 2-player test (Studio Test tab > Clients and Servers, 2 players) to check sword hits, thorns/lifesteal, nerf voting and the win/reset (findings F4). Then ask the user what to add next (active powers like dash/fireball, more powers, sounds).

## Read first
1. jobs/2026-11-19-power-nerf-game/findings.md

## Leads to re-check
- F4: the untested items listed there.

## Results to reuse
- Studio place "Choose a Power, GET NERFED!": Workspace.Arena, ServerScriptService.PowerDefs, ServerScriptService.GameLoop, StarterPlayerScripts.DraftUI.

## Waiting on me
None

## Don't redo
- Arena, PowerDefs, GameLoop, DraftUI are written and pass the solo smoke test (F3).

## Gotchas
- Two Studio instances are open; always target studio "Choose a Power, GET NERFED!" (F1), not TestGame.
- The server can't drive the player's Humanoid.Jump or ApplyImpulse reliably (D4).
- Scripts exist only in Studio (no Rojo), not in this folder.
- search_game_tree without a path dumps every service and eats context; always pass a path.
- Bash commands with `cd ../..` are blocked by the stay-in-project hook; use absolute paths.

## Studio/Blender state
- Place saved in Studio: yes, Roblox version 5, 2026-11-19 21:22 (playtest stopped, Edit mode).
- Rojo in sync: not used
- .blend files: none for this job.
- Only in Studio (not in this folder): Workspace.Arena, ServerScriptService.PowerDefs, ServerScriptService.GameLoop, StarterPlayerScripts.DraftUI.

## Queue
None

## Chain so far
- Started by session a0416421-3f6f-4d8d-95d4-9ccb229cb334 at 2026-11-19 21:09
- Hand-off #1 saved 2026-11-19 21:27 by session a0416421-3f6f-4d8d-95d4-9ccb229cb334
