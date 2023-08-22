<script>
  import './global.css'
  import { initialiseThreeJSScene, introAnim, tick } from '$lib/noise/noise.js'
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/dist/SplitText'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
  import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
  import { GSDevTools } from 'gsap/dist/GSDevTools'
  import smootherInstance from '$lib/smoother.js'

  gsap.registerPlugin(
    SplitText,
    ScrollTrigger,
    ScrollSmoother,
    GSDevTools,
    ScrollToPlugin
  )

  // Refs
  let nav, canvas, overlayOne, overlayTwo

  onMount(() => {
    window.scrollTo(0, 0)
    initialiseThreeJSScene(canvas)
    introAnim(overlayOne, overlayTwo)
    tick()

    const q = gsap.utils.selector(nav)
    setTimeout(() => {
      gsap.to(q('.brand-name, .right a'), {
        opacity: 1,
        duration: 1,
        stagger: 0.1
      })
    }, 3500)

    gsap.fromTo(
      overlayOne,
      {
        backgroundColor: 'rgba(0, 0, 0, 1)'
      },
      {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        duration: 2.5,
        delay: 0.2
      }
    )
    gsap.from(canvas, { opacity: 0, duration: 1, delay: 0.2 })
  })
</script>

<nav bind:this={nav}>
  <a class="brand-name" href="/">Saul Newbury</a>

  <div class="right">
    <a href="/projects">Projects</a>
  </div>
</nav>

<canvas class="webgl" bind:this={canvas} />

<div class="overlay one" bind:this={overlayOne} />
<div class="overlay two" bind:this={overlayTwo} />

<div id="smooth-wrapper">
  <div id="smooth-content">
    <div class="content">
      <slot />
    </div>
  </div>
</div>

<style>
  /* nav */
  nav {
    padding: 3.5rem var(--gutter) 0;
    display: flex;
    justify-content: space-between;
    position: fixed;
    z-index: 100;
    width: 100vw;
  }

  a.brand-name {
    opacity: 0;
    /* font-size: 1.2rem;
    font-weight: 600; */
  }

  .right a {
    opacity: 0;
  }

  .right a:not(:last-child) {
    margin-right: 0.5rem;
  }

  .webgl {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
  }

  .content {
    pointer-events: none;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 var(--gutter);
  }

  .overlay {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .overlay.one {
    background-color: rgba(0, 0, 0, 1);
    mix-blend-mode: hard-light;
  }

  .overlay.two {
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.6);
    mix-blend-mode: overlay;
  }

  @media screen and (max-width: 768px) {
    .content {
      padding: 0 var(--gutter-mob);
    }

    nav {
      padding: 2rem var(--gutter-mob) 0;
    }
  }
</style>
