# Methods: Custom Blender arenas

## Open a map in the live Blender
1. Check the bridge: execute_blender_code with `result={"ok":1}`.
2. `bpy.ops.wm.open_mainfile(filepath=r"C:\Users\Abdul\OneDrive\Documents\RobloxProjects\Choose a Power Game\assets\arenas\<map>.blend")`.
3. List MESH objects with polygon counts and world bounds (matrix_world @ bound_box) before deleting anything.
