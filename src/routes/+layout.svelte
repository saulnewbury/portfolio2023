<script>
  import './global.css'
  import { initialiseThreeJSScene } from '$lib/noise/noise.js'
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/dist/SplitText'

  gsap.registerPlugin(SplitText)

  // Refs
  let nav, canvas, overlayOne, overlayTwo

  onMount(() => {
    initialiseThreeJSScene(canvas, overlayOne, overlayTwo)
    const q = gsap.utils.selector(nav)
    setTimeout(() => {
      gsap.to(q('.brand-name'), { opacity: 1, duration: 1 })
    }, 3500)
    // gsap.set(canvas, { opacity: 0 })
    gsap.from(canvas, { opacity: 0, duration: 1, delay: 0.7 })
  })
</script>

<nav bind:this={nav}>
  <a class="brand-name" href="/">Saul Newbury</a>

  <!-- <div class="right">
    <a href="/">v1</a>
    <a href="/v2">v2</a>
    <a href="/v3">v3</a>
  </div> -->
</nav>

<canvas class="webgl" bind:this={canvas} />

<div class="overlay one" bind:this={overlayOne} />
<div class="overlay two" bind:this={overlayTwo} />
<div class="content">
  <slot />
</div>

<style>
  /* nav */
  nav {
    padding: 3.5rem var(--gutter) 0;
    display: flex;
    justify-content: space-between;
    position: absolute;
    z-index: 100;
    width: 100vw;
  }

  a.brand-name {
    opacity: 0;
    /* font-size: 1.2rem;
    font-weight: 600; */
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
    /* pointer-events: none; */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 var(--gutter);
  }

  canvas {
    /* opacity: 0; */
  }

  .overlay {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .overlay.one {
    background-color: rgba(0, 0, 0, 0.6);
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
  }
</style>
