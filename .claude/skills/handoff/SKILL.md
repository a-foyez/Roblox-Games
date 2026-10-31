---
name: handoff
description: Hand a job off to a fresh chat, or resume one. Use when the user says "hand off here", when a context checkpoint note arrives from scripts/chat-size-check.js, when the user pastes "Continue the job in jobs/<folder>/", or when starting a new multi-step job that needs a jobs/ folder.
---

# Hand-off and resume

Every job lives in `jobs/<YYYY-MM-DD>-<topic>/` with `HANDOFF.md`, `findings.md`, `methods.md` and
`progress.md`. Templates are in `.claude/skills/handoff/templates/`. The checker is
`node scripts/check-handoff.js jobs/<folder>/`. Times are local, `YYYY-MM-DD HH:MM`. Your session id
comes from the SessionStart note ("Session id: ...").

## Start a job
1. Create `jobs/<today>-<short-topic>/` and copy the four templates into it.
2. Copy the user's goal, "done when" criteria and don'ts **word for word** into Goal, Done when and
   Don'ts, each with a `Source:` line (which message, and when).
3. Add `Started by session <id> at <time>` to Chain so far and a "Job started" line to progress.md.

## While working
- Facts go in findings.md with a source, marked SETTLED or LEAD. Decisions get the reason and the options
  rejected. Keep it to the current state, under 8 KB.
- Steps you repeat go in methods.md as exact numbered steps. Log progress with dates in progress.md.
- Requests that arrive after a hand-off has started go in the Queue section and run after the job is
  done, unless the user says "do it now".
- "stay in this chat" means no hand-off until the next checkpoint note.

## Checkpoint notes (from the size hook)
| Note | What to do |
|---|---|
| 50% | Hand off at the best stop in the current work. |
| 60% | Hand off at the first good stop. |
| 70% | Hand off at the end of the current step. |
| 80% | Stop now: get to the nearest clean stop and hand off. |
Below the first checkpoint, never suggest a hand-off.

Subagent briefs must include: "If you get a context checkpoint note, finish your current item and return a
report starting `AGENT HAND-OFF (PARTIAL):` with what is done, what is left and where results are written."
When one comes back, the main chat sends a fresh agent with the rest.

## Hand off
1. **Reach a clean stop.** No half-finished edits. No running agents or playtests (stop the playtest
   with the Studio MCP). Never stop between a fix and its re-check. Every result is written down.
   If the place changed, save it in Studio (ask the user to press Ctrl+S if the MCP can't).
2. Work out n: n = (highest `Hand-off #k saved` in Chain so far) + 1, or 1 if there is none. Add
   `<time> — Hand-off #n started` to progress.md.
3. **If n would be 3**, wrap the job up instead of extending the chain: set Status to
   `Closed at hand-off #3, continued in jobs/<new folder>/`, add `Closed, continued in jobs/<new>/` to Chain
   so far, then start a new job folder (Start a job) that carries over Goal, Done when, Don'ts, Queue and
   the open work, and do the rest of these steps in the new folder as hand-off #1.
4. If HANDOFF.md already records a saved hand-off #k, copy it to `HANDOFF-k.md` (the archive).
5. Update findings.md, methods.md and progress.md, then rewrite HANDOFF.md: every section filled in
   (write "None" rather than leaving one empty), Route so far citing findings (F1, D2...), Read first
   pointing only at what the next chat needs, Studio/Blender state stating whether the place is saved,
   whether Rojo is in sync, which .blend files are saved or exported, and anything that exists only in Studio.
6. Append `Hand-off #n saved <time> by session <id>` to Chain so far, and
   `<time> — Hand-off #n saved` to progress.md.
7. Run `node scripts/check-handoff.js jobs/<folder>/`. Fix everything it lists and repeat until it prints OK.
8. Commit the job folder (`git add jobs/<folder>` then commit "Hand-off #n: <job>"). Do not push.
9. Suggest the chat title `#n <job>` and end with exactly:
   `Hand-off #n saved. Run /clear, then paste: Continue the job in jobs/<folder>/`

## Resume (on "Continue the job in jobs/<folder>/")
1. Run `node scripts/check-handoff.js jobs/<folder>/ --resume`. If it lists a `Resumed by session` entry
   from another session less than 24 hours old, ask the user before going on.
2. Add `Resumed by session <id> at <time>` to Chain so far in HANDOFF.md.
3. Read HANDOFF.md, then only the files under Read first.
4. Re-check every item in Leads to re-check (with the MCP tools, files or a playtest) and update findings.md.
5. Confirm Done when still matches its Source text word for word.
6. Reply in at most 6 lines (job, status, leads re-checked, next action), then keep working.
