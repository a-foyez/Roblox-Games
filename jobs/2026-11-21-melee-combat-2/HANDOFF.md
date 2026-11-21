# Hand-off: Bare-handed melee (punch + side dodge), part 2

## Goal
this is a gemini prompt. take it as a vague guide but implement as best you see fit. the main goal is to add punching + nice animation, and side swiping
Source: user message, 2026-11-21 12:30 (carried over from jobs/2026-11-21-melee-combat/)
Clarified 2026-11-21 13:06: "by swipe i actually meant a movement swipe. like a quick movement left or quick movement right to get out of the way. also the punch is too basic and would prefer the animation to be more exaggerated"
Clarified 2026-11-21 13:21: "the punch animation is still not doing it for me. it looks more like a weird slap/dab combo. can you make it look more like a punch, and add some air lines that go with it, and also make the other player have a slight reactive animation to the punch"

## Done when
the main goal is to add punching + nice animation, and side swiping
Source: same message

## Don'ts
None stated.
Source: same message

## Status
Punch reworked into a straight jab with air streaks and a Hit flinch on the victim (F6-F8, D3); dodge unchanged (F4). Solo check passed. Air lines moved closer (F7). Two-player check passed: user said "All looks good" (2026-11-21 13:33). DONE.

## Route so far
1. Part 1 (jobs/2026-11-21-melee-combat/): sword removed, punch + server hit detection built and two-player tested.
2. Q/E are power keys, so dodge went on double-tap A/D (F3).
3. SideSwipe removed everywhere (F2); dodge built client-side (F4, D1, D2).
4. Punch made exaggerated (F5); user said it looked like a slap/dab, so it was rebuilt as a straight jab with a boxer guard (F6).
5. Air streaks added (F7); Hit flinch sent from the server on MeleeRemote (F8, D3).

## Next action
None: job done. Future tuning knobs: POSES angles, LINE_INFO / line count / origin in airLines, DODGE_SPEED / DODGE_TIME in MeleeController.

## Read first
1. jobs/2026-11-21-melee-combat-2/findings.md
2. jobs/2026-11-21-melee-combat-2/methods.md

## Leads to re-check
None

## Results to reuse
- ReplicatedStorage.MeleeConfig (Punch only)
- ReplicatedStorage.Remotes.MeleeRequest (RemoteEvent; server-to-client kinds: Punch, Hit)
- StarterPlayer.StarterPlayerScripts.MeleeController (JOINTS list, pose() helper, POSES.Punch + POSES.Hit, airLines(), push(), dodge on double-tap A/D, tuning constants at top)
- ServerScriptService.MatchInstance: _listenMelee (now fires "Hit" per victim), _hit (unchanged)

## Waiting on me
None required. Optional: own punch animation ID in MeleeController ANIMATION_IDS (air lines would then not show, F7).

## Don't redo
Sword removal, server hit detection and validation, SideSwipe removal, dodge build, jab rework, air lines, Hit flinch, solo checks (F2, F4, F6-F8).

## Gotchas
- R15 joints are AnimationConstraint: write Transform in PreSimulation, C0 is read-only.
- Do not add Dodge or Hit to MeleeConfig: the server treats every key there as an attack (D1, D3).
- Angle signs are in F6; waist -X leans forward (the old punch had this backwards).
- Dodge has no server check (client owns its physics); a cheater could dash anyway, same as any speed exploit.
- No python on this machine; use node for scripted file edits. The stay-in-project hook misreads long inline `node -e` scripts; use the Write/Edit tools instead.

## Studio/Blender state
- Place saved in Studio: v28 at 2026-11-21 13:21; the 13:31 air-line change (MeleeController) may be unsaved; user was asked to press Ctrl+S
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all scripts above

## Queue
None

## Chain so far
- Started by session a89d7746-35ea-4341-a4d6-4e57a1346576 at 2026-11-21 13:21 (continues jobs/2026-11-21-melee-combat/)
- Hand-off #1 saved 2026-11-21 13:22 by session a89d7746-35ea-4341-a4d6-4e57a1346576
- Resumed by session fa6d46d4-356c-4457-b4ba-cc3197debbef at 2026-11-21 13:18
- Hand-off #2 saved 2026-11-21 13:21 by session fa6d46d4-356c-4457-b4ba-cc3197debbef
- Resumed by session bde24557-4723-4ae1-9a57-88b19cb5c580 at 2026-11-21 13:31
