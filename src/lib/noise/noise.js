// NOISE

import * as THREE from 'three'
import { gsap } from 'gsap'
import { scrollTrigger } from 'gsap/dist/ScrollTrigger'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import noiseVertexShader from '$lib/noise/shaders/vertex.glsl'
import noiseVertexShader1 from '$lib/noise/shaders/vertex1.glsl'
import noiseFragmentShader from '$lib/noise/shaders/fragment.glsl'
import noiseFragmentShader1 from '$lib/noise/shaders/fragment1.glsl'
import { DotScreenShader } from '$lib/custom-shader/customShader'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

import image from '$lib/images/me.jpg'

// THREE.ColorManagement.enabled = false

let mousedown = false

export let eggBuilt = false

export function initialiseThreeJSScene(canvas, overlayOne, overlayTwo) {
  const cursor = {
    x: 0,
    y: 0
  }

  window.addEventListener('mousedown', (e) => {
    mousedown = true
  })

  window.addEventListener('mouseup', (e) => {
    mousedown = false
  })

  window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = -(e.clientY / sizes.height - 0.5)

    handleMousemove()
  })

  // Scene
  const scene = new THREE.Scene()

  /**
   * Geometries
   */

  // EGG

  // points - (x, y) pairs are rotated around the y-axis
  let points = []

  const scaleAmount = 0.4

  let rad
  let increment = 0.05

  let eggGeometry, eggMesh, materialFresnel

  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
    format: THREE.RGBAFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipMapLinearFilter,
    colorSpace: THREE.SRGBColorSpace
  })

  const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget)

  function composeEgg() {
    scene.remove(eggMesh)
    for (let deg = 0; deg <= 180; deg += 6) {
      rad = ((Math.PI * deg) / 180) * increment

      const point = new THREE.Vector2(
        (0.72 + 0.08 * Math.cos(rad)) * Math.sin(rad) * scaleAmount,
        -Math.cos(rad) * scaleAmount
      ) // the "egg equation"

      //console.log( point );
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

  // Sphere

  const sphereGeometry = new THREE.SphereGeometry(4, 32, 32)

  // Material
  const material = new THREE.ShaderMaterial({
    vertexShader: noiseVertexShader,
    fragmentShader: noiseFragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 }
    }
  })

  // Mesh
  const sphereMesh = new THREE.Mesh(sphereGeometry, material)
  scene.add(sphereMesh)

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

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
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    40,
    sizes.width / sizes.height,
    0.1,
    100
  )
  camera.position.set(0, -0.0, 3)
  scene.add(camera)

  // Controls
  // const controls = new OrbitControls(camera, canvas)
  // controls.enableDamping = true

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  /**
   * Post processing
   */
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const effect1 = new ShaderPass(DotScreenShader)
  effect1.uniforms['scale'].value = 4
  composer.addPass(effect1)

  composer.setSize(sizes.width, sizes.height)

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

  /**
   * Lights
   **/

  // Add a point light with #fff color, .7 intensity, and 0 distance
  var light = new THREE.PointLight(0xffffff, 1, 0)

  // Specify the light's position
  light.position.set(1, 1, 100)

  // Add the light to the scene
  scene.add(light)

  /**
   * Animations
   */

  let toBalance = false

  function handleMousemove() {
    let xTo = gsap.quickTo(eggMesh.position, 'x')
    let yTo = gsap.quickTo(eggMesh.position, 'y')
    if (!toBalance) {
      scaleEgg()
      toBalance = true
    }
    if (!mousedown) {
      xTo(-cursor.x * 0.22)
      yTo(-Math.abs(cursor.x * 0.1) + 0.1)
    }
  }

  function scaleEgg() {
    gsap.to(eggMesh.scale, { x: 0.25, duration: 1.5, ease: 'power4.inOut' })
    gsap.to(eggMesh.scale, { y: 0.25, duration: 1.5, ease: 'power4.inOut' })
    gsap.to(eggMesh.scale, { z: 0.25, duration: 1.5, ease: 'power4.inOut' })
    gsap.to(eggMesh.position, { y: 0.082, duration: 1.5, ease: 'power4.inOut' })
  }

  /**
   * Animate
   */

  const clock = new THREE.Clock()

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // Update Material
    material.uniforms.uTime.value = elapsedTime * 0.5 // .5

    // Update controls
    // controls.update()

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

  tick()
}
