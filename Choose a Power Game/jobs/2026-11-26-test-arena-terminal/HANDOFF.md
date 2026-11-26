# Hand-off: Test arena terminal (multi-power select)

## Goal
we added a test arena.
can you make it so you can use the same combat and movement abilities that you can use in a usual arena fight, and also make it so in the terminal you can select multiple superpowers, and also seperate the superpowers and nerfs section. right now its only 1 scrollable column. split the column into two rows so you can individually scroll through the superpowers and the nerfs will remain on screen when theres alot more superpowers. there will likely not be more than 3 nerfs per superpower so you dont need to create a scrollable nerf part for now. also make it so that when you click on a power ait highlights to show that its ready to be activated, and then when you click on another power both get highlighted. then obviously apply applies all the highlighted powers. basically like how the nerf choosing part already works
Source: user message, 2026-11-26 19:20 (carried over from jobs/2026-11-26-test-arena-combat/)

## Done when
In the test arena: punch, dodge, dash, double jump, wall reset (and sprint if gated) all work; terminal lets you toggle-highlight several powers, Apply equips all of them with their ticked nerfs; left column is split into a scrollable POWERS area on top and a fixed NERFS area below.
Source: derived from the user message, 2026-11-26 19:20 (user gave no explicit "done when"; carried over from jobs/2026-11-26-test-arena-combat/)

## Don'ts
No scrollable nerf section needed ("you dont need to create a scrollable nerf part for now").
Source: user message, 2026-11-26 19:20 (carried over)

## Status
Server side done: combat/movement in the arena (D1, F7) and multi-power TestLoadout with correct label (D2+D3, F8), saved v108. Client terminal (D4) not started.

## Route so far
1. Previous folder: D1 CanFight gates + arena melee (F7), v107.
2. D2: TestArena takes a list of powers, nerfs checked per owning power, own Loadout label (F8, F9); playtest OK, v108.

## Next action
D4 in StarterPlayer.StarterPlayerScripts.TestArenaClient (re-read it first; F5 line numbers are still right as of 19:35): replace `selected`/select() with a `chosenPowers` set toggled on click (highlight like a nerf, accent colour); split `ctrl` into a top ScrollingFrame (POWERS, ~55% height) and a bottom plain Frame (NERFS) listing the NerfPool of every highlighted power grouped under its name; un-highlighting a power drops its ticked nerfs; Apply fires remote(listOfIds, tickedNerfs), "Pick a power first." if none; title = last clicked power or "N POWERS". Then playtest (methods.md) and save.

## Read first
1. jobs/2026-11-26-test-arena-terminal/findings.md (F5, F8, D4)
2. jobs/2026-11-26-test-arena-terminal/methods.md

## Leads to re-check
None

## Results to reuse
- methods.md steps 1-4: playtest via MCP, including the multi-power TestLoadout call.

## Waiting on me
None

## Don't redo
D1 (F7) and D2/D3 (F8): server is finished; only the client panel is left.

## Gotchas
- TestLoadout is rate-limited to once per second per player.
- Studio's MCP dropped once right after start_stop_play this session; if a call says no Studio is connected, ask the user to reconnect, don't redo edits.
- Dash/double jump/wall reset were not tried by hand; ask the user to try them in Play.
- The Bash hook blocks commands with "\" line continuations or "../" paths; use plain one-line commands.

## Studio/Blender state
- Place saved in Studio: yes, v108 at 19:36 (TeamCreate)
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all scripts, including ReplicatedStorage.CanFight and the edited ServerScriptService.TestArena

## Queue
None

## Chain so far
- Started by session 027ded97-e1f3-4dfd-95cb-548a8d680630 at 2026-11-26 19:36 (continues jobs/2026-11-26-test-arena-combat/)
- Hand-off #1 saved 2026-11-26 19:37 by session 027ded97-e1f3-4dfd-95cb-548a8d680630
