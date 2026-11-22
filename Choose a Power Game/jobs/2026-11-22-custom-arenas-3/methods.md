# Methods: Custom Blender arenas

## Open a map in the live Blender
1. Check the bridge: execute_blender_code with `result={"ok":1}`.
2. `bpy.ops.wm.open_mainfile(filepath=r"C:\Users\Abdul\OneDrive\Documents\RobloxProjects\Choose a Power Game\assets\arenas\<map>.blend")`.
3. List MESH objects with polygon counts and world bounds (matrix_world @ bound_box) before deleting anything.

## Export and upload a map
1. After trimming: `bpy.ops.outliner.orphans_purge(do_recursive=True)`, `bpy.ops.wm.save_mainfile()`; check no mesh has max(dimensions) > 2048.
2. `bpy.ops.export_scene.gltf(filepath=r"...\assets\arenas\export\<map>.glb", export_format='GLB', use_visible=True, export_cameras=False, export_lights=False, export_apply=True, export_yup=True)`.
3. open_cloud_invoke POST /assets/v1/assets, scopes asset:read+asset:write, body `{"request":{"assetType":"Model","displayName":"Arena_<Name>","description":"...","creationContext":{"creator":{"userId":"46848670"}}}}`, files `[{name:"fileContent", path:<absolute glb path>}]`.
4. Poll GET /assets/v1/operations/{operationId from step 3} until done:true; the asset id is in response.assetId.

## Fix an imported map (after insert_asset into ServerStorage)
1. Move every MeshPart to a new Model `Arena_<Name>`; Anchored = true; Color = Color3.fromHex(name:match("_(%x%x%x%x%x%x)$")); destroy the imported package model.
2. Background parts (highrise: name starts "City"): CanCollide/CanTouch/CanQuery false, CollisionFidelity Box.
3. Parent to workspace briefly; scan floor parts on a grid with a 5x6x5 probe (GetPartsInPart, Include filter = map) plus a down raycast that must hit the floor; pick 4 spread spots; parent back to ServerStorage.
4. Add Folder Spawns with Spawn1..4 (4x1x4, top = floor +1, Transparency 1, CanCollide/CanTouch/CanQuery false) and a KillZone part (tag "KillZone", Transparency 1, CanCollide false) below the lowest playable part.
5. Move the map into ServerStorage.ArenaTemplates, then run "Test a map solo".

## Test a map solo (a real match needs 2 players; MCP play is solo)
1. start_stop_play true. execute_luau on Server: wait for the player's character; clone the template and PivotTo(template:GetPivot() + Vector3.new(0,10000,0)) into workspace.Arenas.
2. For each Spawns.SpawnN: char:PivotTo(spawn.CFrame + (0,3,0)), zero velocity, task.wait(2); pass = root Y about 2-3 above the spawn and HP 100.
3. PivotTo 600 studs past the KillZone centre in X, 40 above it; poll up to 8 s; pass = Health 0.
4. Destroy the clone, start_stop_play false, save_place.
