<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap/dist/gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
  import { CustomEase } from 'gsap/dist/CustomEase'

  import { getEggMesh, getSphereMesh } from '$lib/noise/noise.js'

  import scrollSmoother from '$lib/smoother.js'

  let section

  let eggMesh,
    sphereMesh,
    sizes,
    xToEgg,
    rToEgg,
    // yToEgg,
    done = false,
    transitionComplete = false

  gsap.registerPlugin(ScrollToPlugin, CustomEase)

  onMount(() => {
    const smoother = scrollSmoother()
    const q = gsap.utils.selector(section)
    sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
    })

    // set up
    setTimeout(() => {
      eggMesh = getEggMesh()
      sphereMesh = getSphereMesh()
      transitionSetup()
      // quickTo egg
      xToEgg = gsap.quickTo(eggMesh.position, 'x')
      // yToEgg = gsap.quickTo(eggMesh.position, 'y')
      rToEgg = gsap.quickTo(eggMesh.rotation, 'z')
    }, 5000)

    /**
     * NormaliseScroll
     */
    ScrollTrigger.normalizeScroll(true)

    /**
     * Transition
     */

    function transitionSetup() {
      // gsap.set(eggMesh.scale, { x: 0, duration: 2.5 }, '<') // THIS
      let tlTransition = gsap.timeline({
        defaults: { duration: 0.8, ease: 'power4.Out' },
        onComplete: () => {
          console.log('complete')
          transitionComplete = true
        }
      })

      ScrollTrigger.create({
        animation: tlTransition,
        trigger: section,
        start: 'top 100%',
        end: 'top top',
        scrub: 0.5,
        // markers: true,
        onEnter: () => {
          gsap.to(window, {
            duration: 0.8,
            ease: 'power1.inOut'
          })
        },
        onEnterBack: () => {
          transitionComplete = false
          gsap.to(window, {
            duration: 0.7,
            ease: 'power1.inOut'
          })
        },
        onUpdate: (self) => {
          if (self.progress !== 1) transitionComplete = false

          if (self.progress <= 0.5 && done) {
            reset()
            console.log('spin back')
            done = false
            gsap.to(sphereMesh.rotation, {
              y: 0,
              duration: 3,
              ease: 'power2.inOut'
            })
          }
          if (self.progress > 0.5 && !done) {
            done = true
            gsap.to(sphereMesh.rotation, {
              y: -(Math.PI * 0.2),
              duration: 10,
              ease: 'power2.inOut'
            })
          }
        }
      })

      tlTransition
        // .to(eggMesh.scale, { x: 0.2, duration: 2.5 }, '<')
        // .to(eggMesh.scale, { y: 0.2, duration: 2.5 }, '<')
        // .to(eggMesh.scale, { z: 0.2, duration: 2.5 }, '<')
        .to(eggMesh.scale, { x: 1.5, duration: 2.5 }, '<')
        .to(eggMesh.scale, { y: 1.5, duration: 2.5 }, '<')
        .to(eggMesh.scale, { z: 1.5, duration: 2.5 }, '<')
        .to(eggMesh.position, { x: 0.6, duration: 2.5 }, '<')
    }

    /**
     * Balance
     */

    function reset() {
      xToEgg(0)
      rToEgg(0)
    }
  })
</script>

<section bind:this={section}></section>

<style>
  section {
    --multiplier: 1.3;
    height: 1vh;
    position: relative;
    overflow: hidden;
  }
</style>
