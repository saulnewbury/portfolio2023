// NOISE
import { browser } from '$app/environment'
import { gsap } from 'gsap'

import * as THREE from 'three'
import noiseVertexShader from '$lib/noise/shaders/vertex.glsl'
import noiseVertexShader1 from '$lib/noise/shaders/vertex1.glsl'
import noiseFragmentShader from '$lib/noise/shaders/fragment.glsl'
import noiseFragmentShader1 from '$lib/noise/shaders/fragment1.glsl'
import { DotScreenShader } from '$lib/custom-shader/customShader'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export let loadingSequenceComplete = false
export let increment = 0.05
export let eggBuilt = false

let camera, renderer, composer, eggMesh, sphereMesh
let eggGeometry, materialFresnel, controls, ovlyOne, ovlyTwo

let sizes

const scaleAmount = 0.4

const scene = new THREE.Scene()
const clock = new THREE.Clock()

if (browser) {
	sizes = {
		width: window.innerWidth,
		height: window.innerHeight
	}

	/**
	 * Sizes
	 */
	window.addEventListener('resize', () => {
		// Update sizes
		sizes.width = window.innerWidth
		sizes.height = window.innerHeight

		// Update camera
		camera.aspect = sizes.width / sizes.height
		camera.updateProjectionMatrix()

		// Update renderer
		renderer.setSize(sizes.width, sizes.height)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		if (loadingSequenceComplete) {
			gsap.set(eggMesh.scale, {
				y: window.innerWidth / 22.6 / 100,
				x: window.innerWidth / 22.6 / 100,
				z: window.innerWidth / 22.6 / 100,
				onComplete: () => {
					console.log('yeah man')
				}
			})
			gsap.set(eggMesh.position, {
				// y: (window.innerHeight - window.innerWidth) / 26.6 / 50
			})
		}
	})

	/**
	 * Perspective Camera
	 */
	camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 100)
	camera.position.set(0, -0.0, 3)
	scene.add(camera)
}

/**
 * Cube Camera
 */

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
	format: THREE.RGBAFormat,
	generateMipmaps: true,
	minFilter: THREE.LinearMipMapLinearFilter,
	colorSpace: THREE.SRGBColorSpace
})

const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget)

/**
 * Egg
 */
export function composeEgg() {
	// points - (x, y) pairs are rotated around the y-axis
	let rad
	let points = []
	scene.remove(eggMesh)

	for (let deg = 0; deg <= 180; deg += 6) {
		rad = ((Math.PI * deg) / 180) * increment

		const point = new THREE.Vector2(
			(0.72 + 0.08 * Math.cos(rad)) * Math.sin(rad) * scaleAmount,
			-Math.cos(rad) * scaleAmount
		) // the "egg equation"

		// x-coord should be greater than zero to avoid degenerate
		// triangles; it is not in this formula.

		points.push(point)
	}

	if (increment <= 1) {
		const multiplier = increment < 5 ? increment * 2.5 : 0.5
		increment += 0.01 * multiplier
		setTimeout(composeEgg, 10)
	} else {
		zoom()
	}

	eggGeometry = new THREE.LatheGeometry(points, 32)

	materialFresnel = new THREE.ShaderMaterial({
		vertexShader: noiseVertexShader1,
		fragmentShader: noiseFragmentShader1,
		side: THREE.DoubleSide,
		uniforms: {
			uTime: { value: 0 },
			tCube: cubeRenderTarget.texture
		},
		transparent: true,
		opacity: 0
	})

	eggMesh = new THREE.Mesh(eggGeometry, materialFresnel)
	scene.add(eggMesh)
	points = []
	eggBuilt = true
}

/**
 * Sphere
 */

const sphereGeometry = new THREE.SphereGeometry(4, 32, 32)

const material = new THREE.ShaderMaterial({
	vertexShader: noiseVertexShader,
	fragmentShader: noiseFragmentShader,
	side: THREE.DoubleSide,
	uniforms: {
		uTime: { value: 0 }
	}
})

sphereMesh = new THREE.Mesh(sphereGeometry, material)
scene.add(sphereMesh)

/**
 * Get eggMesh
 */

export function getEggMesh() {
	return eggMesh
}
export function getSphereMesh() {
	return sphereMesh
}

/**
 * INITIALISE
 */
export function initialiseThreeJSScene(canvas, overlayOne, overlayTwo) {
	ovlyOne = overlayOne
	ovlyTwo = overlayTwo

	// Renderer
	renderer = new THREE.WebGLRenderer({
		canvas: canvas
	})
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

	//Post processing
	composer = new EffectComposer(renderer)
	composer.addPass(new RenderPass(scene, camera))

	const effect1 = new ShaderPass(DotScreenShader)
	effect1.uniforms['scale'].value = 4
	composer.addPass(effect1)

	composer.setSize(sizes.width, sizes.height)

	/**
	 * controls
	 */
	controls = new OrbitControls(camera, canvas)
	controls.enableDamping = true
	controls.update()
	composeEgg()
	tick()
}

/**
 * Lights
 */

// scene.add(new THREE.AmbientLight(0xffffff, 0.86))
// let dirLight = new THREE.DirectionalLight(0x000000, 1)
// dirLight.position.set(10, 10, 10)
// scene.add(dirLight)

/**
 * TICK
 */

export function tick() {
	const elapsedTime = clock.getElapsedTime()
	// Update Material
	material.uniforms.uTime.value = elapsedTime * 0.7 // .5

	controls.update()

	// Update cube camera
	eggMesh.visible = false
	cubeCamera.update(renderer, scene)
	eggMesh.visible = true
	materialFresnel.uniforms.tCube.value = cubeRenderTarget.texture

	// Render
	renderer.render(scene, camera)
	composer.render(scene, camera)

	// Call tick again on the next frame
	window.requestAnimationFrame(tick)
}

/**
 * Intro animation
 */
function zoom() {
	let screenY = 75 + (8.6 * window.innerWidth) / 100
	let scaledY = screenY / (window.innerHeight / 2)
	console.log('screenY', screenY)
	let v = new THREE.Vector3(0, 1 - scaledY, 0)
	const r = new THREE.Raycaster()
	r.setFromCamera(v, camera)
	const plane = new THREE.Plane(new THREE.Vector3(0.0, 0.0, 1.0))
	const result = new THREE.Vector3()
	const p = r.ray.intersectPlane(plane, result)
	console.log('result', p, result.y)
	let hasRun = false
	console.log(eggMesh.position)
	setTimeout(() => {
		gsap.to(eggMesh.position, {
			// z: 1.1,
			// y: 0.55,
			y: result.y, //window.innerWidth / 26.6 / 100,
			delay: 0.5,
			duration: 1.8,
			ease: 'power2.inOut',
			onComplete: () => {
				console.log('whats going on')
			}
		})
		console.log(window.innerWidth / 26.6 / 100)
		gsap.to(eggMesh.scale, {
			// y: 0.65,
			// x: 0.65,
			// z: 0.65,
			y: window.innerWidth / 22.6 / 100,
			x: window.innerWidth / 22.6 / 100,
			z: window.innerWidth / 22.6 / 100,
			delay: 0.5,
			duration: 1.8,
			ease: 'power2.inOut',
			onComplete: () => {
				console.log('whats going on')
			}
		})
	}, 0)

	gsap.to(ovlyOne, {
		opacity: 0,
		delay: 0.5,
		duration: 1.8,
		ease: 'power2.inOut'
	})

	const tween = gsap.to(ovlyTwo, {
		opacity: 0.6,
		delay: 0.5,
		duration: 1.8,
		ease: 'power2.inOut',
		onUpdate: () => {
			if (hasRun) return
			if (tween.progress() >= 0.555) {
				loadingSequenceComplete = true
				hasRun = true
			}
		}
	})
}
