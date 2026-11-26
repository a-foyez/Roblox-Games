# Hand-off: Physical superpower test arena (part 2)

## Goal
"this is a gemini prompt. take it as a guide but act as you think is best" + pasted prompt: "Update the Superpower Testing System: We recently built a UI menu screen for testing superpowers. I want to transition this into a physical testing environment." 1. Create a Physical Test Arena (fairly large, grey-box, walls/ramps/cover blocks). 2. Update the UI Access Flow (screen button no longer opens the menu; it teleports to the arena). 3. Physical Terminal & Safe Zone (terminal at arena spawn, ProximityPrompt opens the testing menu, semi-transparent blue/glass barrier around it). 4. Damage Testing Dummies (Humanoid dummies in their own section; floating BillboardGui damage numbers that rise and fade). "Please provide the necessary scripts and a plan for how these instances should be structured in the Rojo/Luau workspace."
Source: user message, 2026-11-26 18:50 (pasted Gemini prompt; list items shortened, full text in that message). Carried over from jobs/2026-11-26-physical-test-arena/.

## Done when
All four numbered items above work in a playtest, and the user gets the instance-structure plan in plain English. (No separate criteria given; user said to act as I think best.)
Source: user message, 2026-11-26 18:50. Carried over from jobs/2026-11-26-physical-test-arena/.

## Don'ts
None stated. Project rules in CLAUDE.md apply (server-authoritative, --!strict, explain code).
Source: user message, 2026-11-26 18:50; CLAUDE.md.

## Status
Arena, dummies, TestTeleport remote built (F5, F7). Server side done and tested via remotes (F8): teleport, arena-respawn on Apply/Reset, safe zone, shockwave dummy damage. Still to do: TestDummies script, TestArenaClient changes (button, prompt, damage numbers), full playtest, plain-English structure plan for the user.

## Route so far
1. Scouted scripts and layout (see findings: F1-F4); designed D1-D6.
2. Built arena geometry and 6 dummies, saved v103 (F5); noted script line refs (F6).
3. Created Remotes.TestTeleport, wrote the edit plan (F7).
4. Applied the TestArena server and AbilityService parts, playtested via FireServer, saved v105 (F8).

## Next action
Create ServerScriptService.TestDummies (--!strict) per the "Edit plan" in findings.md: stash clones in ServerStorage.TestDummyStash, respawn 3 s after Died, refill Health 5 s after last drop.

## Read first
1. jobs/2026-11-26-physical-test-arena-2/findings.md
2. jobs/2026-11-26-physical-test-arena-2/methods.md

## Leads to re-check
None

## Results to reuse
Built: Workspace.TestArena with SpawnPad, Terminal.OpenPanel prompt, SafeZone, Dummies.Dummy1-6 (F5); ReplicatedStorage.Remotes.TestTeleport (F7). Edited: ServerScriptService.TestArena and AbilityService (F8). TestArenaClient line refs in F6 are still valid (not edited yet).

## Waiting on me
None

## Don't redo
Scouting (F1-F4), building the arena and dummies (F5), TestTeleport (F7), the TestArena server and AbilityService edits and their remote-level test (F8).

## Gotchas
- StreamingEnabled is on: client code must not WaitForChild arena parts at startup (F7).
- script_read with a line range needs end_line_one_indexed_inclusive.
- multi_edit can fail with "No Roblox Studio instances are connected"; call list_roblox_studios, check the Source with execute_luau (edits are atomic, nothing applied), then retry.
- In Play, execute_luau with datamodel_type Client can FireServer remotes as the local player: a fast way to test server handlers.
- Bash heredocs with this content failed to parse, and Python is not installed; use the Write/Edit tools for job files.
- save_place once returned "Request timeout" but had saved; a second call said NotNeeded.
- The place has a red atmosphere tint; screenshots look red, that is normal.

## Studio/Blender state
- Place saved in Studio: yes, v105 at 2026-11-26 19:12, playtest stopped
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all game scripts, the TestArena model, Remotes.TestTeleport

## Queue
None

## Chain so far
- Started by session edfabd78-c8ca-437f-9962-44f6da9b7ad0 at 2026-11-26 19:09
- Hand-off #1 saved 2026-11-26 19:10 by session edfabd78-c8ca-437f-9962-44f6da9b7ad0
- Resumed by session 272ebbd3-6695-4638-a526-9191e9d57763 at 2026-11-26 19:12
- Hand-off #2 saved 2026-11-26 19:12 by session 272ebbd3-6695-4638-a526-9191e9d57763
