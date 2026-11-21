# Findings: Bare-handed melee (part 2)

Carried over from jobs/2026-11-21-melee-combat/findings.md (F1-F9, D1-D2 there still hold).

## Facts
- F1 SETTLED: Server melee is in MatchInstance (_listenMelee, _hit): checks kind is in MeleeConfig, player in match, alive, cooldown*0.9; box query in front of root; FireAllClients(char, kind) for visuals. Source: old F2.
- F2 SETTLED: MeleeConfig now only has Punch (10 dmg, 0.4 s, box 3x5x4.5). SideSwipe removed from MeleeConfig, MeleeController and the MatchInstance comment; script_grep "SideSwipe" finds nothing. Source: edits 2026-11-21 13:15.
- F3 SETTLED: Q/E fire abilityRemote in DraftClient (power keys), so they are not free for dodging. Source: DraftClient lines 188-195, read 2026-11-21 13:10.
- F4 SETTLED: Dodge = double-tap A/D within 0.25 s, only while Fighting, 0.8 s cooldown; client-only LinearVelocity (Line mode, 60 studs/s, 0.15 s) along camera right. Solo test: double-tap D moved root 14.7 studs along camera-right (includes ~2 studs of walking from the taps). Source: playtest 2026-11-21 13:18.
- F5 SETTLED (replaced by F6): first exaggerated punch (shoulder -55 to 100 arc, straight left arm raised). User said it looked like "a weird slap/dab combo" (2026-11-21). Cause: big vertical arm arc = slap; straight raised left arm = dab.
- F6 SETTLED: Punch is now a straight jab: chamber (right shoulder 15, elbow 115, waist twist -35, neck +30 counter-turn) -> Quart strike (shoulder 90, elbow straight, waist lean -12 and twist +45, neck -35) -> hold -> recover; left arm is a bent boxer guard (shoulder 50, elbow 115). Angle signs: +X shoulder = arm forward, +X elbow = bend, -X waist = lean forward, +Y waist = right shoulder forward, +X neck = look up. Joints listed once in JOINTS (adds LeftElbow, Neck). Solo test peaks: RightShoulder 106 (incl. idle base), Waist 45, Neck 31, no errors. Source: playtest 2026-11-21 13:21.
- F7 SETTLED: Air lines: airLines(char) spawns 5 thin white Neon parts in front of the right shoulder as the strike starts (task.delay chamber time), tweened 4 studs forward and faded over 0.18 s, then destroyed. Client-only, runs for every procedural punch (own and others). Solo test: 5 lines seen. Not shown when an uploaded animation ID is used. Source: playtest 2026-11-21 13:21.
- F8 SETTLED: Hit reaction: MatchInstance fires MeleeRemote:FireAllClients(victimChar, "Hit") per hit, before _hit. Client POSES.Hit: head snaps back 30, waist rocks back 18, arms jolt, 0.35 s; plays on all clients incl. the victim. Solo test (server fired Hit at own char): Neck 29, Waist 18, no errors. Not yet seen with a real second player. Source: playtest 2026-11-21 13:21.

## Decisions
- D3: Hit flinch reuses MeleeRemote with kind "Hit" instead of a new remote. Why: clients already listen there and validate kind against POSES; "Hit" is not in MeleeConfig, so a client sending it to the server is rejected (F1). Rejected: new RemoteEvent; server-side joint animation (does not replicate Transform).
- D1: Dodge tuning lives as constants at the top of MeleeController, not MeleeConfig. Why: the server accepts any MeleeConfig key as an attack kind (F1), so a Dodge entry there would become a free attack. Rejected: MeleeConfig entry.
- D2: Dodge direction from the camera, not the character's facing. Why: with the default camera, holding D turns the character, so facing-relative would go the wrong way. Rejected: root.CFrame.RightVector.
