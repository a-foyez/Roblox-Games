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
