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

-- Nature: trees and rocks on the grass, kept off the plaza, paths and table pads ------------------
local pathAngles = { 30, 90, 150, 210, 270, 330 }
local function clear(pos: Vector3, margin: number): boolean
	local flat = Vector3.new(pos.X, 0, pos.Z)
	if flat.Magnitude < PLAZA_RADIUS + 2 + margin then return false end
	for _, a in pathAngles do
		local dir = polar(a, 1, 0)
		local along = flat:Dot(dir)
		local side = (flat - dir * along).Magnitude
		if along > 0 and along < TABLE_RADIUS and side < 4 + margin then return false end -- path strip
		if (flat - dir * TABLE_RADIUS).Magnitude < PAD_RADIUS + 3 + margin then return false end -- table pad
	end
	return true
end
assert(not clear(Vector3.zero, 0) and not clear(polar(30, 40, 0), 0) and clear(polar(0, 45, 0), 0), "clear() self-check")

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

local LEAVES = { Color3.fromRGB(60, 130, 60), Color3.fromRGB(80, 150, 70), Color3.fromRGB(50, 110, 55) }
local function tree(pos: Vector3)
	local m = Instance.new("Model")
	m.Name = "Tree"
	local h = rng:NextNumber(8, 12)
	cyl(m, "Trunk", pos + Vector3.new(0, h / 2, 0), rng:NextNumber(0.7, 1.1), h, Enum.Material.Wood, Color3.fromRGB(105, 70, 45))
	for _ = 1, 3 do
		local offset = Vector3.new(rng:NextNumber(-2, 2), rng:NextNumber(-0.5, 2), rng:NextNumber(-2, 2))
		local leaf = ball(m, "Leaves", pos + Vector3.new(0, h, 0) + offset, rng:NextNumber(6, 9), Enum.Material.Grass, LEAVES[rng:NextInteger(1, #LEAVES)])
		leaf.CanCollide = false -- players walk through foliage instead of snagging on it
	end
	m.Parent = fTrees
end
local function rock(pos: Vector3)
	local size = Vector3.new(rng:NextNumber(2, 5), rng:NextNumber(1.5, 3), rng:NextNumber(2, 5))
	local grey = rng:NextInteger(95, 140)
	local cf = CFrame.new(pos + Vector3.new(0, size.Y * 0.25, 0)) * CFrame.Angles(rng:NextNumber(-0.3, 0.3), rng:NextNumber(0, math.pi * 2), rng:NextNumber(-0.3, 0.3))
	part(fRocks, "Rock", size, cf, Enum.Material.Slate, Color3.fromRGB(grey, grey, grey + 5))
end
scatter(12, 32, 50, 5, tree) -- inner ring between the paths
scatter(45, 68, 115, 4, tree) -- outer woods around the lobby
task.wait()
scatter(28, 32, 110, 1, rock)

lobby.Parent = workspace
print("Lobby built:", #lobby:GetDescendants(), "instances,", #tablesFolder:GetChildren(), "tables")
