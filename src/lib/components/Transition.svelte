<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap/dist/gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
  import { CustomEase } from 'gsap/dist/CustomEase'

  import { getEggMesh, getSphereMesh } from '$lib/noise/noise.js'

  let section

  let eggMesh, sphereMesh, sizes, xToEgg, rToEgg

  gsap.registerPlugin(ScrollToPlugin, CustomEase)

  onMount(() => {
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
      // sphereMesh = getSphereMesh()
      transitionSetup()
      xToEgg = gsap.quickTo(eggMesh.position, 'x')
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
      let tlTransition = gsap.timeline({
        defaults: { duration: 5, ease: 'power2.inOut' }
      })

      ScrollTrigger.create({
        animation: tlTransition,
        trigger: section,
        start: 'top 100%',
        end: 'top top',
        scrub: 1
        // onUpdate: (self) => {
        //   // if (self.progress !== 1) transitionComplete = false

        //   if (self.progress <= 0.5 && done) {
        //     reset()
        //     console.log('spin back')
        //     done = false
        //     gsap.to(sphereMesh.rotation, {
        //       y: 0,
        //       duration: 3,
        //       ease: 'power2.out'
        //     })
        //   }
        //   if (self.progress > 0.5 && !done) {
        //     done = true
        //     gsap.to(sphereMesh.rotation, {
        //       y: Math.PI * 4,
        //       duration: 3,
        //       ease: 'power2.out'
        //     })
        //   }
        // }
      })

      tlTransition
        .to(eggMesh.scale, { x: 1.5, duration: 2.5 }, '<')
        .to(eggMesh.scale, { y: 1.5, duration: 2.5 }, '<')
        .to(eggMesh.scale, { z: 1.5, duration: 2.5 }, '<')
        .to(eggMesh.position, { x: 0.6, duration: 2.5 }, '<')
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
