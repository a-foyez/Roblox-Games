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
Arena geometry, dummies and Remotes.TestTeleport exist and are saved (F5, F7). No scripts changed yet: items 2, 3 (prompt wiring), 4 (dummy damage, respawn, damage numbers) still to do.

## Route so far
1. Scouted scripts and layout (see findings: F1-F4); designed D1-D6.
2. Built arena geometry and 6 dummies, saved v103 (see findings: F5); noted script line refs (F6).
3. Created Remotes.TestTeleport, found StreamingEnabled is on, wrote the concrete edit plan (see findings: F7, Edit plan).

## Next action
Apply the TestArena server part of "Edit plan" in findings.md with multi_edit on game.ServerScriptService.TestArena (current code is lines 1-120, F6 line refs still valid).

## Read first
1. jobs/2026-11-26-physical-test-arena-2/findings.md
2. jobs/2026-11-26-physical-test-arena-2/methods.md

## Leads to re-check
None

## Results to reuse
Built: Workspace.TestArena with SpawnPad, Terminal.OpenPanel prompt, SafeZone, Dummies.Dummy1-6 (F5); ReplicatedStorage.Remotes.TestTeleport (F7). Existing scripts: ServerScriptService.TestArena, StarterPlayerScripts.TestArenaClient, ServerScriptService.AbilityService (line refs F6).

## Waiting on me
None

## Don't redo
Scouting (F1-F4), building the arena and dummies (F5), reading the scripts for line refs (F6), creating TestTeleport and planning the edits (F7, Edit plan).

## Gotchas
- TestArena calls p:LoadCharacter() on Apply/Reset, which respawns at the lobby SpawnLocation (19, 0.4, 0). Must PivotTo the SpawnPad afterwards (D3).
- StreamingEnabled is on: client code must not WaitForChild arena parts at startup (F7).
- script_read with a line range needs end_line_one_indexed_inclusive.
- Shockwave only hits players in AbilityService's `equipped` table; dummies must be added (D5).
- Bash heredocs with this content failed to parse, and Python is not installed; use the Write/Edit tools for job files.
- save_place once returned "Request timeout" but had saved; a second call said NotNeeded.
- The Studio MCP once briefly reported "No Roblox Studio instances are connected"; calling list_roblox_studios again fixed it.
- The place has a red atmosphere tint; screenshots look red, that is normal.

## Studio/Blender state
- Place saved in Studio: yes, 2026-11-26 19:08 (save_place said NotNeeded after the TestTeleport add)
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all game scripts, the TestArena model, Remotes.TestTeleport

## Queue
None

## Chain so far
- Started by session edfabd78-c8ca-437f-9962-44f6da9b7ad0 at 2026-11-26 19:09
- Hand-off #1 saved 2026-11-26 19:10 by session edfabd78-c8ca-437f-9962-44f6da9b7ad0
