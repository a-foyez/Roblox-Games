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
Closed 2026-11-22: user tested (2-player) and approved.

## Route so far
1. Read TableManager, MatchInstance, Draft, DraftClient and the ServerStorage tree (see findings: F1-F5).
2. Chose the design (see findings: D1-D3), then simplified the vote to live inside Draft (D4, F7).
3. Offset fix done in TableManager (F6, D2).

## Next action
None (job closed).

## Read first
1. jobs/2026-11-22-map-voting/findings.md (D3, D4, F6, F7)
2. jobs/2026-11-22-map-voting/request.md (sections 2-4)
3. jobs/2026-11-22-map-voting/methods.md

## Leads to re-check
- F2: ArenaTemplates still holds only Arena1 (search_game_tree ServerStorage) before renaming it.

## Results to reuse
- Studio: ServerScriptService.TableManager (offset done), Draft (add MapVote here), StarterPlayerScripts.DraftClient (add the map branches), ServerStorage.ArenaTemplates.Arena1.

## Waiting on me
None

## Don't redo
- Exploration of the match flow (F1-F5, F7).
- The offset change (F6).

## Gotchas
- MCP play is solo only; a 2-player vote test needs the user (Test tab, Clients and Servers).
- Studio id changes per session (list_roblox_studios); the first MCP call can say "not connected", just retry.
- Scripts exist only in Studio (no Rojo).
- The stay-in-project hook blocks any Bash command containing `../..`, even inside the project.
- No Python on this machine; use Edit or node for file edits.
- The next hand-off would be #3: close this job and continue in a new folder (handoff skill step 3).

## Studio/Blender state
- Place saved in Studio: yes, v44 (TeamCreate) after maps + MapVote
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): all scripts and ArenaTemplates.

## Queue
None

## Chain so far
- Started by session c4fdd47f-b057-4566-876a-03c6b84bb2dd at 2026-11-22 13:20
- Hand-off #1 saved 2026-11-22 13:32 by session c4fdd47f-b057-4566-876a-03c6b84bb2dd
- Resumed by session 0f410153-5870-4671-add1-f0f5a30d93e5 at 2026-11-22 13:34
- Hand-off #2 saved 2026-11-22 13:37 by session 0f410153-5870-4671-add1-f0f5a30d93e5
- Resumed by session 6e73c617-24b7-4f43-8afd-aa0eb8710508 at 2026-11-22 13:55
