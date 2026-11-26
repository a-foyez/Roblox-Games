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
Part 1 (combat/movement in the test arena, D1) done and saved as v107 (F7). Part 2 (multi-power terminal, D2-D4) not started.

## Route so far
1. Read job notes of physical-test-arena-2 (F1).
2. Read the gate scripts and TestArena (F2-F6).
3. Applied D1: CanFight module + gates + TestArena melee handler; punch on a dummy verified (F7).

## Next action
Apply D2 in ServerScriptService.TestArena: TestLoadout handler takes (powerIds: {string}, nerfs: {string}); validate unique known ids, nerfs each in some chosen power's NerfPool, max 3 per chosen power; Equip with powers = list. Then D4 in StarterPlayerScripts.TestArenaClient (re-read it first; findings F5 has old line numbers), then D3, then playtest (methods.md).

## Read first
1. jobs/2026-11-26-test-arena-combat/findings.md
2. jobs/2026-11-26-test-arena-combat/methods.md

## Leads to re-check
None

## Results to reuse
- Server-side box query check in methods.md step 3.

## Waiting on me
None

## Don't redo
D1 (F7): CanFight module, the four gate edits and TestArena's melee handler are in and tested.

## Gotchas
- AbilityService.Describe pairs nerfs[i] with powers[i]; with many powers + many nerfs that label is wrong (D3).
- TestArena.checkNerfs currently caps nerfs at 3 and requires each in the single power's NerfPool (D2 replaces it).
- TestArena script line numbers moved: the melee handler was added before onPlayer.
- Dash/double jump/wall reset were not tried by hand; ask the user to try them in Play.

## Studio/Blender state
- Place saved in Studio: yes, v107 at 19:32 (TeamCreate)
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all scripts, including new ReplicatedStorage.CanFight

## Queue
None

## Chain so far
- Started by session b0611ad4-d908-40dc-a5c4-a0cdb679ba80 at 2026-11-26 19:20
- Hand-off #1 saved 2026-11-26 19:30 by session b0611ad4-d908-40dc-a5c4-a0cdb679ba80
- Resumed by session 1fc4c070-8068-466c-988c-2842ca23c689 at 2026-11-26 19:30
- Hand-off #2 saved 2026-11-26 19:34 by session 1fc4c070-8068-466c-988c-2842ca23c689
