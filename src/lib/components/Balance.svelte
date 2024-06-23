<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap/dist/gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
  import { CustomEase } from 'gsap/dist/CustomEase'

  import { getEggMesh, getSphereMesh, eggBuilt } from '$lib/noise/noise.js'

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
    rToEgg,
    xToPupils,
    yToPupils,
    skewToNeck,
    x,
    fallingEggTween1,
    fallingEggTween2,
    fallingEggTween3,
    intercepting1,
    intercepting2,
    intercepting3,
    rotation = 0,
    done = false

  gsap.registerPlugin(ScrollToPlugin, CustomEase)

  onMount(() => {
    const q = gsap.utils.selector(section)
    const smoother = smootherInstance()

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
      eggMesh = getEggMesh()
      sphereMesh = getSphereMesh()
      transitionAnimation()
      // quickTo egg
      xToEgg = gsap.quickTo(eggMesh.position, 'x')
      yToEgg = gsap.quickTo(eggMesh.position, 'y')
      rToEgg = gsap.quickTo(eggMesh.rotation, 'z', {
        duration: 0.4,
        ease: 'power1.inOut'
      })
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

    function transitionAnimation() {
      let tlTransition = gsap.timeline({
        defaults: { duration: 1.5, ease: 'power4.Out' },
        onComplete: () => {
          transitionComplete = true
          rotation = gsap.getProperty(eggMesh.rotation, 'z')
          startIdleHeadTimer()
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

      // fallingEggTween1.kill()
      // fallingEggTween2.kill()
      // fallingEggTween3.kill()

      // if rotation is a positive number and mouse move is positive, then
      x = e.clientX / sizes.width - 0.5

      console.log(rotation + ' ' + x)
      console.log('working')
      // egg

      // xToEgg(x * 0.25)
      // yToEgg(-Math.abs(x * 0.076) + 0.076)
      // rToEgg(x * 0.24)
      if ((rotation < 0 && x > 0) || (rotation > 0 && x < 0)) {
        // do nothing
      } else {
      }
      fallingEggTween1.kill()
      fallingEggTween2.kill()
      fallingEggTween3.kill()
      intercepting1 = gsap.to(eggMesh.rotation, { z: x * 0.24 })
      intercepting2 = gsap.to(eggMesh.position, { x: x * 0.25 })
      intercepting3 = gsap.to(eggMesh.position, {
        y: -Math.abs(x * 0.076) + 0.076
      })

      // head
      xToHead(0 + x * 60)
      yToHead(Math.abs(0 + x * 10))
      rToHead(`${0 + x * 40}`)
      skewToNeck(`${0 + x * 50 * -1}`)
      // Pupils
      xToPupils(-x * 9)
      yToPupils(-Math.abs(x * 18))
    })

    // in 1 second check egg if egg has changed position
    let timer
    window.addEventListener('mousemove', () => {
      if (!transitionComplete) return
      startIdleHeadTimer()
    })

    function startIdleHeadTimer() {
      if (!transitionComplete) return
      clearInterval(timer)
      timer = setInterval(rollEgg, 500)
    }

    function rollEgg() {
      console.log('rollEgg Fn Fired')
      if (!transitionComplete) return

      let currentRotation = gsap.getProperty(eggMesh.rotation, 'z')
      console.log(currentRotation)

      if (rotation !== currentRotation) {
        rotation = currentRotation
        return
      } else {
        let amount = currentRotation < 0 ? 15 : -15
        fallingEggTween1 = gsap.to(eggMesh.rotation, {
          z: amount,
          duration: 4.5,
          ease: 'power1.in',
          onStart: () => {
            clearInterval(timer)
          },
          onComplete: () => {
            rotation = currentRotation
            reset()
          }
        })

        fallingEggTween2 = gsap.to(eggMesh.position, {
          x: amount < 0 ? 50 / 100 : -50 / 100,
          ease: 'power1.in',
          duration: 3.1
        })
        fallingEggTween3 = gsap.to(eggMesh.position, {
          y: -50 / 100,
          ease: 'power3.in',
          duration: 2.5
        })
      }
    }

    function reset() {
      fallingEggTween1.kill()
      fallingEggTween2.kill()
      fallingEggTween3.kill()
      xToEgg(0)
      rToEgg(0)
      yToEgg(0)
      xToHead(0)
      yToHead(0)
      rToHead(0)
      skewToNeck(0)
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
