# Methods: Physical superpower test arena

1. Studio id: 04ff5703-763f-4147-a65b-2b5d430a83a2 (confirm with list_roblox_studios).
2. Build parts in Edit with execute_luau, one chunk per folder: build in a Model outside the DataModel, parent it, then task.wait().
3. Edit scripts with multi_edit (Edit mode). Playtest with start_stop_play, read get_console_output, stop, then save_place.
4. Test a server handler fast: in Play, execute_luau (Client) `Remotes.X:FireServer(...)`, task.wait, then read the player's attributes and HumanoidRootPart.Position.
5. Real clicks: user_mouse_input x/y = button AbsolutePosition centre, no GuiInset (old job F8).
