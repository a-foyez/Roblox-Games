--!strict
-- Lobby generator. Paste into Studio's Command Bar (edit mode) to (re)build the lobby.
-- Rebuilds Workspace.Tables (TableManager/TableClient read it at startup) and the decor in Workspace.Lobby.
-- Safe to re-run: it deletes what it built last time first. Seeded random, so the layout is the same every run.

local rng = Random.new(42)
local TABLE_RADIUS, PLAZA_RADIUS, PAD_RADIUS = 55, 28, 9
local STONE, DARK_STONE, PATH = Color3.fromRGB(196, 186, 168), Color3.fromRGB(120, 116, 110), Color3.fromRGB(170, 150, 120)
local WARM = Color3.fromRGB(255, 196, 120)

if workspace:FindFirstChild("Lobby") then (workspace :: any).Lobby:Destroy() end
local tablesFolder = workspace:FindFirstChild("Tables") or Instance.new("Folder")
tablesFolder.Name = "Tables"
tablesFolder:ClearAllChildren()
tablesFolder.Parent = workspace

local lobby = Instance.new("Folder")
lobby.Name = "Lobby"
local function folder(name: string): Folder
	local f = Instance.new("Folder")
	f.Name = name
	f.Parent = lobby
	return f
end
local fFountain, fPlaza, fPaths, fPads = folder("Fountain"), folder("Plaza"), folder("Paths"), folder("TablePads")
local fTrees, fRocks, fLamps, fBenches = folder("Trees"), folder("Rocks"), folder("Lamps"), folder("Benches")

local function part(parent: Instance, name: string, size: Vector3, cf: CFrame, material: Enum.Material, color: Color3, className: string?): BasePart
	local p = Instance.new((className or "Part") :: any) :: BasePart
	p.Name, p.Size, p.CFrame, p.Material, p.Color = name, size, cf, material, color
	p.Anchored = true
	p.TopSurface, p.BottomSurface = Enum.SurfaceType.Smooth, Enum.SurfaceType.Smooth
	p.Parent = parent
	return p
end
-- Upright disc/column: Roblox cylinders run along X, so tip it onto its side.
local function cyl(parent: Instance, name: string, pos: Vector3, radius: number, height: number, material: Enum.Material, color: Color3): BasePart
	local p = part(parent, name, Vector3.new(height, radius * 2, radius * 2), CFrame.new(pos) * CFrame.Angles(0, 0, math.pi / 2), material, color);
	(p :: Part).Shape = Enum.PartType.Cylinder
	return p
end
local function ball(parent: Instance, name: string, pos: Vector3, d: number, material: Enum.Material, color: Color3): BasePart
	local p = part(parent, name, Vector3.one * d, CFrame.new(pos), material, color);
	(p :: Part).Shape = Enum.PartType.Ball
	return p
end
-- Block segments around a circle, each facing the centre: a cheap round rim.
local function ring(parent: Instance, center: Vector3, radius: number, segments: number, height: number, thick: number, color: Color3)
	for i = 1, segments do
		local a = i / segments * math.pi * 2
		local pos = center + Vector3.new(math.cos(a) * radius, height / 2, math.sin(a) * radius)
		part(parent, "Rim", Vector3.new(2 * math.pi * radius / segments * 1.08, height, thick), CFrame.lookAt(pos, Vector3.new(center.X, pos.Y, center.Z)), Enum.Material.Slate, color)
	end
end
local function polar(angleDeg: number, r: number, y: number): Vector3
	local a = math.rad(angleDeg)
	return Vector3.new(math.cos(a) * r, y, math.sin(a) * r)
end
local function light(p: Instance, range: number, brightness: number, color: Color3)
	local l = Instance.new("PointLight")
	l.Range, l.Brightness, l.Color, l.Shadows = range, brightness, color, false
	l.Parent = p
end
local function lamp(pos: Vector3)
	local m = Instance.new("Model")
	m.Name = "Lamp"
	cyl(m, "Post", pos + Vector3.new(0, 3.5, 0), 0.3, 7, Enum.Material.Metal, Color3.fromRGB(40, 40, 45))
	part(m, "Cap", Vector3.new(1.6, 0.3, 1.6), CFrame.new(pos + Vector3.new(0, 8.4, 0)), Enum.Material.Metal, Color3.fromRGB(40, 40, 45))
	local glow = part(m, "Lantern", Vector3.new(1, 1.2, 1), CFrame.new(pos + Vector3.new(0, 7.6, 0)), Enum.Material.Neon, WARM)
	light(glow, 18, 1.4, WARM)
	m.Parent = fLamps
end

-- Fountain (three tiers) ------------------------------------------------
local WATER = Color3.fromRGB(70, 150, 210)
cyl(fFountain, "Basin", Vector3.new(0, 0.5, 0), 11, 1, Enum.Material.Slate, DARK_STONE)
ring(fFountain, Vector3.new(0, 1, 0), 10.75, 28, 1.4, 1.3, STONE)
local water = cyl(fFountain, "Water", Vector3.new(0, 1.6, 0), 10.3, 1.2, Enum.Material.Glass, WATER)
water.Transparency, water.CanCollide = 0.35, false
light(water, 20, 1, Color3.fromRGB(140, 200, 255))
cyl(fFountain, "Column", Vector3.new(0, 4, 0), 1.5, 6, Enum.Material.Slate, STONE)
cyl(fFountain, "MidBowl", Vector3.new(0, 5.4, 0), 5, 0.8, Enum.Material.Slate, STONE)
ring(fFountain, Vector3.new(0, 5.8, 0), 4.8, 18, 0.6, 0.6, STONE)
local midWater = cyl(fFountain, "MidWater", Vector3.new(0, 6.0, 0), 4.5, 0.3, Enum.Material.Glass, WATER)
midWater.Transparency, midWater.CanCollide = 0.35, false
cyl(fFountain, "UpperColumn", Vector3.new(0, 7.5, 0), 0.8, 3, Enum.Material.Slate, STONE)
cyl(fFountain, "TopBowl", Vector3.new(0, 9.2, 0), 2.5, 0.6, Enum.Material.Slate, STONE)
local finial = ball(fFountain, "Finial", Vector3.new(0, 10.2, 0), 1.4, Enum.Material.Marble, Color3.fromRGB(235, 230, 220))
local spray = Instance.new("ParticleEmitter")
spray.Color = ColorSequence.new(Color3.fromRGB(200, 235, 255))
spray.Size = NumberSequence.new(0.5, 0.15)
spray.Transparency = NumberSequence.new(0.2, 1)
spray.Lifetime = NumberRange.new(1, 1.4)
spray.Rate, spray.Speed, spray.SpreadAngle = 80, NumberRange.new(8, 11), Vector2.new(25, 25)
spray.Acceleration = Vector3.new(0, -22, 0)
spray.Parent = finial

-- Plaza, paths, spawn -----------------------------------------------------
cyl(fPlaza, "Edge", Vector3.new(0, 0.125, 0), PLAZA_RADIUS + 1.2, 0.25, Enum.Material.Slate, DARK_STONE)
cyl(fPlaza, "Floor", Vector3.new(0, 0.15, 0), PLAZA_RADIUS, 0.3, Enum.Material.Cobblestone, STONE)
local spawn = workspace:FindFirstChild("SpawnLocation") :: SpawnLocation?
if spawn then
	spawn.Size = Vector3.new(6, 0.2, 6)
	spawn.CFrame = CFrame.lookAt(polar(0, 19, 0.4), Vector3.new(0, 0.4, 0))
end
-- Gaps between paths sit at 0, 60, ... degrees; the spawn has the 0 gap, benches the rest.
for gap = 0, 300, 60 do
	lamp(polar(gap, 26, 0.3))
	if gap ~= 0 then
		local m = Instance.new("Model")
		m.Name = "Bench"
		local cf = CFrame.lookAt(polar(gap, 19, 0), Vector3.zero)
		part(m, "Seat", Vector3.new(5, 0.5, 1.8), cf * CFrame.new(0, 1.6, 0), Enum.Material.Wood, Color3.fromRGB(130, 90, 55), "Seat")
		part(m, "Back", Vector3.new(5, 2, 0.4), cf * CFrame.new(0, 2.8, 0.9), Enum.Material.Wood, Color3.fromRGB(130, 90, 55))
		for _, x in { -2, 2 } do part(m, "Leg", Vector3.new(0.5, 1.4, 1.6), cf * CFrame.new(x, 0.9, 0), Enum.Material.Slate, DARK_STONE) end
		m.Parent = fBenches
	end
end
task.wait()

-- Tables at the ends of six paths: 1v1 at 30/150/210/330 degrees, free-for-all at 90/270 ----------
local RED, GOLD = Color3.fromRGB(200, 60, 60), Color3.fromRGB(230, 180, 60)
local SEAT_BLUE, SEAT_RED = Color3.fromRGB(60, 120, 220), Color3.fromRGB(220, 70, 60)
local layout = { { 30, false }, { 90, true }, { 150, false }, { 210, false }, { 270, true }, { 330, false } }
for i, entry in layout do
	local angle, ffa = entry[1] :: number, entry[2] :: boolean
	local accent = if ffa then GOLD else RED
	local center = polar(angle, TABLE_RADIUS, 0)
	local cf = CFrame.lookAt(center, Vector3.zero) -- local -Z points at the fountain

	local pathLen = TABLE_RADIUS - PAD_RADIUS - PLAZA_RADIUS + 2
	local mid = polar(angle, PLAZA_RADIUS - 1 + pathLen / 2, 0.11)
	part(fPaths, "Path", Vector3.new(6, 0.22, pathLen), CFrame.lookAt(mid, Vector3.new(0, 0.11, 0)), Enum.Material.Cobblestone, PATH)
	cyl(fPads, "Pad", center + Vector3.new(0, 0.2, 0), PAD_RADIUS, 0.4, Enum.Material.Slate, DARK_STONE)
	cyl(fPads, "Accent", center + Vector3.new(0, 0.225, 0), PAD_RADIUS - 1.5, 0.45, Enum.Material.SmoothPlastic, accent)
	for _, x in { -4.5, 4.5 } do lamp((cf * CFrame.new(x, 0.4, -7.5)).Position) end
	-- Banner pole behind the table in the table's colour.
	cyl(fPads, "BannerPole", (cf * CFrame.new(0, 6.4, 7.5)).Position, 0.25, 12, Enum.Material.Metal, Color3.fromRGB(40, 40, 45))
	part(fPads, "Banner", Vector3.new(0.2, 4, 3), cf * CFrame.new(0, 9.5, 7.5) * CFrame.Angles(0, math.pi / 2, 0) * CFrame.new(0, 0, 1.6), Enum.Material.Fabric, accent)

	local model = Instance.new("Model")
	model.Name = "Table" .. i
	local topSize = if ffa then Vector3.new(7, 1, 7) else Vector3.new(6, 1, 4)
	local top = part(model, "Top", topSize, cf * CFrame.new(0, 3.4, 0), Enum.Material.Wood, Color3.fromRGB(120, 80, 50))
	part(model, "Leg", Vector3.new(1, 2.5, 1), cf * CFrame.new(0, 1.65, 0), Enum.Material.Wood, Color3.fromRGB(90, 60, 40))
	-- TableManager needs a Seat named HostSeat plus at least one other Seat; seats face the table.
	local seats = if ffa
		then { { "HostSeat", Vector3.new(0, 0, 5.5) }, { "GuestSeat", Vector3.new(0, 0, -5.5) }, { "GuestSeat2", Vector3.new(-5.5, 0, 0) }, { "GuestSeat3", Vector3.new(5.5, 0, 0) } }
		else { { "HostSeat", Vector3.new(-4.5, 0, 0) }, { "GuestSeat", Vector3.new(4.5, 0, 0) } }
	for _, s in seats do
		local pos = (cf * CFrame.new((s[2] :: Vector3) + Vector3.new(0, 1.9, 0))).Position
		local look = (cf * CFrame.new(0, 1.9, 0)).Position
		part(model, s[1] :: string, Vector3.new(2, 1, 2), CFrame.lookAt(pos, look), Enum.Material.SmoothPlastic, if s[1] == "HostSeat" then SEAT_BLUE else SEAT_RED, "Seat")
	end
	local gui = Instance.new("BillboardGui")
	gui.Size, gui.StudsOffset, gui.MaxDistance = UDim2.fromOffset(220, 50), Vector3.new(0, 5, 0), 140
	local label = Instance.new("TextLabel")
	label.Size, label.BackgroundTransparency = UDim2.fromScale(1, 1), 1
	label.Font, label.TextScaled, label.TextColor3 = Enum.Font.GothamBlack, true, accent
	label.TextStrokeTransparency = 0.3
	label.Text = if ffa then "1v1v1v1 (2-4 players)" else "1v1"
	label.Parent = gui
	gui.Parent = top
	model.PrimaryPart = top
	model.Parent = tablesFolder
end
task.wait()

-- Sakura garden: a path from the spawn gap (0 degrees) out to a clearing with one cherry tree -------
local SAKURA_R, GARDEN_RADIUS = 96, 15
local sakuraCenter = polar(0, SAKURA_R, 0)
local fGarden = folder("SakuraGarden")
local gardenPathLen = SAKURA_R - GARDEN_RADIUS - PLAZA_RADIUS + 2
part(fGarden, "Path", Vector3.new(6, 0.22, gardenPathLen), CFrame.lookAt(polar(0, PLAZA_RADIUS - 1 + gardenPathLen / 2, 0.11), Vector3.new(0, 0.11, 0)), Enum.Material.Cobblestone, PATH)
cyl(fGarden, "Edge", sakuraCenter + Vector3.new(0, 0.125, 0), GARDEN_RADIUS + 1.2, 0.25, Enum.Material.Slate, DARK_STONE)
cyl(fGarden, "Floor", sakuraCenter + Vector3.new(0, 0.15, 0), GARDEN_RADIUS, 0.3, Enum.Material.Cobblestone, STONE)
fLamps = fGarden -- lamp() parents into this
for _, a in { -25, 25 } do lamp(sakuraCenter + polar(180 + a, GARDEN_RADIUS - 1, 0.3)) end -- either side of the entrance
local assets = game:GetService("ServerStorage"):FindFirstChild("LobbyAssets")
assert(assets and assets:FindFirstChild("SakuraTree") and assets:FindFirstChild("BlockyTreePack"), "ServerStorage.LobbyAssets needs SakuraTree and BlockyTreePack (see jobs/2026-11-21-lobby/methods.md)")
-- Free models get placed by bounding box: scale, turn, then lift so the lowest point sits on the ground.
local function place(source: Model, pos: Vector3, scale: number, yaw: number, parent: Instance): Model
	local m = source:Clone()
	m:ScaleTo(m:GetScale() * scale)
	m:PivotTo(CFrame.new(pos) * CFrame.Angles(0, yaw, 0))
	local cf, size = m:GetBoundingBox()
	m:PivotTo(m:GetPivot() + Vector3.new(0, pos.Y - (cf.Position.Y - size.Y / 2), 0))
	for _, d in m:GetDescendants() do
		if d:IsA("BasePart") then d.Anchored = true end
	end
	m.Parent = parent
	return m
end
local sakura = place((assets :: any).SakuraTree, sakuraCenter + Vector3.new(0, 0.3, 0), 0.45, math.rad(rng:NextNumber(0, 360)), fGarden)
-- Petals drifting down from the canopy.
local cloudCf, cloudSize = sakura:GetBoundingBox()
local petalCloud = part(fGarden, "PetalCloud", Vector3.new(cloudSize.X * 0.8, 1, cloudSize.Z * 0.8), CFrame.new(cloudCf.Position + Vector3.new(0, cloudSize.Y * 0.3, 0)), Enum.Material.SmoothPlastic, Color3.new())
petalCloud.Transparency, petalCloud.CanCollide, petalCloud.CanQuery, petalCloud.CastShadow = 1, false, false, false
local petals = Instance.new("ParticleEmitter")
petals.Color = ColorSequence.new(Color3.fromRGB(255, 190, 215), Color3.fromRGB(255, 225, 235))
petals.Size, petals.Transparency = NumberSequence.new(0.35), NumberSequence.new(0, 1)
petals.Lifetime, petals.Rate, petals.Speed = NumberRange.new(5, 7), 12, NumberRange.new(0.5, 1.5)
petals.Acceleration, petals.RotSpeed, petals.Rotation = Vector3.new(0.6, -2, 0.3), NumberRange.new(-90, 90), NumberRange.new(0, 360)
petals.Shape, petals.EmissionDirection = Enum.ParticleEmitterShape.Box, Enum.NormalId.Bottom
petals.Parent = petalCloud
task.wait()

-- Nature: trees and rocks on the grass, kept off the plaza, paths, table pads and the sakura garden --
local pathAngles = { 30, 90, 150, 210, 270, 330 }
local function clear(pos: Vector3, margin: number): boolean
	local flat = Vector3.new(pos.X, 0, pos.Z)
	if flat.Magnitude < PLAZA_RADIUS + 2 + margin then return false end
	if (flat - sakuraCenter).Magnitude < GARDEN_RADIUS + 8 + margin then return false end -- sakura clearing
	if flat.X > 0 and flat.X < SAKURA_R and math.abs(flat.Z) < 4 + margin then return false end -- sakura path
	for _, a in pathAngles do
		local dir = polar(a, 1, 0)
		local along = flat:Dot(dir)
		local side = (flat - dir * along).Magnitude
		if along > 0 and along < TABLE_RADIUS and side < 4 + margin then return false end -- path strip
		if (flat - dir * TABLE_RADIUS).Magnitude < PAD_RADIUS + 3 + margin then return false end -- table pad
	end
	return true
end
assert(not clear(Vector3.zero, 0) and not clear(polar(30, 40, 0), 0) and clear(polar(15, 45, 0), 0) and not clear(polar(0, 60, 0), 0) and not clear(sakuraCenter, 0), "clear() self-check")

local function scatter(count: number, minR: number, maxR: number, margin: number, make: (Vector3) -> ())
	local placed, tries = 0, 0
	while placed < count and tries < count * 40 do
		tries += 1
		local pos = polar(rng:NextNumber(0, 360), rng:NextNumber(minR, maxR), 0)
		if clear(pos, margin) then
			make(pos)
			placed += 1
		end
	end
end

-- Blocky Tree Pack: pick a kind (pines most often), random size and turn.
local pack = (assets :: any).BlockyTreePack
local KINDS = { pack["Pine Tree"], pack["Pine Tree"], pack["Pine Tree"], pack["Big Tree"], pack["Big Tree"], pack["Mini Tree"], pack["Bush"] }
local function tree(pos: Vector3, minScale: number, maxScale: number)
	place(KINDS[rng:NextInteger(1, #KINDS)], pos, rng:NextNumber(minScale, maxScale), rng:NextNumber(0, math.pi * 2), fTrees).Name = "Tree"
end
local function rock(pos: Vector3)
	local size = Vector3.new(rng:NextNumber(2, 5), rng:NextNumber(1.5, 3), rng:NextNumber(2, 5))
	local grey = rng:NextInteger(95, 140)
	local cf = CFrame.new(pos + Vector3.new(0, size.Y * 0.25, 0)) * CFrame.Angles(rng:NextNumber(-0.3, 0.3), rng:NextNumber(0, math.pi * 2), rng:NextNumber(-0.3, 0.3))
	part(fRocks, "Rock", size, cf, Enum.Material.Slate, Color3.fromRGB(grey, grey, grey + 5))
end
scatter(12, 32, 50, 5, function(p) tree(p, 0.6, 0.8) end) -- inner ring between the paths, kept small
scatter(45, 68, 115, 4, function(p) tree(p, 0.9, 1.3) end) -- outer woods around the lobby
task.wait()
scatter(28, 32, 110, 1, rock)
task.wait()

-- Invisible boundary: a tall see-through ring just past the outer woods ------------------------------
local WALL_RADIUS = 122
local fBoundary = folder("Boundary")
for i = 1, 48 do
	local a = i / 48 * math.pi * 2
	local pos = Vector3.new(math.cos(a) * WALL_RADIUS, 100, math.sin(a) * WALL_RADIUS)
	local w = part(fBoundary, "Wall", Vector3.new(2 * math.pi * WALL_RADIUS / 48 * 1.1, 200, 2), CFrame.lookAt(pos, Vector3.new(0, 100, 0)), Enum.Material.SmoothPlastic, Color3.new())
	w.Transparency, w.CastShadow = 1, false
end

-- Scenery beyond the wall (looks only, players can't reach it). Kept inside r=235: arena slot 0 would sit at z=300.
local fScenery = folder("Scenery")
local HILL = { Color3.fromRGB(75, 130, 60), Color3.fromRGB(90, 140, 65), Color3.fromRGB(70, 120, 58) }
for i = 1, 14 do -- grassy hills: big balls sunk into the ground, skipping the cliff side
	local d = rng:NextNumber(50, 80)
	local pos = polar(rng:NextNumber(-60, 160), rng:NextNumber(130 + d / 2, 230 - d / 2), -d * rng:NextNumber(0.25, 0.35))
	ball(fScenery, "Hill", pos, d, Enum.Material.Grass, HILL[rng:NextInteger(1, #HILL)])
end
-- Rocky cliff face on the far side (190-310 degrees), stacked tilted slabs, trees along the top.
fTrees, fRocks = fScenery, fScenery -- tree() and rock() parent into these from here on
local CLIFF_R = 175
for a = 190, 310, 4 do
	local h = rng:NextNumber(35, 55)
	local r = CLIFF_R + rng:NextNumber(-5, 5)
	for layer = 0, 2 do
		local grey = rng:NextInteger(100, 135)
		local size = Vector3.new(rng:NextNumber(14, 20), h * (1 - layer * 0.25), rng:NextNumber(14, 20))
		local cf = CFrame.new(polar(a, r + layer * 10, size.Y / 2 - 2)) * CFrame.Angles(rng:NextNumber(-0.08, 0.08), rng:NextNumber(0, math.pi * 2), rng:NextNumber(-0.08, 0.08))
		part(fScenery, "Cliff", size, cf, Enum.Material.Slate, Color3.fromRGB(grey, grey - 5, grey - 12))
	end
	if a % 12 == 2 then tree(polar(a, r + 6, h - 2), 1.3, 1.7) end
end
task.wait()
-- Extra trees and rocks between the wall and the hills/cliff.
scatter(55, 128, 165, 0, function(p) tree(p, 1.2, 1.7) end)
scatter(30, 128, 200, 0, rock)

-- Sunset lighting so the lamps stand out ------------------------------------------------------------
local Lighting = game:GetService("Lighting")
Lighting.ClockTime, Lighting.Brightness = 17.6, 1.6 -- 18.1 was already night with stars
Lighting.Ambient, Lighting.OutdoorAmbient = Color3.fromRGB(70, 55, 60), Color3.fromRGB(120, 95, 100)
Lighting.ColorShift_Top = Color3.fromRGB(255, 170, 110)
local atmo = Lighting:FindFirstChildOfClass("Atmosphere") or Instance.new("Atmosphere", Lighting)
atmo.Density, atmo.Haze, atmo.Glare = 0.38, 1.8, 0.6
atmo.Color, atmo.Decay = Color3.fromRGB(255, 180, 140), Color3.fromRGB(120, 80, 110)

lobby.Parent = workspace
print("Lobby built:", #lobby:GetDescendants(), "instances,", #tablesFolder:GetChildren(), "tables")
