# Hand-off: Map voting + arena offset

## Goal
We need to implement a map voting system for matches and fix a spatial issue with our dynamic arena instancing to accommodate large custom maps.

Please implement a Map Voting phase and update the arena spatial offset logic.
(Full spec, sections 1-4 and Workflow, word for word in jobs/2026-11-22-map-voting/request.md)
Source: user message (pasted), 2026-11-22 13:20

## Done when
4. Summarize the files modified and explain how I can swap your placeholder maps with my imported Blender models later.
Source: same message (Workflow step 4)

## Don'ts
None given.
Source: same message

## Status
Investigation done, nothing edited yet. Plan in findings D1-D3.

## Route so far
1. Read TableManager, MatchInstance, Draft, DraftClient and the ServerStorage tree (see findings: F1-F5).
2. Chose the design (see findings: D1-D3).

## Next action
Workflow step 1: in TableManager, replace `ARENA_SPACING` (line 16) and the PivotTo line (~93) with `template:GetPivot() + Vector3.new(0, 10000, slot * 50000)` (D2). Then build the placeholder maps (D3), the MapVote module + remote + client (D1), and call it in startMatch before Draft.Run.

## Read first
1. jobs/2026-11-22-map-voting/request.md
2. jobs/2026-11-22-map-voting/findings.md
3. jobs/2026-11-22-map-voting/methods.md

## Leads to re-check
- F1-F5: re-read TableManager, Draft and DraftClient with script_read before editing (line numbers).

## Results to reuse
- Studio: ServerScriptService.TableManager/MatchInstance/Draft, StarterPlayerScripts.DraftClient (UI pattern), ServerStorage.ArenaTemplates.Arena1.

## Waiting on me
None

## Don't redo
- Exploration of the match flow (F1-F5).

## Gotchas
- MCP play is solo only; a 2-player vote test needs the user (Test tab, Clients and Servers).
- Studio id changes per session (list_roblox_studios).
- Scripts exist only in Studio (no Rojo).
- The stay-in-project hook blocks any Bash command containing `../..`, even inside the project.

## Studio/Blender state
- Place saved in Studio: no changes made in this job (last save v20, arena-instancing job)
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all scripts and ArenaTemplates.

## Queue
None

## Chain so far
- Started by session c4fdd47f-b057-4566-876a-03c6b84bb2dd at 2026-11-22 13:20
- Hand-off #1 saved 2026-11-22 13:32 by session c4fdd47f-b057-4566-876a-03c6b84bb2dd
