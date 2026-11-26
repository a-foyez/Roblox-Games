# Hand-off: Test arena combat + multi-power terminal

## Goal
we added a test arena.
can you make it so you can use the same combat and movement abilities that you can use in a usual arena fight, and also make it so in the terminal you can select multiple superpowers, and also seperate the superpowers and nerfs section. right now its only 1 scrollable column. split the column into two rows so you can individually scroll through the superpowers and the nerfs will remain on screen when theres alot more superpowers. there will likely not be more than 3 nerfs per superpower so you dont need to create a scrollable nerf part for now. also make it so that when you click on a power ait highlights to show that its ready to be activated, and then when you click on another power both get highlighted. then obviously apply applies all the highlighted powers. basically like how the nerf choosing part already works
Source: user message, 2026-11-26 19:20

## Done when
In the test arena: punch, dodge, dash, double jump, wall reset (and sprint if gated) all work; terminal lets you toggle-highlight several powers, Apply equips all of them with their ticked nerfs; left column is split into a scrollable POWERS area on top and a fixed NERFS area below.
Source: derived from the user message, 2026-11-26 19:20 (user gave no explicit "done when")

## Don'ts
No scrollable nerf section needed ("you dont need to create a scrollable nerf part for now").
Source: user message, 2026-11-26 19:20

## Status
Read-only so far: all relevant scripts read, no edits made. Plan in findings D1-D4.

## Route so far
1. Read job notes of physical-test-arena-2 (findings F1).
2. Read TestArenaClient, TestArena server, AbilityService, MeleeController, MovementController, MoveFxRelay (findings F2-F6).

## Next action
Read ServerScriptService.MatchInstance around the MeleeRequest handler (grep "MeleeRemote.OnServerEvent") and SprintController's gate, then apply edit D1 (shared "can fight" check) to MeleeController, MovementController, MoveFxRelay, MatchInstance melee, SprintController.

## Read first
1. jobs/2026-11-26-test-arena-combat/findings.md

## Leads to re-check
- F6 (MatchInstance melee gate and SprintController gate not yet read).

## Results to reuse
None

## Waiting on me
None

## Don't redo
Reading the six scripts in F2-F5; line numbers there are current.

## Gotchas
- Studio was in Play mode at start; I stopped it. Edits need Edit mode.
- AbilityService.Describe pairs nerfs[i] with powers[i]; with many powers + many nerfs that label is wrong (see D3).
- TestArena.checkNerfs caps nerfs at 3 and requires each in the single power's NerfPool (D2).

## Studio/Blender state
- Place saved in Studio: no changes made this job (last save v106 from previous job)
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all scripts

## Queue
None

## Chain so far
- Started by session b0611ad4-d908-40dc-a5c4-a0cdb679ba80 at 2026-11-26 19:20
- Hand-off #1 saved 2026-11-26 19:30 by session b0611ad4-d908-40dc-a5c4-a0cdb679ba80
