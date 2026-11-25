# Findings: In-game Superpower Testing Arena panel

Current state only, under 8 KB. Each fact has a source and is SETTLED or LEAD.

## Facts
- F1 SETTLED: Web prototype at docs/testing-arena.html (plain HTML/JS, no React/Tailwind). Left column of power buttons (selected = filled cyan + glow, one at a time), nerf checkboxes for the selected power (amber when on), stat cards vs base 100 HP / WalkSpeed 16 / JumpPower 50, "Run test" log. Powers: Juggernaut, Phase Dash, Shockwave, Leap (from the game's placeholder registry) + Flight, Invisibility, Telekinesis (concept only). Leap +25 JP and dash ~20 studs are estimates. Source: file + browser screenshot, 2026-11-25 22:48.
- F2 LEAD: Powers/nerfs live in ReplicatedStorage.AbilityRegistry (--!strict ModuleScript): Powers[id] = {Id, Name, Description, Cooldown, Key?, NerfPool={3 ids}, OnApply}, Nerfs[id] = {Id, Name, Description, OnApply}. Equip via AbilityService.Equip(p, character, loadout {powers, nerfs}). Source: jobs/2026-11-21-power-draft-2/findings.md D3/D7 (not checked in Studio this job; the user said the powers are placeholders).

## Decisions
- D1: Web prototype used plain JS instead of React + Tailwind. Why: one small page, no build step, same result. Rejected: React/Tailwind via CDN (extra weight for no gain).
