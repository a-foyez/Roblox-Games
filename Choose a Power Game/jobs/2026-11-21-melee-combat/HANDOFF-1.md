# Hand-off: Bare-handed melee (punch + side swipe)

## Goal
this is a gemini prompt. take it as a vague guide but implement as best you see fit. the main goal is to add punching + nice animation, and side swiping
Source: user message, 2026-11-21 12:30 (with a pasted Gemini prompt: remove the sword, MeleeController LocalScript with LMB punch / RMB or F side swipe and an animation-ID table, server-authoritative MeleeRequest RemoteEvent with cooldown check and GetPartBoundsInBox hitboxes, swipe deals more damage plus small knockback)

## Done when
the main goal is to add punching + nice animation, and side swiping
Source: same message

## Don'ts
None stated.
Source: same message

## Status
Built and solo-tested (punch, swipe, spam block, swing animation). Not yet tested with 2 real players in a match; not committed beyond this job folder.

## Route so far
1. Removed the sword; melee lives in MatchInstance (see findings: F1, D1).
2. Added MeleeConfig + Remotes.MeleeRequest + MeleeController (F2, F3).
3. Animation: AI generation failed, Motor6D C0 approach failed on AnimationConstraint joints; switched to per-frame Transform offsets (F4, F5, D2).
4. Solo test with a dummy foe passed (F6).

## Next action
Run the two-player test in methods.md ("Two-player melee test") and check punches/swipes hurt, swipe knocks back, the other player sees your swing, and a lethal hit knocks out.

## Read first
1. jobs/2026-11-21-melee-combat/findings.md
2. jobs/2026-11-21-melee-combat/methods.md

## Leads to re-check
None

## Results to reuse
- ReplicatedStorage.MeleeConfig (damage, cooldown, hitbox size, push per attack)
- ReplicatedStorage.Remotes.MeleeRequest (RemoteEvent)
- StarterPlayer.StarterPlayerScripts.MeleeController (input, ANIMATION_IDS table, procedural swing)
- ServerScriptService.MatchInstance: _listenMelee, _hit (replaced _giveSword)

## Waiting on me
Optional: user uploads own punch/swipe animations and pastes IDs into MeleeController ANIMATION_IDS.

## Don't redo
Sword removal, server hit detection, cooldown/validation, procedural swing (all solo-verified F6).

## Gotchas
- Character joints are AnimationConstraint (avatar joint upgrade), not Motor6D: C0 is read-only; write Transform in PreSimulation instead (F4).
- execute_luau cannot assign C0 even where game code could; don't trust its "read only" errors as game behaviour.
- Studio generate_animation returned "Animation generation failed" for "punching".

## Studio/Blender state
- Place saved in Studio: yes, 2026-11-21 13:00
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all scripts above

## Queue
None

## Chain so far
- Started by session c798ef70-c85b-46e4-9757-2a1de43d2180 at 2026-11-21 12:30
- Hand-off #1 saved 2026-11-21 13:00 by session c798ef70-c85b-46e4-9757-2a1de43d2180
- Resumed by session 346ca24d-b97d-49a8-8f6b-dd8cd8cf7df7 at 2026-11-21 13:00
