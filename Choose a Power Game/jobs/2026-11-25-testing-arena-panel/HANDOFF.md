# Hand-off: In-game Superpower Testing Arena panel

## Goal
"Yes, in Studio" (answer to: "Should I build this as an in-game test panel in Studio next?", where "this" is the web Superpower Testing Arena in docs/testing-arena.html)
Source: user message, 2026-11-25 22:50

## Done when
None given. Proposed (confirm with the user): an in-game ScreenGui in the "Choose a Power, GET NERFED!" place that lists the powers from AbilityRegistry in a column, highlights the selected one, shows that power's nerfs as toggles, and applies the chosen power + nerfs to the player's own character in a playtest, with a stat readout and log.
Source: user message, 2026-11-25 22:50 (proposal by Claude, not the user's words)

## Don'ts
None given.
Source: user message, 2026-11-25 22:50

## Status
Not started in Studio. Web prototype is done (F1). Job created and handed off at the 50% checkpoint.

## Route so far
1. Built and published the web prototype (see findings: F1).
2. Created this job folder; no Studio work yet.

## Next action
Ask the user the two open questions in Waiting on me, then inspect ReplicatedStorage.AbilityRegistry and ServerScriptService.AbilityService in Studio (re-check F2) before designing the panel.

## Read first
1. jobs/2026-11-25-testing-arena-panel/findings.md
2. docs/testing-arena.html (the look and behaviour to port)

## Leads to re-check
- F2: AbilityRegistry / AbilityService structure and API.

## Results to reuse
- docs/testing-arena.html, published at https://claude.ai/artifact/KR2omjxN5F6kYZpkdg8WTu (private).

## Waiting on me
- Who may use the panel: Studio-only dev tool (gated to RunService:IsStudio() / place owner) or open to all players (e.g. a practice area)?
- Should toggling nerfs apply them to your real character (server-side via AbilityService), or only show the readout?

## Don't redo
- The web prototype (F1).

## Gotchas
- The panel must not let clients equip arbitrary powers in real matches: validate on the server and gate the remote (CLAUDE.md: server-authoritative).
- Studio id changes per session: get it with list_roblox_studios; target "Choose a Power, GET NERFED!".

## Studio/Blender state
- Place saved in Studio: no changes made this job
- Rojo in sync: not used
- .blend files: None
- Only in Studio (not in this folder): None from this job

## Queue
None

## Chain so far
- Started by session 49aca0b6-3020-4a6b-a30a-56697fd4a401 at 2026-11-25 22:51
- Hand-off #1 saved 2026-11-25 22:53 by session 49aca0b6-3020-4a6b-a30a-56697fd4a401
