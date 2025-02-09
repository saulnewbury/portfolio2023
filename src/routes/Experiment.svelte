<script>
  import { onMount, onDestroy } from 'svelte'
  import gsap from 'gsap'
  import ScrollTrigger from 'gsap/ScrollTrigger'
  import SplitText from 'gsap/SplitText'

  // Register plugins
  gsap.registerPlugin(ScrollTrigger, SplitText)

  let containerRef
  let textRef
  let splitInstance
  let triggers = []

  onMount(() => {
    // Create the split text instance
    splitInstance = new SplitText(textRef, {
      type: 'chars,words,lines',
      charsClass: 'char',
      wordsClass: 'word',
      linesClass: 'line'
    })

    // Create the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
        // markers: true, // Uncomment for debugging
      }
    })

    // Animate each character
    tl.from(splitInstance.chars, {
      y: 100,
      opacity: 0,
      rotation: 10,
      scale: 0.5,
      duration: 1,
      stagger: {
        amount: 2,
        from: 'random'
      }
    })

    triggers.push(tl)
  })

  onDestroy(() => {
    // Clean up
    if (splitInstance) {
      splitInstance.revert()
    }
    triggers.forEach((trigger) => {
      if (trigger.scrollTrigger) {
        trigger.scrollTrigger.kill()
      }
    })
  })
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div
    bind:this={containerRef}
    class="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg"
  >
    <div bind:this={textRef} class="text-2xl leading-relaxed text-gray-800">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    <!-- Add some padding below for scrolling space -->
    <div class="h-screen" />
  </div>
</div>

<style>
  /* Base styles for split text elements */
  :global(.char) {
    display: inline-block;
    position: relative;
  }

  :global(.word) {
    display: inline-block;
    position: relative;
  }

  :global(.line) {
    display: block;
    position: relative;
  }
</style>
