# Hand-off: Dynamic arena instancing

## Goal
Please implement Dynamic Arena Instancing by converting our static workspace arena into a template system.
Source: user message (pasted Gemini prompt, "take as rough guide but implement best way possible"), 2026-11-21 11:40. Summary in jobs/2026-11-21-arena-instancing/gemini-prompt.md

## Done when
Summarize the changes made, ensuring no memory leaks occur when a match instance is garbage collected.
Source: same message (Workflow step 3)

## Don'ts
None given.
Source: same message

## Status
Built and solo-tested (F5, F6). Waiting on the user's multi-player test of two matches at once (F7).

## Route so far
1. Read TableManager, MatchInstance, Draft, SpectateClient (F1-F4).
2. Moved Arena1 to ServerStorage.ArenaTemplates, added per-match clones with slots, spectator scoping (F5, D1-D3).
3. Solo server test passed (F6). Place saved (v19).

## Next action
Ask the user to run methods.md "Two-match test" and report; fix anything they see, then close the job.

## Read first
1. jobs/2026-11-21-arena-instancing/findings.md
2. jobs/2026-11-21-arena-instancing/methods.md

## Leads to re-check
- F7: concurrent matches untested with real players.

## Results to reuse
- Studio: ServerStorage.ArenaTemplates.Arena1, Workspace.Arenas (empty), ServerScriptService.TableManager/MatchInstance/Draft, StarterPlayerScripts.SpectateClient.

## Waiting on me
- The user's Clients-and-Servers test (methods.md).
- D3: whether they want lobby players to spectate other tables' matches.

## Don't redo
- F5 build and F6 solo test.

## Gotchas
- MCP play is solo only; Studio id changes per session (list_roblox_studios).
- Scripts exist only in Studio (no Rojo).
- In edit mode Workspace.Arenas is empty on purpose; arenas appear only during matches.

## Studio/Blender state
- Place saved in Studio: yes, version 19 (Team Create), 2026-11-21 11:58
- Rojo in sync: not used
- .blend files: none
- Only in Studio (not in this folder): everything in Results to reuse.

## Queue
None

## Chain so far
- Started by session f5444930-070c-4f0d-97bd-700f305b4cdc at 2026-11-21 11:40
- Hand-off #1 saved 2026-11-21 12:01 by session f5444930-070c-4f0d-97bd-700f305b4cdc
