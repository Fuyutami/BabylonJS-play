const createScene = function () {
	// VARIABLES
	showHelpers = true

	// SCENE
	const scene = new BABYLON.Scene(engine)

	// CAMERA
	const camera = new BABYLON.ArcRotateCamera(
		'Camera',
		0,
		0,
		10,
		new BABYLON.Vector3(0, 0, 0),
		scene
	)
	camera.setPosition(new BABYLON.Vector3(30, 5, -30))
	camera.attachControl(canvas, true)

	camera.minZ = 0.01

	camera.wheelDeltaPercentage = 0.002
	camera.angularSensibilityX = 3000
	camera.angularSensibilityY = 3000
	camera.panningSensibility = 200
	camera.inertia = 0.98

	camera.lowerRadiusLimit = 10
	camera.upperRadiusLimit = 80 //40
	camera.useBouncingBehavior = true
	camera.bouncingBehavior.lowerRadiusTransitionRange = 2
	camera.bouncingBehavior.transitionDuration = 500

	// LIGHTS

	// ambient light
	const ambientLight = new BABYLON.HemisphericLight(
		'light',
		new BABYLON.Vector3(0, 0, 0),
		scene
	)
	ambientLight.intensity = 0.7

	// light 1
	const light1 = new BABYLON.DirectionalLight(
		'DirectionalLight',
		new BABYLON.Vector3(4, -5, 8),
		scene
	)

	light1.intensity = 5

	// light 2
	const light2 = new BABYLON.DirectionalLight(
		'DirectionalLight',
		new BABYLON.Vector3(-8, -5, -6),
		scene
	)

	light1.intensity = 5

	// SHADOWS
	// const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

	// ENVIRONMENT (helper)
	const env = scene.createDefaultEnvironment({
		skyboxSize: 50,
		groundSize: 50,
	})
	env.setMainColor(BABYLON.Color3.FromHexString('#78d2f0'))
	env.ground.dispose()

	/////////////////////////////////////////////////////////////////////////////////////////////////////
	// MATERIALS

	// GROUND
	const matGround = new BABYLON.PBRMaterial('matGround', scene)
	matGround.albedoColor = new BABYLON.Color3.FromHexString('#52492c')
	matGround.metallic = 0
	matGround.roughness = 1
	matGround.specularIntensity = 0.5

	// GRASS
	const matTree = new BABYLON.PBRMaterial('matTree', scene)
	matTree.albedoColor = new BABYLON.Color3.FromHexString('#196b0f')
	matTree.metallic = 0
	matTree.roughness = 0.5
	matTree.specularIntensity = 1

	//TREES
	const matGrass = new BABYLON.PBRMaterial('matGrass', scene)
	matGrass.albedoColor = new BABYLON.Color3.FromHexString('#558c0a')
	matGrass.metallic = 0
	matGrass.roughness = 0.5
	matGrass.specularIntensity = 1

	// CLOUD
	const matCloud = new BABYLON.PBRMaterial('matCloud', scene)
	matCloud.albedoColor = new BABYLON.Color3.FromHexString('#E7E7E7')
	matCloud.metallic = 0
	matCloud.roughness = 0.5
	matCloud.specularIntensity = 0.5

	// WINDMILL
	const matWindmillTop = new BABYLON.PBRMaterial('matWindmillTop', scene)
	matWindmillTop.albedoColor = new BABYLON.Color3.FromHexString('#372821')
	matWindmillTop.metallic = 0
	matWindmillTop.roughness = 0.5
	matWindmillTop.specularIntensity = 0.5

	const matWindmillBot = new BABYLON.PBRMaterial('matWindmillBot', scene)
	matWindmillBot.albedoTexture = new BABYLON.Texture(
		'https://raw.githubusercontent.com/Fuyutami/BabylonJS-play/master/texture.png',
		scene
	)
	matWindmillBot.metallic = 0
	matWindmillBot.roughness = 1
	// matWindmillBot.specularIntensity = 0.5

	const windmillUV = []
	windmillUV[0] = new BABYLON.Vector4(0, 0, 0.25, 1)
	windmillUV[1] = new BABYLON.Vector4(0.375, -0.35, 1.375, 1)
	windmillUV[2] = new BABYLON.Vector4(0, 0, 0.25, 1)

	// BLADES
	const matBlade = new BABYLON.PBRMaterial('matBlade', scene)
	matBlade.albedoColor = new BABYLON.Color3.FromHexString('#989272')
	matBlade.metallic = 0
	matBlade.roughness = 0.5
	matBlade.specularIntensity = 0.5

	////////////////////////////////////////////////////////////////////////////////////////////////////
	// GEOMETRY

	// GROUND
	const groundGeometry = {
		name: 'ground',
		vertex: [
			[-1.94, -5.45, -4.62],
			[5.52, -3.33, 0.51],
			[4.09, -0.16, -5.75],
			[5.48, 0.5, -2.61],
			[2.98, -6.49, -1.64],
			[0.29, -7.96, 0.43],
			[0.11, -4.35, 2.16],
			[-0.97, -8.86, -3.39],
			[2.86, -6.01, 1.59],
			[0.86, -3.63, 4.69],
			[-5.19, -4.25, 1.7],
			[0.17, -2.36, -6.25],
			[-1.77, 0.56, -5.1],
			[4.94, -1.46, 4.03],
			[-4.51, -0.19, 4.25],
			[-6.38, 0.48, 0.33],
		],
		face: [
			[5, 8, 6],
			[5, 7, 4],
			[1, 11, 2],
			[0, 10, 11],
			[2, 12, 3],
			[3, 12, 15],
			[15, 14, 3],
			[14, 13, 3],
			[14, 9, 13],
			[1, 3, 13],
			[1, 2, 3],
			[11, 12, 2],
			[11, 10, 12],
			[10, 15, 12],
			[10, 14, 15],
			[6, 9, 14],
			[9, 8, 13],
			[10, 6, 14],
			[6, 8, 9],
			[8, 1, 13],
			[4, 11, 1],
			[4, 7, 11],
			[7, 0, 11],
			[7, 10, 0],
			[7, 5, 10],
			[5, 6, 10],
			[1, 8, 4],
			[8, 5, 4],
		],
	}

	const ground = BABYLON.MeshBuilder.CreatePolyhedron(
		'ground',
		{ custom: groundGeometry },
		scene
	)
	ground.material = matGround
	ground.rotation.y = 1.7

	ground.position.z = 0.5

	ground.subMeshes = []
	const indices = ground.getIndices()
	const verticesCount = ground.getTotalVertices()

	ground.subMeshes.push(
		new BABYLON.SubMesh(0, 0, verticesCount, 0, indices.length, ground)
	)
	ground.subMeshes.push(
		new BABYLON.SubMesh(1, 0, verticesCount, 12, 12, ground)
	)

	ground.material = new BABYLON.MultiMaterial('multi', scene)
	ground.material.subMaterials.push(matGround)
	ground.material.subMaterials.push(matGrass)

	// TREES
	const tree = BABYLON.MeshBuilder.CreateIcoSphere(
		'tree',
		{ radius: 1, subdivisions: 1 },
		scene
	)
	tree.material = matTree
	tree.convertToFlatShadedMesh()
	tree.position = new BABYLON.Vector3(-3.5, 0.5, -2.5)

	const tree2 = tree.createInstance('tree2')
	tree2.position = new BABYLON.Vector3(-2.4, 0.5, -2.4)
	tree2.scaling = new BABYLON.Vector3(0.6, 0.6, 0.6)
	tree2.rotation = new BABYLON.Vector3(2, 1, 1)

	const tree3 = tree.createInstance('tree3')
	tree3.position = new BABYLON.Vector3(2, -0.6, -3.2)
	tree3.scaling = new BABYLON.Vector3(0.9, 0.9, 0.9)
	tree3.rotation = new BABYLON.Vector3(1.8, 1, 1)

	const tree4 = tree.createInstance('tree4')
	tree4.position = new BABYLON.Vector3(2.8, -0.9, -2.8)
	tree4.scaling = new BABYLON.Vector3(0.35, 0.35, 0.35)
	tree4.rotation = new BABYLON.Vector3(1.8, 1, 1)

	const tree5 = tree.createInstance('tree5')
	tree5.position = new BABYLON.Vector3(2, 0, 3)
	tree5.scaling = new BABYLON.Vector3(1, 1, 1)
	tree5.rotation = new BABYLON.Vector3(1.8, 1, 1)

	const tree6 = tree.createInstance('tree6')
	tree6.position = new BABYLON.Vector3(1.5, 0.2, 2.28)
	tree6.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5)
	tree6.rotation = new BABYLON.Vector3(1, 1, 1)

	const tree7 = tree.createInstance('tree7')
	tree7.position = new BABYLON.Vector3(2.4, 0, 3.4)
	tree7.scaling = new BABYLON.Vector3(0.7, 0.7, 0.7)
	tree7.rotation = new BABYLON.Vector3(1, 1.7, 1)

	// CLOUDS
	const cloud = BABYLON.MeshBuilder.CreateSphere(
		'cloud',
		{ diameter: 11 },
		scene
	)
	cloud.material = matCloud
	cloud.position = new BABYLON.Vector3(-6.7, 2.6, 6.7)

	const cloud2 = cloud.createInstance('cloud2')
	cloud2.position = new BABYLON.Vector3(-8.5, -1.4, 2.2)
	cloud2.scaling = new BABYLON.Vector3(0.7, 0.7, 0.7)

	const cloud3 = cloud.createInstance('cloud3')
	cloud3.position = new BABYLON.Vector3(-7.2, -3.2, -2)
	cloud3.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4)

	const cloud4 = cloud.createInstance('cloud4')
	cloud4.position = new BABYLON.Vector3(-0.2, -0.7, 8.5)
	cloud4.scaling = new BABYLON.Vector3(0.7, 0.7, 0.7)

	const cloud5 = cloud.createInstance('cloud5')
	cloud5.position = new BABYLON.Vector3(3.6, -1.7, 9.7)
	cloud5.scaling = new BABYLON.Vector3(0.45, 0.45, 0.45)

	const cloud6 = cloud.createInstance('cloud6')
	cloud6.position = new BABYLON.Vector3(3, -3.6, 5.6)
	cloud6.scaling = new BABYLON.Vector3(0.54, 0.54, 0.54)

	const cloud7 = cloud.createInstance('cloud7')
	cloud7.position = new BABYLON.Vector3(3.4, -5, 2.8)
	cloud7.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3)

	const cloud8 = cloud.createInstance('cloud8')
	cloud8.position = new BABYLON.Vector3(4.3, -5.4, 0.8)
	cloud8.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2)

	const cloud9 = cloud.createInstance('cloud9')
	cloud9.position = new BABYLON.Vector3(4.6, -3.6, 0.7)
	cloud9.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1)

	const cloud10 = cloud.createInstance('cloud10')
	cloud10.position = new BABYLON.Vector3(-0.1, -5, -5.8)
	cloud10.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2)

	const cloud11 = cloud.createInstance('cloud11')
	cloud11.position = new BABYLON.Vector3(1.1, -5.6, -5.4)
	cloud11.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3)

	const cloud12 = cloud.createInstance('cloud12')
	cloud12.position = new BABYLON.Vector3(2.5, -6.2, -5.3)
	cloud12.scaling = new BABYLON.Vector3(0.16, 0.16, 0.16)

	const cloud13 = cloud.createInstance('cloud13')
	cloud13.position = new BABYLON.Vector3(0.4, 6.1, 10.4)
	cloud13.scaling = new BABYLON.Vector3(0.15, 0.15, 0.15)

	const cloud14 = cloud.createInstance('cloud14')
	cloud14.position = new BABYLON.Vector3(1.7, 5.9, 11.5)
	cloud14.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3)

	const cloud15 = cloud.createInstance('cloud15')
	cloud15.position = new BABYLON.Vector3(2.4, 5.1, 12.3)
	cloud15.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2)

	const cloud16 = cloud.createInstance('cloud16')
	cloud16.position = new BABYLON.Vector3(3.1, 4.2, 12.7)
	cloud16.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1)

	// WINDMILL
	// base
	const windmill = BABYLON.MeshBuilder.CreateCylinder('windmill', {
		height: 4,
		diameterBottom: 3.35,
		diameterTop: 2.5,
		tessellation: 8,
		faceUV: windmillUV,
	})
	windmill.material = matWindmillBot
	windmill.convertToFlatShadedMesh()
	windmill.position.x = -1
	windmill.position.z = 1
	windmill.position.y = 1.2
	windmill.rotation.y = -0.35

	const windmillTopShape = [
		new BABYLON.Vector3(0, 0, 0),
		new BABYLON.Vector3(0.6, 0, 0),
		new BABYLON.Vector3(0.6, 0.6, 0),
		new BABYLON.Vector3(0.5, 0.8, 0),
		new BABYLON.Vector3(0.3, 1, 0),
		new BABYLON.Vector3(0, 1.2, 0),
	]
	const windmillTop = BABYLON.MeshBuilder.CreateLathe('lathe', {
		shape: windmillTopShape,
		radius: 2.2,
		tessellation: 8,
		sideOrientation: BABYLON.Mesh.DOUBLESIDE,
	})
	windmillTop.convertToFlatShadedMesh()
	windmillTop.material = matWindmillTop
	windmillTop.position.y = 2
	windmillTop.parent = windmill

	// wheel
	const bladeShape = [
		new BABYLON.Vector3(0, 0, 0),
		new BABYLON.Vector3(0.2, 0, 0),
		new BABYLON.Vector3(0.2, 0, 5),
		new BABYLON.Vector3(-0.8, 0, 5),
		new BABYLON.Vector3(-0.8, 0, 1),
		new BABYLON.Vector3(0, 0, 1),
		new BABYLON.Vector3(0, 0, 0),
	]

	const holes = (() => {
		const allHoles = []

		const columns = 10
		const rows = 2
		const gap = 0.4

		const firstHole = [
			new BABYLON.Vector3(0, 0, 1.1),
			new BABYLON.Vector3(-0.2, 0, 1.1),
			new BABYLON.Vector3(-0.2, 0, 1.3),
			new BABYLON.Vector3(0, 0, 1.3),
			new BABYLON.Vector3(0, 0, 1.1),
		]

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				const rowHole = firstHole.map((v) => {
					return v.add(new BABYLON.Vector3(-(i * gap), 0, j * gap))
				})
				allHoles.push(rowHole)
			}
		}

		console.log(allHoles)
		return allHoles
	})()

	console.log(holes)

	const blade = BABYLON.MeshBuilder.ExtrudePolygon('polygon', {
		shape: bladeShape,
		holes: holes,
		depth: 0.1,
		sideOrientation: BABYLON.Mesh.DOUBLESIDE,
	})
	blade.material = matBlade

	const blades = createCircularArray(
		blade,
		4,
		0.3,
		new BABYLON.Vector3(0, 0, 0)
	)
	const wheelCenter = BABYLON.MeshBuilder.CreateCylinder(
		'wheelCenter',
		{ height: 1, diameter: 1, tessellation: 8 },
		scene
	)
	wheelCenter.position = new BABYLON.Vector3(0, 0.3, 0)
	wheelCenter.material = matBlade
	wheelCenter.convertToFlatShadedMesh()
	const wheel = new BABYLON.TransformNode('transformNode', scene)
	blades.parent = wheel
	wheelCenter.parent = wheel

	wheel.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4)
	wheel.setAbsolutePosition(new BABYLON.Vector3(0, 3.5, 0), true)
	wheel.rotation = new BABYLON.Vector3(0, Math.PI / 4, Math.PI / 2)

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ANIMATION

	scene.registerBeforeRender(function () {
		wheel.rotate(BABYLON.Axis.Y, Math.PI / 150, BABYLON.Space.LOCAL)
	})

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FUNCTIONS

	function createCircularArray(mesh, count, radius, origin) {
		mesh.isVisible = false // hide the original mesh
		var instances = []
		for (var i = 0; i < count; i++) {
			var angle = (i / count) * 2 * Math.PI
			var x = origin.x + radius * Math.cos(angle)
			var z = origin.z + radius * Math.sin(angle)
			var instance = mesh.createInstance('instance' + i)
			instance.position = new BABYLON.Vector3(x, origin.y, z)
			instance.lookAt(origin) // rotate towards the center of the circle
			instance.rotation.x = Math.PI
			instances.push(instance)
		}

		var transformNode = new BABYLON.TransformNode('transformNode', scene)
		instances.forEach(function (instance) {
			instance.parent = transformNode
		})

		return transformNode
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// GUI and other helpers

	//GUI
	const oldgui = document.getElementById('datGUI')
	if (oldgui != null) {
		oldgui.remove()
	}

	if (showHelpers) {
		const gui = new dat.GUI()
		gui.domElement.style.marginTop = '100px'
		gui.domElement.id = 'datGUI'

		const options = {
			grassColor: '#558c0a',
			matGroundColor: '#52492c',
			matTreeColor: '#196b0f',
			matCloudColor: '#E7E7E7',
			matWindmillTopColor: '#372821',
			matBladeColor: '#989272',
			grassRoughness: 0.5,
			matGroundRoughness: 1,
			matTreeRoughness: 0.5,
			matCloudRoughness: 1,
			matWindmillTopRoughness: 1,
			matWindmillBottomRoughness: 1,
			matBladeRoughness: 0.5,
			environmentColor: '#78d2f0',
		}

		const grassFolder = gui.addFolder('Grass Material')

		grassFolder
			.addColor(options, 'grassColor')
			.name('Color')
			.onChange(function (value) {
				matGrass.albedoColor = new BABYLON.Color3.FromHexString(value)
			})
		grassFolder
			.add(options, 'grassRoughness', 0, 1)
			.name('Roughness')
			.onChange(function (value) {
				matGrass.roughness = value
			})

		const groundFolder = gui.addFolder('Ground Material')

		groundFolder
			.addColor(options, 'matGroundColor')
			.name('Color')
			.onChange(function (value) {
				matGround.albedoColor = new BABYLON.Color3.FromHexString(value)
			})
		groundFolder
			.add(options, 'matGroundRoughness', 0, 1)
			.name('Roughness')
			.onChange(function (value) {
				matGround.roughness = value
			})

		const treeFolder = gui.addFolder('Tree Material')

		treeFolder
			.addColor(options, 'matTreeColor')
			.name('Color')
			.onChange(function (value) {
				matTree.albedoColor = new BABYLON.Color3.FromHexString(value)
			})
		treeFolder
			.add(options, 'matTreeRoughness', 0, 1)
			.name('Roughness')
			.onChange(function (value) {
				matTree.roughness = value
			})

		const cloudFolder = gui.addFolder('Cloud Material')

		cloudFolder
			.addColor(options, 'matCloudColor')
			.name('Color')
			.onChange(function (value) {
				matCloud.albedoColor = new BABYLON.Color3.FromHexString(value)
			})
		cloudFolder
			.add(options, 'matCloudRoughness', 0, 1)
			.name('Roughness')
			.onChange(function (value) {
				matCloud.roughness = value
			})

		const windmillFolder = gui.addFolder('Windmill Material')

		windmillFolder
			.addColor(options, 'matWindmillTopColor')
			.name('Top Color')
			.onChange(function (value) {
				matWindmillTop.albedoColor = new BABYLON.Color3.FromHexString(value)
			})
		windmillFolder
			.add(options, 'matWindmillTopRoughness', 0, 1)
			.name('Top Roughness')
			.onChange(function (value) {
				matWindmillTop.roughness = value
			})
		windmillFolder
			.add(options, 'matWindmillBottomRoughness', 0, 1)
			.name('Bottom Roughness')
			.onChange(function (value) {
				matWindmillBottom.roughness = value
			})

		const bladeFolder = gui.addFolder('Blade Material')
		bladeFolder
			.addColor(options, 'matBladeColor')
			.name('Color')
			.onChange(function (value) {
				matBlade.albedoColor = new BABYLON.Color3.FromHexString(value)
			})
		bladeFolder
			.add(options, 'matBladeRoughness', 0, 1)
			.name('Roughness')
			.onChange(function (value) {
				matBlade.roughness = value
			})

		gui
			.addColor(options, 'environmentColor')
			.name('Sky color')
			.onChange(function (value) {
				env.setMainColor(BABYLON.Color3.FromHexString(value))
			})

		// AXES
		// const localAxes = new BABYLON.AxesViewer(scene, 10)

		// DEBUG MESHES

		//debug mesh for light 1
		const lightSphere1 = BABYLON.MeshBuilder.CreateSphere(
			'lightSphere1',
			{ diameter: 1 },
			scene
		)
		lightSphere1.position = light1.position
		lightSphere1.parent = light1

		//debug mesh for light 2
		const lightSphere2 = BABYLON.MeshBuilder.CreateSphere(
			'lightSphere2',
			{ diameter: 1 },
			scene
		)
		lightSphere2.position = light2.position
		lightSphere2.parent = light2
	}

	return scene
}
