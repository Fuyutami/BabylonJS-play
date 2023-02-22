const createScene = function () {
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
	camera.angularSensibilityX = 8000
	camera.angularSensibilityY = 8000
	camera.panningSensibility = 300
	camera.inertia = 0.98

	// prevRadius = camera.radius;
	// scene.beforeRender = () => {
	//     let ratio = 1;
	//     if (prevRadius != camera.radius) {
	//         ratio = prevRadius / camera.radius;
	//         prevRadius = camera.radius;
	//         camera.wheelPrecision *= ratio;

	//         camera.panningSensibility *= ratio;
	//     }
	// };

	camera.lowerRadiusLimit = 10
	camera.upperRadiusLimit = 40
	camera.useBouncingBehavior = true
	camera.bouncingBehavior.lowerRadiusTransitionRange = 2
	camera.bouncingBehavior.transitionDuration = 500

	// LIGHTS
	const ambientLight = new BABYLON.HemisphericLight(
		'light',
		new BABYLON.Vector3(2, 0, 0),
		scene
	)

	ambientLight.intensity = 0.7
	// const light1 = new BABYLON.DirectionalLight(
	// 	'DirectionalLight',
	// 	new BABYLON.Vector3(0, -0.5, 0.5),
	// 	scene
	// )

	// light1.intensity = 1

	// Create a debug mesh for the light
	// const lightSphere = BABYLON.MeshBuilder.CreateSphere(
	// 	'lightSphere',
	// 	{ diameter: 0.1 },
	// 	scene
	// )
	// lightSphere.position = light1.position

	// Attach the debug mesh to the light
	// lightSphere.parent = light1

	// SHADOWS
	// const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

	// ENVIRONMENT (helper)
	const env = scene.createDefaultEnvironment({
		skyboxSize: 50,
		groundSize: 50,
	})
	env.setMainColor(BABYLON.Color3.FromHexString('#91D2E7'))
	env
	env.ground.dispose()

	/////////////////////////////////////////////////////////////////////////////////////////////////////
	// MATERIALS

	// GROUND
	const matGround = new BABYLON.PBRMaterial('matGround', scene)
	matGround.albedoColor = new BABYLON.Color3.FromHexString('#797464')
	matGround.metallic = 0
	matGround.roughness = 1
	matGround.specularIntensity = 0.5

	// GRASS
	const matGrass = new BABYLON.PBRMaterial('matGrass', scene)
	matGrass.albedoColor = new BABYLON.Color3.FromHexString('#A4E749')
	matGrass.metallic = 0
	matGrass.roughness = 1
	matGrass.specularIntensity = 0.5

	// CLOUD
	const matCloud = new BABYLON.PBRMaterial('matCloud', scene)
	matCloud.albedoColor = new BABYLON.Color3.FromHexString('#E7E7E7')
	matCloud.metallic = 0
	matCloud.roughness = 0.5
	matCloud.specularIntensity = 0.5

	// WINDMILL
	const matWindmillTop = new BABYLON.PBRMaterial('matWindmillTop', scene)
	matWindmillTop.albedoColor = new BABYLON.Color3.FromHexString('#685850')
	matWindmillTop.metallic = 0
	matWindmillTop.roughness = 0.5
	matWindmillTop.specularIntensity = 0.5

	const matWindmillBot = new BABYLON.PBRMaterial('matWindmillBot', scene)
	matWindmillBot.albedoTexture = new BABYLON.Texture(
		'https://i.imgur.com/Q6i4ZiX.jpg',
		scene
	)
	matWindmillBot.metallic = 0
	matWindmillBot.roughness = 0.5
	matWindmillBot.specularIntensity = 0.5

	const windmillUV = []
	windmillUV[0] = new BABYLON.Vector4(0, 0, 0, 0)
	windmillUV[1] = new BABYLON.Vector4(0, 0, 0, 0)
	windmillUV[2] = new BABYLON.Vector4(0, 0, 0, 0)

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
		height: 4.5,
		diameterBottom: 3.35,
		diameterTop: 2.5,
		tessellation: 8,
		faceUV: windmillUV,
	})
	windmill.material = matWindmillBot
	windmill.convertToFlatShadedMesh()

	// const windmillTop = BABYLON.MeshBuilder.CreateSphere('windmillTop', {
	// 	segments: 2,
	// 	slice: 0.5,
	//     diameter: 2.7,
	// 	sideOrientation: BABYLON.Mesh.DOUBLESIDE,
	// })
	// windmillTop.material = matWindmillTop
	// windmillTop.convertToFlatShadedMesh()
	// windmillTop.position.y = 2

	return scene
}
