# Findings: Choose a Power, GET NERFED! game core

Current state only, under 8 KB. SETTLED = verified; LEAD = re-check before relying on it.

## Facts
- F1 SETTLED: Two Studio places are open. The game is built in "Choose a Power, GET NERFED!" (placeId 132554684595689, Team Create), NOT the old TestGame place (87322131800218). Source: list_roblox_studios, 2026-11-19.
- F2 SETTLED: Built in that place: Workspace.Arena (100x100 floor centred at 0,0,250; 40-stud see-through walls; 4 pillars; 8 invisible "Spawn" parts), ServerScriptService.PowerDefs (ModuleScript), ServerScriptService.GameLoop (Script), StarterPlayerScripts.DraftUI (LocalScript). GameLoop creates ReplicatedStorage.DraftRemote at runtime. Source: execute_luau + multi_edit, 2026-11-19.
- F3 SETTLED: Solo playtest: lobby countdown -> 3 power cards shown -> picks accepted -> nerf auto-picked (no voters) -> fighter teleported to arena with powers+nerfs applied (attributes DamageMult/Cooldown/Lifesteal/Thorns set, WalkSpeed reduced, Highlight added), sword in Backpack, ForceField removed, no console errors. Source: playtest 2026-11-19 ~21:20.
- F4 LEAD: Not tested yet: sword hits on another player (needs 2-player test: Test > Clients and Servers), slash animation, sword grip look, each individual nerf's behaviour, Big Target ScaleTo with R15, round reset after a win.
- F5 SETTLED: Place saved to Roblox (version 5) after the build. Source: save_place, 2026-11-19.

## Decisions
- D1: Draft = random turn order; each turn the chooser picks 1 of 3 random powers they don't own, then every other player votes on 1 of that power's 3 nerfs (most votes wins, ties/no votes random). 3 picks each with <=3 players, else 2. Why: matches the premise ("2 or 3 superpowers"), keeps rounds short. Rejected: one random player picks the nerf (less fun for the rest).
- D2: All powers are passive; the fighting ability is a server-checked Sword for everyone. Why: no extra input remotes to secure for v1. Rejected: active powers like fireball/dash (need key input + more validation), a good next step.
- D3: Stats live as attributes on the character (DamageMult, DamageTakenMult, Cooldown, SelfHitChance, Lifesteal, Thorns, StillOnly, LastHit); effect loops are tied to the character, so a respawn clears them. Why: no cleanup code needed.
- D4: Physics nerfs use velocity checks on the server, not Humanoid states or impulses (the client owns its character, so server-side Jump/ApplyImpulse is unreliable).
- D5: MIN_PLAYERS is 1 in Studio, 2 live. Solo fight ends on death or the 180 s timer.
