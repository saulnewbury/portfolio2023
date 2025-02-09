<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
  import HeroText from './HeroText.svelte'
  import Projects from './Projects.svelte'

  import Transition from '$lib/components/Transition.svelte'

  // import Experiment from './Experiment.svelte'

  gsap.registerPlugin(ScrollSmoother)

  onMount(() => {
    ScrollSmoother.create({
      smooth: 0.5, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0.1 // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    })
  })
</script>

<HeroText />
<Transition />
<Projects />
<!-- <Experiment /> -->

<!-- <Balance /> -->
