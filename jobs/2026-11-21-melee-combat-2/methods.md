# Methods: Bare-handed melee (part 2)

## Two-player melee test (user)
1. In Studio: Test > Clients and Servers, 2 players. Seat both at a 1v1 table, host presses Start, finish the draft.
2. In the arena: left click = punch; double-tap A = dodge left, double-tap D = dodge right.
3. Expect: punch -10 HP with a big wind-up, lunge and guard arm, visible in the other window; dodge is a quick ~10-stud side hop, seen by the other player; spamming does not speed up damage; a lethal hit knocks the victim out.

## Solo check (Claude)
1. Play. On Server: `game.Players:GetPlayers()[1]:SetAttribute("Fighting", true)`.
2. Dodge: on Client store root position, user_keyboard_input D, wait 80 ms, D, wait 500 ms; read displacement dotted with camera RightVector.
3. Punch: on Client connect PostSimulation sampler of max ToAxisAngle on RightShoulder/LeftShoulder/Waist Transform, user_mouse_input left click, wait 700 ms, read maxima and root displacement, disconnect.
4. get_console_output: expect no errors. Stop play.
