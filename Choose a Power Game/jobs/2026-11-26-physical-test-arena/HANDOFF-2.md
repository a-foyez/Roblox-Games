# Hand-off: Physical superpower test arena

## Goal
"this is a gemini prompt. take it as a guide but act as you think is best" + pasted prompt: "Update the Superpower Testing System: We recently built a UI menu screen for testing superpowers. I want to transition this into a physical testing environment." 1. Create a Physical Test Arena (fairly large, grey-box, walls/ramps/cover blocks). 2. Update the UI Access Flow (screen button no longer opens the menu; it teleports to the arena). 3. Physical Terminal & Safe Zone (terminal at arena spawn, ProximityPrompt opens the testing menu, semi-transparent blue/glass barrier around it). 4. Damage Testing Dummies (Humanoid dummies in their own section; floating BillboardGui damage numbers that rise and fade). "Please provide the necessary scripts and a plan for how these instances should be structured in the Rojo/Luau workspace."
Source: user message, 2026-11-26 18:50 (pasted Gemini prompt; list items shortened, full text in that message).

## Done when
All four numbered items above work in a playtest, and the user gets the instance-structure plan in plain English. (No separate criteria given; user said to act as I think best.)
Source: user message, 2026-11-26 18:50.

## Don'ts
None stated. Project rules in CLAUDE.md apply (server-authoritative, --!strict, explain code).
Source: user message, 2026-11-26 18:50; CLAUDE.md.

## Status
Item 1 (arena geometry) and the dummy rigs are built and saved (v103, F5). No scripts changed yet: items 2, 3 (prompt wiring), 4 (dummy damage, respawn, damage numbers) still to do.

## Route so far
1. Read TestArenaClient, TestArena, AbilityService, workspace layout (see findings: F1-F4).
2. Designed arena, teleport, terminal, safe zone, dummies (see findings: D1-D6).
3. Built D1 geometry and 6 dummies in Edit, checked by screenshot, saved v103 (see findings: F5).
4. Read the three scripts again and noted the line numbers to edit (see findings: F6).

## Next action
Create Remotes.TestTeleport (RemoteEvent) and add the D2/D3 server rules to ServerScriptService.TestArena with multi_edit (lines in F6).

## Read first
1. jobs/2026-11-26-physical-test-arena/findings.md
2. jobs/2026-11-26-physical-test-arena/methods.md

## Leads to re-check
None

## Results to reuse
Built: Workspace.TestArena with SpawnPad, Terminal.OpenPanel prompt, SafeZone, Dummies.Dummy1-6 (F5). Existing scripts: ServerScriptService.TestArena, StarterPlayerScripts.TestArenaClient, ServerScriptService.AbilityService (line refs F6).

## Waiting on me
None

## Don't redo
Scouting (F1-F4), building the arena and dummies (F5), reading the scripts for line refs (F6).

## Gotchas
- TestArena calls p:LoadCharacter() on Apply/Reset, which respawns at the lobby SpawnLocation (19, 0.4, 0). Must PivotTo the SpawnPad afterwards (D3).
- script_read with a line range needs end_line_one_indexed_inclusive.
- Shockwave only hits players in AbilityService's `equipped` table; dummies must be added (D5).
- Bash heredocs with this content failed to parse; use the Write tool for job files.
- The Studio MCP once briefly reported "No Roblox Studio instances are connected"; calling list_roblox_studios again fixed it.
- The place has a red atmosphere tint; screenshots look red, that is normal.

## Studio/Blender state
- Place saved in Studio: yes, v103 (TestArena model and dummies added this job)
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all game scripts and the TestArena model

## Queue
None

## Chain so far
- Started by session f883aab3-e5ac-4e0b-b81e-2401a950e661 at 2026-11-26 18:50
- Hand-off #1 saved 2026-11-26 19:00 by session f883aab3-e5ac-4e0b-b81e-2401a950e661
- Resumed by session fce41ab9-157f-4f86-8260-ac563df24c8a at 2026-11-26 18:59
- Hand-off #2 saved 2026-11-26 19:01 by session fce41ab9-157f-4f86-8260-ac563df24c8a
- Resumed by session edfabd78-c8ca-437f-9962-44f6da9b7ad0 at 2026-11-26 19:02
