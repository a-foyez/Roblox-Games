# Findings: Bare-handed melee (part 2)

Carried over from jobs/2026-11-21-melee-combat/findings.md (F1-F9, D1-D2 there still hold).

## Facts
- F1 SETTLED: Server melee is in MatchInstance (_listenMelee, _hit): checks kind is in MeleeConfig, player in match, alive, cooldown*0.9; box query in front of root; FireAllClients(char, kind) for visuals. Source: old F2.
- F2 SETTLED: MeleeConfig now only has Punch (10 dmg, 0.4 s, box 3x5x4.5). SideSwipe removed from MeleeConfig, MeleeController and the MatchInstance comment; script_grep "SideSwipe" finds nothing. Source: edits 2026-11-21 13:15.
- F3 SETTLED: Q/E fire abilityRemote in DraftClient (power keys), so they are not free for dodging. Source: DraftClient lines 188-195, read 2026-11-21 13:10.
- F4 SETTLED: Dodge = double-tap A/D within 0.25 s, only while Fighting, 0.8 s cooldown; client-only LinearVelocity (Line mode, 60 studs/s, 0.15 s) along camera right. Solo test: double-tap D moved root 14.7 studs along camera-right (includes ~2 studs of walking from the taps). Source: playtest 2026-11-21 13:18.
- F5 SETTLED: Exaggerated punch: wind-up (arm back, elbow 115, waist -50), Back-eased strike to 100 deg with waist +50 lean, hold, 0.2 s recover; left arm raised as guard (LeftShoulder joint added); 3-stud forward lunge (22 studs/s, 0.1 s) on own punch. Solo test peaks: right shoulder 116 deg, left shoulder 85, waist 58, lunge 3.0 studs, no console errors, self-check asserts pass. Source: playtest 2026-11-21 13:19.

## Decisions
- D1: Dodge tuning lives as constants at the top of MeleeController, not MeleeConfig. Why: the server accepts any MeleeConfig key as an attack kind (F1), so a Dodge entry there would become a free attack. Rejected: MeleeConfig entry.
- D2: Dodge direction from the camera, not the character's facing. Why: with the default camera, holding D turns the character, so facing-relative would go the wrong way. Rejected: root.CFrame.RightVector.
