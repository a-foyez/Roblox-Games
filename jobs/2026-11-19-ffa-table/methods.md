# Methods: 1v1v1v1 table (2-4 players)

## Solo playtest
1. start_stop_play is_start=true.
2. Server: `workspace.Tables.Table3.GuestSeat2:Sit(<player Humanoid>)`; check Table3 SeatedCount=1 and HostUserId = that player.
3. Client: PlayerGui.HostSettings.Frame visible, Start Match TextTransparency 0.5.
4. get_console_output, then start_stop_play is_start=false.

## Multi-player test (user runs it)
1. Studio > Test tab > Clients and Servers, 3 or 4 players, Start.
2. All sit at Table3; the first seated gets the host panel; Start Match turns green from 2 seated.
3. Host sets Rounds to win 1, clicks Start. Everyone spawns on Spawn1..N in Arena1 with a Sword.
4. Knock players out: each loses their sword at 1 HP; the round ends when one is left; the series winner shows in Status and all are reseated.
5. With 3-4 players: the first one knocked out falls over and gets the "Spectating PlayerName" bar while 2+ still fight; < > switch fighters. When one is left the bar goes away.
6. Also run one 1v1 on Table1 to confirm 2-player tables still work.

## Death animation check (solo)
1. Play; Server: `m = MatchInstance.new({p}, {RoundsToWin=1, RoundTime=10}, workspace.Arenas.Arena1); m.chars[p] = p.Character; p:SetAttribute("Fighting", true); m:_knockOut(p)`.
2. After 1 s: root Anchored, CFrame.UpVector about (0,0,-1); screen_capture shows the body lying on the grass.
