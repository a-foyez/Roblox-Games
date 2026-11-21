# Hand-off: Bare-handed melee (punch + side dodge), part 2

## Goal
this is a gemini prompt. take it as a vague guide but implement as best you see fit. the main goal is to add punching + nice animation, and side swiping
Source: user message, 2026-11-21 12:30 (carried over from jobs/2026-11-21-melee-combat/)
Clarified 2026-11-21 13:06: "by swipe i actually meant a movement swipe. like a quick movement left or quick movement right to get out of the way. also the punch is too basic and would prefer the animation to be more exaggerated"

## Done when
the main goal is to add punching + nice animation, and side swiping
Source: same message

## Don'ts
None stated.
Source: same message

## Status
Dodge (double-tap A/D) and exaggerated punch built; SideSwipe attack removed; solo check passed (F4, F5). Waiting on the user's two-player check.

## Route so far
1. Part 1 (jobs/2026-11-21-melee-combat/): sword removed, punch + server hit detection built and two-player tested.
2. Q/E are power keys, so dodge went on double-tap A/D (F3).
3. SideSwipe removed everywhere (F2); dodge built client-side (F4, D1, D2).
4. Punch made exaggerated with lunge and guard arm (F5).

## Next action
Ask the user to run "Two-player melee test" in methods.md and say how the punch and dodge feel; tune DODGE_SPEED / DODGE_TIME / pose angles at the top of MeleeController from their answer.

## Read first
1. jobs/2026-11-21-melee-combat-2/findings.md
2. jobs/2026-11-21-melee-combat-2/methods.md

## Leads to re-check
None

## Results to reuse
- ReplicatedStorage.MeleeConfig (Punch only)
- ReplicatedStorage.Remotes.MeleeRequest (RemoteEvent)
- StarterPlayer.StarterPlayerScripts.MeleeController (punch poses incl. guard arm, push() helper, dodge on double-tap A/D, tuning constants at top)
- ServerScriptService.MatchInstance: _listenMelee, _hit (unchanged)

## Waiting on me
Two-player check of the new punch and dodge. Optional: own punch animation ID in MeleeController ANIMATION_IDS.

## Don't redo
Sword removal, server hit detection and validation, SideSwipe removal, dodge and punch build, solo check (F2, F4, F5).

## Gotchas
- R15 joints are AnimationConstraint: write Transform in PreSimulation, C0 is read-only.
- Do not add Dodge to MeleeConfig: the server treats every key there as an attack (D1).
- Dodge has no server check (client owns its physics); a cheater could dash anyway, same as any speed exploit.
- No python on this machine; use node for scripted file edits.

## Studio/Blender state
- Place saved in Studio: yes, 2026-11-21 13:20 (version 27, Team Create)
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all scripts above

## Queue
None

## Chain so far
- Started by session a89d7746-35ea-4341-a4d6-4e57a1346576 at 2026-11-21 13:21 (continues jobs/2026-11-21-melee-combat/)
- Hand-off #1 saved 2026-11-21 13:22 by session a89d7746-35ea-4341-a4d6-4e57a1346576
- Resumed by session fa6d46d4-356c-4457-b4ba-cc3197debbef at 2026-11-21 13:18
