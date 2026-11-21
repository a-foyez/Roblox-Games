# Methods: Bare-handed melee

## Two-player melee test (user)
1. In Studio: Test > Clients and Servers, 2 players. Seat both at a 1v1 table, host presses Start, finish the draft.
2. In the arena: left click = punch, F or quick right-click = side swipe.
3. Expect: punch -10 HP, swipe -14 HP plus a small shove; the other window shows the attacker's arm swing; spamming does not speed up damage; a lethal hit knocks the victim out (1 HP, falls over).

## Solo server check (Claude)
1. Play; on Server: spawn an R15 dummy 3.5 studs in front of the player, MatchInstance.new({p, fakeTable}, ...), set chars, call m:_listenMelee(), set p Fighting=true.
2. Click / press F via Studio MCP input tools; read dummy Humanoid.Health on Server. (Swipe knockback errors on the fake player: expected in this test only.)
