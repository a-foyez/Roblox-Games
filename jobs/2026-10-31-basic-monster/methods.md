# Methods: basic monster in Blender, imported into Studio

## Build and place the monster
1. In Blender (execute_blender_code), make a collection "Monster" (leave other collections alone). Very basic, built from cubes/spheres, 1 unit = 1 stud: green body ~4x4x5, head ~3x3x3 on top, two red eye cubes, two horns, two arms, two legs. Feet at Blender Z=0.
2. Export selection to assets/monster.fbx (apply_scale_options='FBX_SCALE_UNITS') and save a copy as assets/monster.blend.
3. In the same Blender call, return each object's name, size, colour and transform converted to Roblox: M = ((1,0,0),(0,0,1),(0,-1,0)); position = M @ translation; rotation = M @ R @ M^T; size = (sx, sz, sy).
4. In Studio (execute_luau, Edit): delete any old Workspace.Monster, build a Model "Monster" of anchored Parts from that data (Ball shape for spheres), offset to an open spot like (-5, 0, -20), set PrimaryPart to the body, parent to workspace.
5. screen_capture looking at the monster to verify; ask the user to save the place (Ctrl+S).
6. Commit assets/monster.blend and assets/monster.fbx (not the .blend1).
