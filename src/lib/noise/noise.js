// NOISE

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import noiseVertexShader from '$lib/noise/shaders/vertex.glsl'
import noiseVertexShader1 from '$lib/noise/shaders/vertex1.glsl'
import noiseFragmentShader from '$lib/noise/shaders/fragment.glsl'
import noiseFragmentShader1 from '$lib/noise/shaders/fragment1.glsl'

/**
 * Base
 */

export function initialiseThreeJSScene(canvas) {
  // Scene
  const scene = new THREE.Scene()
  // scene.background = new THREE.Color('#0099ff')

  /**
   * Test mesh
   */
  // Plane Geometry
  const sphereGeometry = new THREE.SphereGeometry(4, 32, 32)
  const smallSphereGeo = new THREE.SphereGeometry(0.4, 100, 100)

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
  smallSphereMesh.position.x = 0.3
  smallSphereMesh.position.y = 0.1

  scene.add(smallSphereMesh, sphereMesh)

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
  //   const controls = new OrbitControls(camera, canvas)
  //   controls.enableDamping = true

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
   * Animate
   */
  const clock = new THREE.Clock()

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // Update Material
    material.uniforms.uTime.value = elapsedTime * 0.3

    // Update controls
    // controls.update()

    // Update cube camera
    smallSphereMesh.visible = false
    cubeCamera.update(renderer, scene)
    smallSphereMesh.visible = true
    materialFresnel.uniforms.tCube.value = cubeRenderTarget.texture

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

  tick()
}
