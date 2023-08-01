// NOISE

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import noiseVertexShader from '$lib/noise/shaders/vertex.glsl'
import noiseVertexShader1 from '$lib/noise/shaders/vertex1.glsl'
import noiseFragmentShader from '$lib/noise/shaders/fragment.glsl'
import noiseFragmentShader1 from '$lib/noise/shaders/fragment1.glsl'
import { DotScreenShader } from '$lib/custom-shader/customShader'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

/**
 * Base
 */

export function initialiseThreeJSScene(canvas) {
  // Scene
  const scene = new THREE.Scene()
  // scene.background = new THREE.Color('#0099ff')

  /**
   * Geometries
   */
  const sphereGeometry = new THREE.SphereGeometry(4, 32, 32)
  const smallSphereGeo = new THREE.SphereGeometry(0.4, 100, 100)

  // points - (x, y) pairs are rotated around the y-axis
  const points = []

  const scaleAmount = 0.4

  let rad
  let increment = 0.05

  let eggGeometry

  function composeEgg() {
    for (let deg = 0; deg <= 180; deg += 6) {
      rad = ((Math.PI * deg) / 180) * increment

      const point = new THREE.Vector2(
        (0.72 + 0.08 * Math.cos(rad)) * Math.sin(rad) * scaleAmount,
        -Math.cos(rad) * scaleAmount
      ) // the "egg equation"

      //console.log( point ); // x-coord should be greater than zero to avoid degenerate triangles; it is not in this formula.

      points.push(point)
    }

    if (increment <= 1) {
      increment += 0.05
      setTimeout(composeEgg, 1000)
    }
    console.log(increment)

    eggGeometry = new THREE.LatheGeometry(points, 32)
  }

  composeEgg()

  // console.log(points)

  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
    format: THREE.RGBAFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipMapLinearFilter,
    encoding: THREE.SRGBColorSpace
  })

  const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget)

  // Material
  const material = new THREE.ShaderMaterial({
    vertexShader: noiseVertexShader,
    fragmentShader: noiseFragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 }
    }
  })

  const materialFresnel = new THREE.ShaderMaterial({
    vertexShader: noiseVertexShader1,
    fragmentShader: noiseFragmentShader1,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      tCube: cubeRenderTarget.texture
    }
  })

  // Mesh
  const sphereMesh = new THREE.Mesh(sphereGeometry, material)
  const smallSphereMesh = new THREE.Mesh(smallSphereGeo, materialFresnel)
  const eggMesh = new THREE.Mesh(eggGeometry, materialFresnel)

  scene.add(eggMesh, sphereMesh)

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
  camera.position.set(0.05, -0.0, 1.3)
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
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // materialFresnel.uniforms.tCube.value = cubeRenderTarget.texture

  console.log(smallSphereMesh)

  /**
   * Post processing
   */
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const effect1 = new ShaderPass(DotScreenShader)
  effect1.uniforms['scale'].value = 4
  composer.addPass(effect1)

  composer.setSize(sizes.width, sizes.height)

  /**
   * Animate
   */
  const clock = new THREE.Clock()

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // Update Material
    // material.uniforms.uTime.value = elapsedTime * 0.005
    material.uniforms.uTime.value = elapsedTime * 0.3

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
