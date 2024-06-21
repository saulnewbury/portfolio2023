<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/dist/SplitText'
  import { eggBuilt } from '$lib/noise/noise.js'

  // refs
  let section

  // Vars
  let isMobile = null,
    isTablet = null,
    isDesktop = null

  onMount(() => {
    const q = gsap.utils.selector(section)
    const mm = gsap.matchMedia()

    mm.add(
      '(max-width: 768px)',
      () => {
        isMobile = true
        isTablet = false
        isDesktop = false
        splitTheText()
      },
      section
    )

    mm.add(
      '(min-width: 769px) and (max-width: 1055px)',
      () => {
        isMobile = false
        isTablet = true
        isDesktop = false
        splitTheText()
      },
      section
    )

    mm.add(
      '(min-width: 1056px)',
      () => {
        isTablet = false
        isMobile = false
        isDesktop = true
        splitTheText()
      },
      section
    )

    // Animate characters
    function splitTheText() {
      mainText = isMobile
        ? q('.mobile h1')
        : isTablet
          ? q('.tablet h1')
          : q('.desktop h1')
      splitText = new SplitText(mainText, {
        type: 'lines, chars'
      })
      lines = splitText.lines
      mainChars = splitText.chars
      // intro()
    }
  })
</script>

<div>
  <div class={'text desktop ' + (isDesktop ? 'show' : '')}>
    <h1>I'm Saul Newbury, a Creative Developer, interested in how</h1>
    <h1>great design, asthetics and motion can work together to create</h1>
    <h1>experiences that are fun, playful and memorable.</h1>
  </div>
  <div class={'text tablet ' + (isTablet ? 'show' : '')}>
    <h1>Hello world! I'm Saul, a Creative Developer,</h1>
    <h1>interested in how great design, asthetics and</h1>
    <h1>motion can work together to create experiences</h1>
    <h1>that are fun, playful and memorable.</h1>
  </div>
  <div class={'text mobile ' + (isMobile ? 'show' : '')}>
    <h1>Hello world! I'm Saul,</h1>
    <h1>a Creative Developer, interested</h1>
    <h1>in how great design, asthetics</h1>
    <h1>and motion can work together</h1>
    <h1>to create experiences that are</h1>
    <h1>fun, playful and memorable.</h1>
  </div>
</div>

<style>
</style>
