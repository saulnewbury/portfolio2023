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

import image from '$lib/images/egg-text.png'

export let eggBuilt = false

let camera, renderer, composer, eggMesh, sphereMesh
let eggGeometry, materialFresnel, controls, texture

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

  /**
   * Get Image
   */
  texture = new THREE.TextureLoader().load(image)
  texture.wrapS = 1000
  texture.wrapT = 1000
  texture.repeat.set(1, 1)
  texture.offset.setX(0.5)
  texture.flipY = false
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

scene.add(new THREE.AmbientLight(0xffffff, 0.86))
let dirLight = new THREE.DirectionalLight(0x000000, 1)
dirLight.position.set(10, 10, 10)
scene.add(dirLight)

/**
 * TICK
 */
// let time = 0.0001
export function tick() {
  const elapsedTime = clock.getElapsedTime()
  // time += 0.0001
  // Update Material
  material.uniforms.uTime.value = elapsedTime * 0.7 // .5

  controls.update()

  // Update cube camera
  eggMesh.visible = false
  cubeCamera.update(renderer, scene)
  eggMesh.visible = true
  materialFresnel.uniforms.tCube.value = cubeRenderTarget.texture

  frontMaterial.map.offset.setX(elapsedTime * 0.05)
  finalMesh.rotateY(0.0059)

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

/**
 * RIBBON
 */

const frontMaterial = new THREE.MeshStandardMaterial({
  map: texture,
  side: THREE.BackSide,
  roughness: 0.65,
  metalness: 0.25,
  alphaTest: true
})

// sphere
let rad = 1.6

// line/curve
let num = 6
let curvePoints = []

for (let i = 0; i < num; i++) {
  let theta = (i / num) * Math.PI * 2

  curvePoints.push(
    new THREE.Vector3().setFromSphericalCoords(
      rad,
      Math.PI / 2 + 0.1 * (Math.random() - 0.5),
      theta
    )
  )
}

const curve = new THREE.CatmullRomCurve3(curvePoints)
curve.tension = 10
curve.closed = true

const points = curve.getPoints(50)
const geometry = new THREE.BufferGeometry().setFromPoints(points)
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0xff0000,
  transparent: true,
  opacity: 0
})

// Create the final object to add to the scene
const curveObject = new THREE.Line(geometry, lineMaterial)

scene.add(curveObject)

let number = 1000
// Use curve to compute a number of frenet frames
let frenetFrames = curve.computeFrenetFrames(number, true)
// Get sequence of points - points from which the frenet frames are drawn
let spacedPoints = curve.getSpacedPoints(number)
// Create a plane with a corresponding number of width segments
let tempPlane = new THREE.PlaneGeometry(1, 1, number, 1)

// create dimensions
let dimensions = [-0.022, 0.022]

let point = new THREE.Vector3()
let binormalShift = new THREE.Vector3()

let finalPoints = []

dimensions.forEach((d) => {
  for (let i = 0; i <= number; i++) {
    point = spacedPoints[i]
    binormalShift.add(frenetFrames.binormals[i]).multiplyScalar(d)

    finalPoints.push(new THREE.Vector3().copy(point).add(binormalShift))
  }
})

finalPoints[0].copy(finalPoints[number])
finalPoints[number + 1].copy(finalPoints[2 * number + 1])

tempPlane.setFromPoints(finalPoints)

export let finalMesh = new THREE.Mesh(tempPlane, frontMaterial)
finalMesh.position.set(0, -2, -1.6)
scene.add(finalMesh)
