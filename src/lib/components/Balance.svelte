<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap/dist/gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
  import { CustomEase } from 'gsap/dist/CustomEase'

  import { getEggMesh, getSphereMesh } from '$lib/noise/noise.js'

  import scrollSmoother from '$lib/smoother.js'

  import head from '$lib/images/me/head.png'
  import torso from '$lib/images/me/torso.png'
  import eyes from '$lib/images/me/eyes.png'
  import pupils from '$lib/images/me/pupils.png'
  import neck from '$lib/images/me/neck.png'

  let section, countdown

  let eggMesh,
    sphereMesh,
    transitionComplete = false,
    sizes,
    xToEgg,
    yToEgg,
    xToHead,
    yToHead,
    rToHead,
    rToEgg,
    xToPupils,
    yToPupils,
    skewToNeck,
    done = false

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
      yToEgg = gsap.quickTo(eggMesh.position, 'y')
      rToEgg = gsap.quickTo(eggMesh.rotation, 'z')
      // quickTo head
      xToHead = gsap.quickTo(q('.container'), 'xPercent')
      yToHead = gsap.quickTo(q('.container'), 'yPercent')
      rToHead = gsap.quickTo(q('.container'), 'rotation')
      skewToNeck = gsap.quickTo(q('.neck'), 'skewX')
      // quickTo pupils
      xToPupils = gsap.quickTo(q('.pupils'), 'xPercent')
      yToPupils = gsap.quickTo(q('.pupils'), 'yPercent')
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
        onEnter: () => {
          gsap.to(window, {
            duration: 0.5,
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
            reset()
            console.log('spin back')
            done = false
            gsap.to(sphereMesh.rotation, {
              y: 0,
              duration: 3,
              ease: 'power2.out'
            })
          }
          if (self.progress > 0.5 && !done) {
            done = true
            gsap.to(sphereMesh.rotation, {
              y: Math.PI * 4,
              duration: 3,
              ease: 'power2.out'
            })
          }
        }
      })

      tlTransition
        .to(eggMesh.scale, { x: 0.2, duration: 2.5 }, '<')
        .to(eggMesh.scale, { y: 0.2, duration: 2.5 }, '<')
        .to(eggMesh.scale, { z: 0.2, duration: 2.5 }, '<')
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
            y: 0.072,
            // y: 0.092,
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
      let x = e.clientX / sizes.width - 0.5
      // egg
      xToEgg(-x * 0.25)
      yToEgg(-Math.abs(x * 0.076) + 0.076)
      rToEgg(-x * 0.24)
      // head
      xToHead(0 - x * 50)
      yToHead(Math.abs(0 - x * 10))
      rToHead(`${0 - x * 40}`)
      skewToNeck(`${0 - x * 50 * -1}`)
      // Pupils
      xToPupils(x * 9)
      yToPupils(-Math.abs(x * 16))
    })

    function reset() {
      xToEgg(0)
      rToEgg(0)
      xToHead(0)
      yToHead(0)
      rToHead(0)
      skewToNeck(0)
    }

    const countdownTl = gsap.timeline({ defaults: { duration: 0.5 } })

    countdownTl
      .to('.countdown span:nth-child(1)', { delay: 0.1, opacity: 1 })
      .to('.countdown span:nth-child(1)', { opacity: 0 })
      .to('.countdown span:nth-child(2)', { opacity: 1 })
      .to('.countdown span:nth-child(2)', { opacity: 0 })
      .to('.countdown span:nth-child(3)', { opacity: 1 })
      .to('.countdown span:nth-child(3)', { opacity: 0 })
      .to('.countdown span:nth-child(4)', { opacity: 1 })
      .to('.countdown span:nth-child(4)', { opacity: 0 })

    ScrollTrigger.create({
      animation: countdownTl,
      trigger: countdown,
      start: 'top 3%',
      markers: true,
      onLeaveBack: 
    })
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
  <div bind:this={countdown} class="countdown">
    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>Do it!</span>
  </div>
</section>

<style>
  section {
    --multiplier: 1.3;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
  .countdown {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 900;
  }
  .countdown span {
    opacity: 0;
    font-size: 100px;
    text-align: center;
    /* display: inline-block; */
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    /* width: 1em; */
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
