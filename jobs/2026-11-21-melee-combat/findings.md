# Findings: Bare-handed melee

## Facts
- F1 SETTLED: Sword code was only in MatchInstance (_giveSword, _knockOut cleanup); now removed. Source: script_grep "Sword" (only comments left none).
- F2 SETTLED: Client fires Remotes.MeleeRequest("Punch"/"SideSwipe"). Server (MatchInstance._listenMelee, one connection per round, cleaned in _cleanup) checks: valid kind, player in this match, not out, current character, alive, cooldown*0.9. Then FireAllClients(character, kind) for visuals, GetPartBoundsInBox in front of root (Include = other alive fighters), _hit each once. Source: MatchInstance.
- F3 SETTLED: Punch 10 dmg / 0.4 s / box 3x5x4.5; SideSwipe 14 dmg / 0.75 s / box 9x5x5.5 / push 40 via existing Ability "Knockback" client handler. Source: ReplicatedStorage.MeleeConfig.
- F4 SETTLED: R15 joints RightShoulder/RightElbow/Waist are AnimationConstraint; Transform is writable and the Animator resets it each frame. Source: client execute_luau 2026-11-21.
- F5 SETTLED: MeleeController adds pose offsets to joint Transform in RunService.PreSimulation; local click animates instantly, others animate on server broadcast. ANIMATION_IDS = 0 means procedural; a real ID plays an AnimationTrack instead. Source: MeleeController.
- F6 SETTLED: Solo test with dummy foe: 2 punches 100->80, swipe 80->66, 10 spammed remote punches -> 1 accepted, junk kinds ignored, shoulder reached ~98 deg mid-punch, no client errors. Source: playtest 2026-11-21.

## Decisions
- D1: Melee inside MatchInstance, not a new MeleeHandler script. Why: it owns round state (out, chars, knock-out at 1 HP). Rejected: separate server script (would duplicate that state).
- D2: Procedural swing instead of catalog placeholder IDs. Why: other creators' animations don't load in this place, and AI generation failed. Rejected: KeyframeSequenceProvider (Studio-only), Motor6D C0 tweens (joints are AnimationConstraint).
