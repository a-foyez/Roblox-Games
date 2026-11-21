# Gemini prompt the user pasted (2026-11-21 10:40), kept as reference spec

The user's own words win where they differ (see HANDOFF.md Goal and findings D1).

1. Prerequisites: Arena concurrency lock (one shared arena; status message for a second table; release at match end). Deterministic round cleanup (strip tools, WalkSpeed 16, JumpPower 50, MaxHealth 100, default scale, clear attributes/tags, power/nerf cleanup hooks, back to table).
2. Data-driven AbilityRegistry in ReplicatedStorage. Powers: Id, Name, Description, Cooldown, NerfPool (power-specific nerf ids), OnApply, OnRemove. Nerfs: Id, Name, Description, OnApply, OnRemove. MVP:
   - Juggernaut (MaxHealth 150, slight scale up). Nerfs: GlassCannon (HP 60), Sluggish (WalkSpeed 10), HeavyGravity (JumpPower down).
   - PhaseDash (Q short directional blink). Nerfs: ShortCircuit (distance halved), BlindDash (brief dark vignette/FOV cut after dash), Fragile (10 damage per dash).
   - Shockwave (E AoE knockback). Nerfs: SelfKnockback (user knocked back too), Exhaustion (slowed 2 s after use), Telegraphed (3 s visual warning/delay).
3. Draft after host starts, before arena: power pick 12 s (3 random, auto-pick option 1), then nerf vote. 1v1: blind counter-pick 10 s. 3+: per target 8 s vote, voters see live tallies and can switch, target sees only a suspense screen ("Your opponents are choosing a curse for your [Power]...") and their vote packets are rejected; ties (incl. 0 votes) random; 2.5 s reveal to all. Then apply power + nerf, sword, teleport.
4. Edge cases: voter leaves -> drop from expected count so the turn can end early; target leaves -> skip to next; disconnect in 1v1 draft -> abort to table, release arena lock.
5. Workflow: inspect, build server state machine + registry + client Draft/HUD UI, verify, summarise files and any manual Studio setup.
