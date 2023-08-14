// NOISE

import * as THREE from 'three'
import { gsap } from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import noiseVertexShader from '$lib/noise/shaders/vertex.glsl'
import noiseVertexShader1 from '$lib/noise/shaders/vertex1.glsl'
import noiseFragmentShader from '$lib/noise/shaders/fragment.glsl'
import noiseFragmentShader1 from '$lib/noise/shaders/fragment1.glsl'
import { DotScreenShader } from '$lib/custom-shader/customShader'

import image from '$lib/images/me.jpg'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

// THREE.ColorManagement.enabled = false

/**
 * Base
 */

export let eggBuilt = false

// const gui = new GUI()
export function initialiseThreeJSScene(canvas, overlayOne, overlayTwo) {
  // Scene
  const scene = new THREE.Scene()
  // scene.background = new THREE.Color('#0099ff')

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
      }
    })

    eggMesh = new THREE.Mesh(eggGeometry, materialFresnel)
    // eggMesh.rotation.z = Math.PI / 2
    scene.add(eggMesh)
    points = []
  }

  composeEgg()

  // SPHERE

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

  // PLANE

  const loader = new THREE.TextureLoader()

  const imageMaterial = new THREE.MeshLambertMaterial({
    map: loader.load(image),
    transparent: true,
    opacity: 0.0
  })

  // const planeGeometry = new THREE.PlaneGeometry(0.45, 0.45)
  const planeGeometry = new THREE.PlaneGeometry(0.45, 0.45)

  const planeMesh = new THREE.Mesh(planeGeometry, imageMaterial)
  planeMesh.position.z = 0.35
  scene.add(planeMesh)

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
  camera.position.set(0.05, -0.0, 3)
  // camera.position.set(0.05, -0.0, 1.3)
  scene.add(camera)

  // Controls
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  })
  // renderer.outputColorSpace = THREE.LinearSRGBColorSpace
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // materialFresnel.uniforms.tCube.value = cubeRenderTarget.texture

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
   * Animate
   */
  const clock = new THREE.Clock()

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // Update Material
    // material.uniforms.uTime.value = elapsedTime * 0.005
    material.uniforms.uTime.value = elapsedTime * 0.5 // .5

    // Update controls
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

  tick()
}
