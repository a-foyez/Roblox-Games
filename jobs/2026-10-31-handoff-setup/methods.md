# Methods: hand-off system setup

## Run the hook tests
1. From the project root run `node scripts/test/run-tests.js`.
2. Every line must say `ok`, ending with `N passed, 0 failed`. Scratch files go in `.claude/handoff-state/test-tmp/` and are deleted afterwards.

## Check a job folder before committing a hand-off
1. Run `node scripts/check-handoff.js jobs/<folder>/`.
2. Fix every line it lists, then run it again until it prints `OK`.

## Try a checkpoint note live
1. In `.claude/handoff-config.json`, temporarily set the first checkpoint's `at` to `0.01`.
2. Send any message in a new chat. Claude should mention the 1% checkpoint note once, and not again on later turns.
3. Put `at` back to `0.5` and delete `.claude/handoff-state/<session id>.json`.
