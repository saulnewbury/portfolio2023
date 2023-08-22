// NOISE
import { browser } from '$app/environment'
import * as THREE from 'three'

let camera, renderer, sizes

const cursor = {
  x: 0,
  y: 0
}

const scene = new THREE.Scene()
const clock = new THREE.Clock()

if (browser) {
  sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = -(e.clientY / sizes.height - 0.5)
  })

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
 * INITIALISE
 */
export function initialiseThreeJSScene(canvas) {
  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

/**
 * TICK
 */

export function tick() {
  const elapsedTime = clock.getElapsedTime()
  // Update Material

  // Update controls
  // controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}
