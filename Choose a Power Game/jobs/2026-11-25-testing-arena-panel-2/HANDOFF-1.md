# Hand-off: In-game Superpower Testing Arena panel (part 2)

## Goal
"Yes, in Studio" (answer to: "Should I build this as an in-game test panel in Studio next?", where "this" is the web Superpower Testing Arena in docs/testing-arena.html)
Source: user message, 2026-11-25 22:50 (carried over from jobs/2026-11-25-testing-arena-panel/)

## Done when
"Yes, that's it" (answer to: "a ScreenGui listing AbilityRegistry powers in a column, selected one highlighted, its 3 nerfs as toggles, applied to your character in a playtest, with stat readout and log")
Source: user answer, 2026-11-25 22:55 (carried over)

## Don'ts
None given.
Source: user message, 2026-11-25 22:50 (carried over)

## Status
All design inputs settled (D2, D3, D4). Nothing built in Studio yet.

## Route so far
1. Web prototype built and published (F1).
2. Registry, AbilityService and match signals read (F2, F3).
3. User chose: all players, lobby only, real character (D2); TestMode flag for lobby actives (D3).
4. Confirmed only server `standing()` gates R/E (F4, F5); server rules designed (D4).

## Next action
Build, in this order:
1. AbilityService line 60: `standing()` accepts `Fighting == nil and TestMode == true` too (D3).
2. RemoteEvent ReplicatedStorage.Remotes.TestLoadout.
3. Script ServerScriptService.TestArena (--!strict) following D4: check power id in Registry.Powers, each nerf in its NerfPool (max 3, no repeats), LoadCharacter, then AbilityService.Equip(p, char, {powers={id}, nerfs=...}), then TestMode = true.
4. LocalScript StarterPlayerScripts.TestArenaClient: ScreenGui ported from docs/testing-arena.html (colours in its :root vars), toggle button, shown only when Fighting == nil; stats read from the live Humanoid; log lines.
Then playtest (methods.md) and save the place.

## Read first
1. jobs/2026-11-25-testing-arena-panel-2/findings.md
2. docs/testing-arena.html lines 1-60 (the CSS look to port)

## Leads to re-check
None

## Results to reuse
- docs/testing-arena.html, published at https://claude.ai/artifact/KR2omjxN5F6kYZpkdg8WTu (private).
- API facts in F2, F3, F5 (no need to re-read the scripts unless they changed).

## Waiting on me
None

## Don't redo
- The web prototype (F1). The answers D2 and D3. Reading DraftClient / MatchInstance (F5).

## Gotchas
- Server-authoritative: take only ids from the client; check them against the registry.
- Equip has no undo. Always LoadCharacter before Equip, or the stats stack.
- Equip sets the Loadout attribute, so "Loadout ~= nil" alone would block a second test (D4).
- TEMP SOLO TEST lines are in MatchInstance/TableManager. Leave them alone (not this job).
- The Studio id changes per session: get it with list_roblox_studios.
- The stay-in-project hook blocks Bash lines ending in `\` and `../` paths; run commands from the project root.

## Studio/Blender state
- Place saved in Studio: no changes made yet in this job
- Rojo in sync: not used
- .blend files: None
- Only in Studio (not in this folder): None from this job

## Queue
None

## Chain so far
- Started by session deb900ef-219c-45d1-a366-cf30672627ad at 2026-11-25 22:58 (continues jobs/2026-11-25-testing-arena-panel/, closed at hand-off #3)
- Hand-off #1 saved 2026-11-25 22:59 by session deb900ef-219c-45d1-a366-cf30672627ad
- Resumed by session 28f18ed4-0cdf-4268-a205-07a0156c61ad at 2026-11-25 23:08
