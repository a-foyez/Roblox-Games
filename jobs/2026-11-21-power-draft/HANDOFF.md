# Hand-off: Power & nerf draft

## Goal
This is a model promt from Gemini detailing the next step for the game. Before implementing it make sure the approach is the best but keep the core game the same. It should follow Player chooses superpower out of three options -> Remaining vote on nerf for that specific superpower, get 3 superpower specific nerfs -> Nerf revealed to player, move on to next draft. maybe two superpower drafts per person for now
Source: user message, 2026-11-21 10:40 (Gemini prompt pasted with it, kept in jobs/2026-11-21-power-draft/gemini-prompt.md)

## Done when
No separate criteria given; the goal itself is the bar (the Gemini prompt's step 3: verify and summarise files created/modified plus any manual Studio setup).
Source: user message, 2026-11-21 10:40

## Don'ts
keep the core game the same
Source: user message, 2026-11-21 10:40

## Status
Design settled (findings D1-D9), nothing built yet. Place unchanged.

## Route so far
1. Read the live scripts; arena lock and per-round reset already exist (see findings: F2, F3).
2. Compared Gemini's plan with the user's flow and settled the design (D1-D9).

## Next action
Follow jobs/2026-11-21-power-draft/methods.md "Build order" from step 1 (create Remotes.Draft, then ReplicatedStorage.AbilityRegistry).

## Read first
1. jobs/2026-11-21-power-draft/findings.md
2. jobs/2026-11-21-power-draft/methods.md

## Leads to re-check
None

## Results to reuse
- Live scripts (read them with script_read before editing): ServerScriptService.TableManager, MatchInstance, AbilityService; StarterPlayerScripts.TableClient, SpectateClient.

## Waiting on me
None

## Don't redo
- Script reading and design review (F1-F5, D1-D9). Don't rebuild the arena lock or a manual stat-reset routine (D2).

## Gotchas
- Studio id changes per session: get it with list_roblox_studios; target "Choose a Power, GET NERFED!".
- MCP play is solo only; multi-player needs the user's Clients-and-Servers run.
- Scripts exist only in Studio (no Rojo).
- Server can't drive the client's character physics (velocity/impulse); client applies movement (D6).

## Studio/Blender state
- Place saved in Studio: yes, Roblox version 13, no changes this job.
- Rojo in sync: not used
- .blend files: none for this job.
- Only in Studio (not in this folder): all scripts listed in Results to reuse.

## Queue
None

## Chain so far
- Started by session ce5c1bdf-23e1-48c7-855b-7f783ba6b0c0 at 2026-11-21 10:42
- Hand-off #1 saved 2026-11-21 10:58 by session ce5c1bdf-23e1-48c7-855b-7f783ba6b0c0
