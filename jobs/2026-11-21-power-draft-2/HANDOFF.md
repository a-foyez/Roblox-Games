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
All code built (server F6, client F8) and saved as place version 17. Nothing playtested yet.

## Route so far
1. Read the live scripts; arena lock and per-round reset already exist (see findings: F2, F3).
2. Compared Gemini's plan with the user's flow and settled the design (D1-D9).
3. Built methods.md Build order steps 1-6, the server side (F6, F7).
4. Built step 7: DraftClient, and removed the old E/Dash code from TableClient (F8).

## Next action
Follow jobs/2026-11-21-power-draft-2/methods.md "Build order" step 8: start_stop_play solo, get_console_output, fix any compile/runtime errors in the scripts from F6/F8; then step 9.

## Read first
1. jobs/2026-11-21-power-draft-2/findings.md
2. jobs/2026-11-21-power-draft-2/methods.md

## Leads to re-check
- F6: server scripts compile and Draft/AbilityService behave as described. Check with a Play run + get_console_output.
- F8: DraftClient compiles and shows no errors at start. Same Play run (Client datamodel output).

## Results to reuse
- Live scripts (read with script_read before editing): ServerScriptService.TableManager, MatchInstance, AbilityService, Draft; ReplicatedStorage.AbilityRegistry, Remotes.Draft; StarterPlayerScripts.TableClient, DraftClient, SpectateClient.
- Earlier notes and archives: jobs/2026-11-21-power-draft/ (closed).

## Waiting on me
None

## Don't redo
- Script reading and design review (F1-F5, D1-D9); Build order steps 1-7 (F6, F8). Don't rebuild the arena lock or a manual stat-reset routine (D2).

## Gotchas
- Studio id changes per session: get it with list_roblox_studios; target "Choose a Power, GET NERFED!".
- MCP play is solo only; multi-player needs the user's Clients-and-Servers run.
- Scripts exist only in Studio (no Rojo).
- Server can't drive the client's character physics (velocity/impulse); client applies movement (D6).
- No Python on this PC. The stay-in-project hook can misread quoted text in Bash commands as paths; use Edit/Write for note changes.

## Studio/Blender state
- Place saved in Studio: yes, Roblox version 17 (Team Create save), includes DraftClient and the TableClient edit.
- Rojo in sync: not used
- .blend files: none for this job.
- Only in Studio (not in this folder): all scripts listed in Results to reuse.

## Queue
None

## Chain so far
- Started by session 743a315c-a047-4676-beab-a7b309989eab at 2026-11-21 11:06 (continues jobs/2026-11-21-power-draft/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-21 11:07 by session 743a315c-a047-4676-beab-a7b309989eab
