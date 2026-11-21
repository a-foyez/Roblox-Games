# Gemini prompt (pasted by the user, 2026-11-21 ~11:40, "take as rough guide but implement best way possible")

Summary: convert the static Workspace arena into ServerStorage.ArenaTemplates; remove the one-match
concurrency lock; clone + spatially offset an arena per match after the draft; teleport players to that
clone's spawns; route spectators to the right clone; Destroy() the clone on match end (victory, time
limit, players leaving). Workflow: review teleport/spectator code, implement, summarise changes and
confirm no memory leaks.
