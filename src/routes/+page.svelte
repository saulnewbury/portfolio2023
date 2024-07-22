<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
  gsap.registerPlugin(ScrollSmoother)

  import Hero from './Hero.svelte'
  import Mission from './Mission.svelte'
  import Projects from './Projects.svelte'

  onMount(() => {
    ScrollSmoother.create({
      smooth: 0.2, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0.1 // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    })
    ScrollTrigger.refresh()
  })
</script>

<!-- Sections -->
<Hero />
<Mission />
<Projects />

<section>Contact</section>

<!-- <SpinTransition /> -->
