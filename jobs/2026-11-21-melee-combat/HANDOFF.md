# Hand-off: Bare-handed melee (punch + side dodge)

## Goal
this is a gemini prompt. take it as a vague guide but implement as best you see fit. the main goal is to add punching + nice animation, and side swiping
Source: user message, 2026-11-21 12:30 (with a pasted Gemini prompt: remove the sword, MeleeController LocalScript with LMB punch / RMB or F side swipe and an animation-ID table, server-authoritative MeleeRequest RemoteEvent with cooldown check and GetPartBoundsInBox hitboxes, swipe deals more damage plus small knockback)
Clarified 2026-11-21 13:06: "by swipe i actually meant a movement swipe. like a quick movement left or quick movement right to get out of the way. also the punch is too basic and would prefer the animation to be more exaggerated" (F8)

## Done when
the main goal is to add punching + nice animation, and side swiping
Source: same message

## Don'ts
None stated.
Source: same message

## Status
Closed at hand-off #3, continued in jobs/2026-11-21-melee-combat-2/

## Route so far
1. Removed the sword; melee lives in MatchInstance (F1, D1).
2. Added MeleeConfig + Remotes.MeleeRequest + MeleeController (F2, F3).
3. Animation via per-frame joint Transform offsets (F4, F5, D2).
4. Solo test passed (F6); two-player test passed (F7).
5. User redirect recorded (F8); SideSwipe usages mapped (F9); dodge and punch plans drafted (D3, D4).

## Next action
1. Check F10 (are Q/E free during the arena fight?), then build the dodge per D3 and remove the SideSwipe attack (F9 lists every spot, including the MatchInstance line 5 comment).
2. Make the punch more exaggerated per D4 (POSES.Punch in MeleeController; keep the self-check asserts passing).
3. Run "Solo server check" in methods.md for the punch, plus press the dodge keys and check the root moves sideways; then ask the user for a two-player check.

## Read first
1. jobs/2026-11-21-melee-combat/findings.md
2. jobs/2026-11-21-melee-combat/methods.md

## Leads to re-check
- F10: Q/E use in DraftClient lines 190-192; confirm it is draft-only before using Q/E for dodging.

## Results to reuse
- ReplicatedStorage.MeleeConfig (damage, cooldown, hitbox size, push per attack)
- ReplicatedStorage.Remotes.MeleeRequest (RemoteEvent)
- StarterPlayer.StarterPlayerScripts.MeleeController (input, ANIMATION_IDS table, procedural swing, PreSimulation Transform loop)
- ServerScriptService.MatchInstance: _listenMelee, _hit

## Waiting on me
Optional: user uploads own punch/dodge animations and pastes IDs into MeleeController ANIMATION_IDS.

## Don't redo
Sword removal, server hit detection, cooldown/validation, procedural swing system (F6, F7). Only the punch poses and the swipe change.

## Gotchas
- Character joints are AnimationConstraint, not Motor6D: C0 is read-only; write Transform in PreSimulation (F4).
- execute_luau cannot assign C0 even where game code could; don't trust its "read only" errors as game behaviour.
- Studio generate_animation returned "Animation generation failed" for "punching".
- No python on this machine; use node for scripted file edits.

## Studio/Blender state
- Place saved in Studio: yes, 2026-11-21 13:00 (nothing changed since)
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all scripts above

## Queue
None

## Chain so far
- Started by session c798ef70-c85b-46e4-9757-2a1de43d2180 at 2026-11-21 12:30
- Hand-off #1 saved 2026-11-21 13:00 by session c798ef70-c85b-46e4-9757-2a1de43d2180
- Resumed by session 346ca24d-b97d-49a8-8f6b-dd8cd8cf7df7 at 2026-11-21 13:00
- Hand-off #2 saved 2026-11-21 13:08 by session 346ca24d-b97d-49a8-8f6b-dd8cd8cf7df7
- Resumed by session a89d7746-35ea-4341-a4d6-4e57a1346576 at 2026-11-21 13:07
- Closed, continued in jobs/2026-11-21-melee-combat-2/
