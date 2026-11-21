# Hand-off: Power & nerf draft (part 2)

## Goal
This is a model promt from Gemini detailing the next step for the game. Before implementing it make sure the approach is the best but keep the core game the same. It should follow Player chooses superpower out of three options -> Remaining vote on nerf for that specific superpower, get 3 superpower specific nerfs -> Nerf revealed to player, move on to next draft. maybe two superpower drafts per person for now
Source: user message, 2026-11-21 10:40 (Gemini prompt pasted with it, kept in jobs/2026-11-21-power-draft-2/gemini-prompt.md)

## Done when
No separate criteria given; the goal itself is the bar (the Gemini prompt's step 3: verify and summarise files created/modified plus any manual Studio setup).
Source: user message, 2026-11-21 10:40

## Don'ts
keep the core game the same
Source: user message, 2026-11-21 10:40

## Status
All code built and solo-tested clean (F9); one bug fixed (F10). Place saved as version 18. Only the 2+ player test is left (methods.md step 9).

## Route so far
1. Read the live scripts; arena lock and per-round reset already exist (see findings: F2, F3).
2. Compared Gemini's plan with the user's flow and settled the design (D1-D9).
3. Built the server side (F6) and the client DraftClient (F8).
4. Solo playtest: everything compiles, powers and nerfs apply, cooldown and bad-arg checks hold (F9). Fixed the Juggernaut ScaleTo speed bug (F10).

## Next action
methods.md "Build order" step 9: ask the user to run Test > Clients and Servers with 2 and then 3 players, play one full draft + match, and report what they see (draft screens, votes, reveal, loadouts, Q/E in the arena). Fix what they report, then write the summary of files and Studio setup (Done when).

## Read first
1. jobs/2026-11-21-power-draft-2/findings.md
2. jobs/2026-11-21-power-draft-2/methods.md

## Leads to re-check
- F6/F8 multi-player parts not yet checked: draft pick/vote/reveal flow, Knockback on a foe, BlindDash overlay, Telegraphed, Fragile. Check with the user's Clients-and-Servers run.

## Results to reuse
- Live scripts (read with script_read before editing): ServerScriptService.TableManager, MatchInstance, AbilityService, Draft; ReplicatedStorage.AbilityRegistry, Remotes.Draft; StarterPlayerScripts.TableClient, DraftClient, SpectateClient.
- Earlier notes and archives: jobs/2026-11-21-power-draft/ (closed), HANDOFF-1.md here.

## Waiting on me
The user's 2-3 player Clients-and-Servers test (not yet asked; ask first thing).

## Don't redo
- Design review (D1-D9), Build order steps 1-8 (F6, F8, F9, F10). Don't rebuild the arena lock or a manual stat-reset routine (D2).

## Gotchas
- Studio id changes per session: get it with list_roblox_studios; target "Choose a Power, GET NERFED!".
- MCP play is solo only; multi-player needs the user's Clients-and-Servers run.
- Scripts exist only in Studio (no Rojo).
- Server can't drive the client's character physics (velocity/impulse); client applies movement (D6).
- Never `:Wait()` on a remote event inside execute_luau: it hangs until the MCP times out.
- No Python on this PC. Use Edit/Write for note changes.

## Studio/Blender state
- Place saved in Studio: yes, Roblox version 17 → now version 18 (Team Create save), includes the Juggernaut fix.
- Rojo in sync: not used
- .blend files: none for this job.
- Only in Studio (not in this folder): all scripts listed in Results to reuse.

## Queue
None

## Chain so far
- Started by session 743a315c-a047-4676-beab-a7b309989eab at 2026-11-21 11:06 (continues jobs/2026-11-21-power-draft/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-21 11:07 by session 743a315c-a047-4676-beab-a7b309989eab
- Resumed by session 48ea92e9-076b-4502-bdc9-495a57aefe96 at 2026-11-21 11:10
- Hand-off #2 saved 2026-11-21 11:23 by session 48ea92e9-076b-4502-bdc9-495a57aefe96
