<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
  import Balance from '../lib/components/Balance.svelte'
  import Projects from '../lib/components/Projects.svelte'

  gsap.registerPlugin(ScrollSmoother)

  // Vars
  // let mainChars

  onMount(() => {
    ScrollSmoother.create({
      smooth: 0.2, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0.1 // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    })
  })
</script>

<section class="hero"></section>

<!-- <Projects /> -->

<Balance />

<style>
  section {
    height: 100vh;
  }
  .hero {
    /* height: 30vh; */
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    opacity: 0;
  }
</style>
