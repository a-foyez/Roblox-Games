# Findings: Auction table combined settings vote

## Facts
- F1 SETTLED: Before: auction table ran three Draft.MapVote calls in a row (map, rounds 1/3/5, powers 4/6/8), each with its own 10s timer. Source: script_read TableManager lines 100-119.
- F2 SETTLED: Draft.SettingsVote(players, groups) runs one MAP_VOTE_TIME timer over 3 groups; state phase "settingsvote" {groups, tallies, endsAt}; then a "mapreveal" with nextText listing rounds and powers. Remote action ("Setting", i, g) validated against turn.groups[g]. pretty() moved to module scope. Source: multi_edit Draft.
- F3 SETTLED: TableManager auction branch calls SettingsVote with {mapChoices(), {"1","2","3","5"}, {"6","8","12","16"}}; Status "Voting on settings". Non-auction tables still use MapVote. AuctionPowers pool is 20, so 16 lots fit. Source: multi_edit TableManager, Auction line 86.
- F4 SETTLED: DraftClient: card builder became makeCard(); settingsRow has 3 columns sized 0.6/0.2/0.2 (maps with previews, 4 round buttons, 4 power buttons); panel grows to 440 tall, max 980 wide on that phase only. Source: multi_edit DraftClient.
- F5 SETTLED: Playtest: screen rendered, votes counted, out-of-range vote ignored, result "Arena_Colosseum,5,12", no errors. Saved v88. Source: screen_capture + console.

## Decisions
- D1: New SettingsVote function instead of generalising MapVote. Why: MapVote is shared with the normal tables; separate function keeps them untouched. Rejected: multi-group MapVote (bigger diff to shared code).
