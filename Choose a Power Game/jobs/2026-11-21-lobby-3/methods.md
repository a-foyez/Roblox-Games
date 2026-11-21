# Methods: lobby

## Rebuild the lobby
1. Open the place in Studio (edit mode, not playing).
2. Paste the contents of scripts/build-lobby.luau into the Command Bar (View > Command Bar) and press Enter, or run it with the Studio MCP execute_luau tool (Edit datamodel).
3. Check the output says 6 tables, then save (Ctrl+S or MCP save_place).
(The generator now needs ServerStorage.LobbyAssets with BlockyTreePack and SakuraTree; it asserts if they are missing.)

## Re-add the tree models (only if ServerStorage.LobbyAssets is missing)
1. Studio MCP insert_asset 7298117174 (name BlockyTreePack) and 16014247305 (name SakuraTree), parentPath game.ServerStorage.
2. Check both for LuaSourceContainer descendants and delete any.
3. Move both into a Folder ServerStorage.LobbyAssets.

## Re-add the lobby-3 assets (only if missing from ServerStorage.LobbyAssets)
1. Studio MCP insert_asset with parentPath game.ServerStorage.LobbyAssets: 82796424171704 (name SunsetSky), 5558477241 (MountainRocks), 138867455854218 (StylizedRocks), 2846635652 (LightGrass).
2. Check each for LuaSourceContainer descendants and delete any.
