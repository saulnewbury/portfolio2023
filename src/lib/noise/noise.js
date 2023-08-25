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

export let eggBuilt = false

let camera, renderer, composer, eggMesh, sphereMesh
let eggGeometry, materialFresnel, controls

let increment = 0.05
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
function composeEgg() {
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
    eggBuilt = true
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
}

composeEgg()

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
export function initialiseThreeJSScene(canvas) {
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
export function introAnim(overlayOne, overlayTwo) {
  gsap.to(camera.position, {
    z: 1.3,
    delay: 2.5,
    duration: 1.8,
    ease: 'power2.inOut'
  })

  gsap.to(overlayOne, {
    opacity: 0,
    delay: 2.5,
    duration: 1.8,
    ease: 'power2.inOut'
  })

  gsap.to(overlayTwo, {
    opacity: 0.6,
    delay: 2.5,
    duration: 1.8,
    ease: 'power2.inOut'
  })
}
