import { gsap } from 'gsap'
import { eggMesh, ovlyOne, ovlyTwo, loadingSequenceComplete } from './noise'

/**
 * Intro animation
 */
export function zoom() {
  let hasRun = false
  console.log(eggMesh.position)
  setTimeout(() => {
    gsap.to(eggMesh.position, {
      // z: 1.1,
      y: 0.55,
      // y: window.innerWidth / 26.6 / 100,
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
      // y: window.innerWidth / 22.6 / 100,
      // x: window.innerWidth / 22.6 / 100,
      // z: window.innerWidth / 22.6 / 100,
      y: `${window.innerWidth / 22.6 / 100}vw`,
      x: `${window.innerWidth / 22.6 / 100}vw`,
      z: `${window.innerWidth / 22.6 / 100}vw`,
      y: `${window.innerWidth / 22.6 / 100}vw`,
      x: `${window.innerWidth / 22.6 / 100}vw`,
      z: `${window.innerWidth / 22.6 / 100}vw`,
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
