# Original request (user message, 2026-11-22 13:20, pasted), word for word

We need to implement a map voting system for matches and fix a spatial issue with our dynamic arena instancing to accommodate large custom maps.

Please implement a Map Voting phase and update the arena spatial offset logic.

### 1. Spatial Offset Fix (Distance Expansion)
- Locate the dynamic arena instancing logic where the cloned arena's `Vector3` offset is calculated.
- The current offset is too close to the lobby spawn, and some of our new custom arenas are massive. 
- Update the offset multiplier to a much larger distance (e.g., `Vector3.new(0, 10000, match_index * 50000)`) to ensure absolutely zero visual or physical overlap between concurrent matches and the main lobby.

### 2. Map Registry & Setup
- Ensure the server reads available maps dynamically from `ServerStorage.ArenaTemplates`. 
- Create at least 3 placeholder map folders/models in `ArenaTemplates` (e.g., `Arena_Classic`, `Arena_Lava`, `Arena_Sky`) so the voting system has options to pull from. Each must have designated spawn points.

### 3. Map Voting State Machine (Phase 0)
Insert a new **Map Voting Phase** immediately after the table host clicks "Start Match", before the Superpower Draft begins:
- **UI & Options:** The server selects 3 random maps from `ArenaTemplates` (or all of them if there are 3 or fewer) and presents them to all seated players via a new Map Voting UI.
- **Voting Logic (10s Timer):** All participants get 10 seconds to cast a vote for their preferred map. Players can change their vote until the timer ends. The UI should display live vote tallies.
- **Resolution & Tie-Breaker:** When the timer hits zero, tally the votes. If there is a tie, the server randomly selects the winner from the tied maps.
- **Reveal (2.5s):** Broadcast the winning map to the players before smoothly transitioning into Phase 1 (The Superpower Draft).

### 4. Integration with Instancing
- Pass the name of the winning map into the arena cloning function so the server clones the voted arena instead of a hardcoded default.
- Ensure the teleportation logic still correctly routes players to the spawn locations of this specific cloned map instance after the drafting and counter-nerf phases are complete.

### Workflow
1. Update the spatial offset math first.
2. Build the Map Voting UI and server-side tallying logic.
3. Integrate the winning map into the match initialization flow.
4. Summarize the files modified and explain how I can swap your placeholder maps with my imported Blender models later.
