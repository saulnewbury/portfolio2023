<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap/dist/gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

  import smootherInstance from '$lib/smoother.js'

  import head from '$lib/images/me/head.png'
  import torso from '$lib/images/me/torso.png'
  import eyes from '$lib/images/me/eyes.png'
  import pupils from '$lib/images/me/pupils.png'
  import neck from '$lib/images/me/neck.png'

  let section

  onMount(() => {
    const smoother = smootherInstance()
    const q = gsap.utils.selector(section)
    const cursor = {
      x: 0,
      y: 0
    }

    // Animate Head
    let xTo = gsap.quickTo(q('.container'), 'xPercent')
    let yTo = gsap.quickTo(q('.container'), 'yPercent')
    let rTo = gsap.quickTo(q('.container'), 'rotation')
    let skewTo = gsap.quickTo(q('.neck'), 'skewX')

    document.addEventListener('mousemove', (e) => {
      const width = window.innerWidth / 2
      cursor.x = e.clientX - width
      cursor.y = e.clientY - width
      xTo(0 - cursor.x * 0.04)
      yTo(Math.abs(0 - cursor.x * 0.01))
      rTo(`${0 - cursor.x * 0.04}`)
      skewTo(`${0 - cursor.x * 0.03 * -1}`)
    })

    /**
     * Lenis
     */

    ScrollTrigger.normalizeScroll(true)

    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'top top',
      onEnter: () => {
        console.log('start')
        smoother.scrollTo(section, true)
      }
    })
  })
</script>

<section bind:this={section}>
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
