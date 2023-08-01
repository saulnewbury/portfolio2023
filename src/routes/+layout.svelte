<script>
  import './global.css'
  import { initialiseThreeJSScene } from '$lib/noise/noise.js'
  import { onMount } from 'svelte'

  // Refs
  let canvas

  onMount(() => {
    initialiseThreeJSScene(canvas)
  })
</script>

<nav>
  <a href="/">Saul Newbury</a>

  <!-- <div class="right">
    <a href="/">v1</a>
  </div> -->
</nav>

<canvas class="webgl" bind:this={canvas} />

<!-- <div class="overlay" /> -->
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

  /* .right a:not(:last-child) {
    margin-right: 0.5rem;
  } */

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

  /* .overlay {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(224, 110, 110);
    mix-blend-mode: exclusion;
  } */

  @media screen and (max-width: 768px) {
    .content {
      padding: 0 var(--gutter-mob);
    }
  }
</style>
