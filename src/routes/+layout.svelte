<script>
  import './app.css'
  import { initialiseThreeJSScene } from '$lib/noise/noise.js'
  import { onMount, afterUpdate } from 'svelte'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/dist/SplitText'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
  import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
  import { GSDevTools } from 'gsap/dist/GSDevTools'
  import '../lib/mediaQueries.js'

  // components

  gsap.registerPlugin(
    SplitText,
    ScrollTrigger,
    ScrollSmoother,
    GSDevTools,
    ScrollToPlugin
  )

  // Refs
  let canvas, overlayOne, overlayTwo

  onMount(() => {
    window.scrollTo(0, 0)
    initialiseThreeJSScene(canvas, overlayOne, overlayTwo)

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

  afterUpdate(() => {
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 400)
  })
</script>

<canvas class="webgl" bind:this={canvas} />

<div class="overlay one" bind:this={overlayOne} />
<div class="overlay two" bind:this={overlayTwo} />

<a class="brand uppercase text-[2.3rem] fixed left-[3vw] top-[25px]" href="/"
  >Saul Newbury</a
>

<div class="h-[1.4rem] w-[3rem] mt-[10px] fixed right-[3vw] top-[25px]">
  <div class="absolute bg-black w-[3rem] h-[.35rem] rounded-sm"></div>
  <div class="absolute bg-black w-[3rem] h-[.35rem] bottom-0 rounded-sm"></div>
</div>

<div class="content-container"></div>
<div id="smooth-wrapper">
  <div id="smooth-content">
    <div class="content">
      <slot />
    </div>
  </div>
</div>

<style>
  .webgl {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
  }

  .content {
    top: 0;
    left: 0;
    width: 100%;
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

  #smooth-wrapper {
    position: relative;
  }

  /* @media screen and (max-width: 768px) {
    .content {
      padding: 0 var(--gutter-mob);
    }
  } */
</style>
