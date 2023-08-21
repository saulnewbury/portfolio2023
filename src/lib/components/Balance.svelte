<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap/dist/gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
  import { GSDevTools } from 'gsap/dist/GSDevTools'
  import {
    // heroToHead,
    // eggMesh,
    // sphereMesh,
    getEggMesh,
    getSphereMesh,
    eggBuilt
  } from '$lib/noise/noise.js'

  import smootherInstance from '$lib/smoother.js'

  import head from '$lib/images/me/head.png'
  import torso from '$lib/images/me/torso.png'
  import eyes from '$lib/images/me/eyes.png'
  import pupils from '$lib/images/me/pupils.png'
  import neck from '$lib/images/me/neck.png'

  let section

  let eggMesh,
    sphereMesh,
    transitionComplete = false,
    sizes,
    xToEgg,
    yToEgg,
    xToHead,
    yToHead,
    rToHead,
    xToPupils,
    yToPupils,
    skewToHead,
    initial = false,
    done = false

  gsap.registerPlugin(ScrollToPlugin)
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

    setTimeout(() => {
      //   heroToHead(section)
      eggMesh = getEggMesh()
      sphereMesh = getSphereMesh()
      transitionAnimation()

      // quickTo egg
      xToEgg = gsap.quickTo(eggMesh.position, 'x')
      yToEgg = gsap.quickTo(eggMesh.position, 'y')
      // quickTo head
      xToHead = gsap.quickTo(q('.container'), 'xPercent')
      yToHead = gsap.quickTo(q('.container'), 'yPercent')
      rToHead = gsap.quickTo(q('.container'), 'rotation')
      skewToHead = gsap.quickTo(q('.neck'), 'skewX')
      // quickTo pupils
      xToPupils = gsap.quickTo(q('.pupils'), 'xPercent')
      yToPupils = gsap.quickTo(q('.pupils'), 'yPercent')
    }, 5000)

    const smoother = smootherInstance()
    const q = gsap.utils.selector(section)
    const cursor = {
      x: 0,
      y: 0
    }

    /**
     * NormaliseScroll
     */
    ScrollTrigger.normalizeScroll(true)

    /**
     * Transition
     */

    function transitionAnimation() {
      let tlTransition = gsap.timeline({
        defaults: { duration: 1.5, ease: 'power4.Out' },
        onComplete: () => {
          console.log('complete')
          transitionComplete = true
        }
      })

      ScrollTrigger.create({
        animation: tlTransition,
        trigger: section,
        start: 'top 80%',
        end: 'top top',
        scrub: 0.5,
        markers: true,
        onEnter: () => {
          gsap.to(window, {
            duration: 0.7,
            scrollTo: section
          })
        },
        onEnterBack: () => {
          transitionComplete = false
          gsap.to(window, {
            duration: 0.7,
            scrollTo: 0
          })
        },
        onUpdate: (self) => {
          if (self.progress !== 1) transitionComplete = false

          if (self.progress <= 0.5 && done) {
            resetHead()
            xToEgg(0)
            console.log('spin back')
            done = false
            gsap.to(sphereMesh.rotation, {
              y: 0,
              duration: 2.5
            })
          }
          if (self.progress > 0.5 && !done) {
            done = true
            gsap.to(sphereMesh.rotation, {
              y: Math.PI * 4,
              duration: 2.5
            })
          }
        }
      })

      tlTransition
        .to(eggMesh.scale, { x: 0.25, duration: 2.5 }, '<')
        .to(eggMesh.scale, { y: 0.25, duration: 2.5 }, '<')
        .to(eggMesh.scale, { z: 0.25, duration: 2.5 }, '<')
        .to(
          eggMesh.position,
          {
            y: 0.18,
            duration: 2.5,
            ease: 'power2.out'
          },
          '<'
        )
        .to(
          eggMesh.position,
          {
            // y: 0.082,
            y: 0.092,
            duration: 0.8,
            ease: 'power2.inOut'
          },
          '>'
        )
    }

    /**
     * Balance
     */

    window.addEventListener('mousemove', (e) => {
      if (!transitionComplete) return
      // egg
      let x = e.clientX / sizes.width - 0.5
      xToEgg(-x * 0.22)
      yToEgg(-Math.abs(x * 0.076) + 0.096)
      // head
      const width = window.innerWidth / 2
      cursor.x = e.clientX - width
      cursor.y = e.clientY - width
      xToHead(0 - cursor.x * 0.04)
      yToHead(Math.abs(0 - cursor.x * 0.01))
      rToHead(`${0 - cursor.x * 0.04}`)
      skewToHead(`${0 - cursor.x * 0.03 * -1}`)
      // Pupils
      xToPupils(cursor.x * 0.009)
      yToPupils(-Math.abs(cursor.x * 0.018))
    })

    function resetHead() {
      xToHead(0)
      yToHead(0)
      rToHead(0)
      skewToHead(0)
    }
  })
</script>

<section bind:this={section} id="balance">
  <div class="overlay" />
  <div class="me">
    <img class="torso" width="1100" height="341" src={torso} alt="torso" />
    <img class="neck" width="310" height="175" src={neck} alt="neck" />
    <div class="container">
      <img class="eyes" width="252" height="75" src={eyes} alt="eyes" />
      <img class="pupils" width="196" height="44" src={pupils} alt="pupils" />
      <img class="head" width="556" height="709" src={head} alt="head" />
    </div>
  </div>
</section>

<style>
  section {
    --multiplier: 1.3;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
  .me {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 55%;
    display: flex;
    justify-content: center;
  }

  .container {
    display: flex;
    justify-content: center;
  }

  .container,
  .neck,
  .torso,
  .eyes,
  .pupils {
    position: absolute;
  }

  .head {
    height: auto;
    width: auto;
    aspect-ratio: 556/709;
    max-width: calc(23.5vh * var(--multiplier));
    z-index: 5;
  }
  .pupils {
    top: 28.3%;
    aspect-ratio: 196/44;
    width: auto;
    height: auto;

    top: calc(14.15vh * var(--multiplier));
    max-width: calc(8.2vh * var(--multiplier));
  }
  .eyes {
    top: 28.38%;
    aspect-ratio: 252/75;
    width: auto;
    height: auto;

    top: calc(14.2vh * var(--multiplier));
    max-width: calc(10.7vh * var(--multiplier));
  }
  .neck {
    top: 48.5%;
    aspect-ratio: 310/175;
    width: auto;
    height: auto;
    transform-origin: bottom center;
    opacity: 0.3;

    top: calc(24.18vh * var(--multiplier));
    max-width: calc(13vh * var(--multiplier));
  }
  .torso {
    top: 60.8%;
    aspect-ratio: 1100/341;
    width: auto;
    height: auto;

    top: calc(30.4vh * var(--multiplier));
    max-width: calc(47vh * var(--multiplier));
  }
</style>
