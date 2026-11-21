# Methods: 1v1 Table Lobby system

## Client script spec (TableClient, written 2026-11-19, F5)
1. LocalScript at StarterPlayer.StarterPlayerScripts.TableClient, `--!strict`, created with multi_edit (className LocalScript).
2. Build a ScreenGui (ResetOnSpawn = false) in code: a small Frame with a title "Host settings", a "Rounds to win: N" button (cycles 1 -> 3 -> 5 -> 1), a "Round time: Ns" button (toggles 45/60), a "Start Match" button and a Status label.
3. Buttons fire `ReplicatedStorage.Remotes.HostAction:FireServer("RoundsToWin", n)`, `("RoundTime", n)`, `("Start")`.
4. refresh(): find the model in workspace.Tables whose HostUserId == LocalPlayer.UserId and InMatch == false. Show the frame only then; label text from its RoundsToWin/RoundTime/Status attributes; Start button Active/AutoButtonColor and dimmed unless SeatedCount == 2. Call refresh on every table's AttributeChanged.
5. Dash: UserInputService.InputBegan, key E, not gameProcessed -> `Remotes.Ability:FireServer()`. On `Remotes.Ability.OnClientEvent("Dash")`: HumanoidRootPart.AssemblyLinearVelocity = LookVector * 100 + Vector3.new(0, current Y, 0).
6. Optional: disable reset with `StarterGui:SetCore("ResetButtonCallback", false)` in a pcall retry loop (reset counts as losing the round anyway).

## Solo playtest
1. start_stop_play is_start=true; get_console_output, look for errors from TableManager/MatchInstance/AbilityService.
2. In the Server datamodel, sit the player: `workspace.Tables.Table1.HostSeat:Sit(game.Players:GetPlayers()[1].Character.Humanoid)`; check Table1 attributes HostUserId and SeatedCount=1.
3. In the Client datamodel, fire HostAction("RoundsToWin", 5), ("RoundsToWin", 2) and ("Start"); check on the server that 5 is accepted, 2 rejected, Start ignored with 1 seated.
4. Stop play (start_stop_play is_start=false).
5. Full match needs 2 players: ask the user to run Test > Clients and Servers with 2 players.

## Two-player test (user runs it)
1. Ask the user: Studio > Test tab > Clients and Servers, 2 players, Start.
2. Player 1 sits in Table1.HostSeat (host panel appears), Player 2 sits in GuestSeat (Start Match turns green).
3. Host sets Rounds to win 1, Round time 45, clicks Start Match. Both teleport to Arena1, both have a Sword, E dashes, both walk slower.
4. Fight to a win: both return to their seats, Status shows the winner.
5. Also: the host stands up while the guest stays seated -> the guest gets the host panel (covers F7).
6. Read the server output with get_console_output if the MCP sees that session; otherwise ask the user to paste errors.
