<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
  import HeroText from './HeroText.svelte'
  import Projects from './Projects.svelte'

  import SpinTransition from '$lib/components/SpinTransition'

  gsap.registerPlugin(ScrollSmoother)

  onMount(() => {
    ScrollSmoother.create({
      smooth: 2, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0.1 // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    })
  })
</script>

<HeroText />
<Projects />

<!-- <Balance /> -->
<!-- <SpinTransition /> -->
