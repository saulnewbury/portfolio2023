<script>
  import { gsap } from 'gsap'
  import { onMount } from 'svelte'

  export let delay = 0

  let mouseInside, rectDimensions, mousePosition

  // refs
  let line

  delay = delay + 1.5

  onMount(() => {
    gsap.fromTo(
      line,
      { attr: { d: `M000, 80 Q 0 200, 0, 80` } },
      {
        attr: { d: `M000, 80 Q 420 80, 840, 80` },
        duration: 0.6,
        delay: delay,
        onStart: () => {
          gsap.set(line, { strokeOpacity: 1 })
        }
      }
    )
  })

  function handleMouseEnter(e) {
    console.log('enter')
    mouseInside = true
    const rect = e.currentTarget.getBoundingClientRect()
    rectDimensions = {
      height: rect.height,
      width: rect.widtht,
      left: rect.left,
      top: rect.top
    }
  }

  function handleMouseLeave() {
    mouseInside = false
    gsap.to(line, {
      // ease: Elastic.easeOut.config(2, 0.5),
      ease: 'elastic.out(1, 0.3)',
      attr: { d: `M000,80 Q 420 80, 840, 80` },
      duration: 0.8
    })
  }

  function handleMouseMove(e) {
    mousePosition = {
      x: e.clientX,
      y: e.clientY
    }
    if (mouseInside) {
      let targetCenter = rectDimensions.height / 2
      let relativeMousePos = mousePosition.y - rectDimensions.top
      // let distance = (targetCenter - relativeMousePos) / 2.5 // half the distnce
      let distance = (targetCenter - relativeMousePos) / 2 // half the distnce
      let y = targetCenter - distance

      console.log(y)

      gsap.to(line, {
        // attr: { d: `M0,100 Q250,${y} 500, 100` }
        // attr: { d: `M000,80 Q 420 80, 840,80` }
        attr: { d: `M000,80 Q 420 ${y + -10}, 840,80` }
      })
    }
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg
  on:mouseenter={(e) => handleMouseEnter(e)}
  on:mousemove={handleMouseMove}
  on:mouseleave={handleMouseLeave}
  viewBox="0 0 840 160"
  class="line absolute"
  style="transform-origin: left center; transform: translate(0px, 0px);"
  data-v-d2a8588a=""
  data-v-c96e7496=""
  ><path
    bind:this={line}
    stroke-opacity="0"
    fill="none"
    stroke-width="1"
    d="M000,80 Q 420 80, 840,80"
    data-v-d2a8588a=""
  ></path></svg
>

<style>
  .line {
    position: absolute;
    top: -7.9vw;
    left: 0;
    stroke: black;
    width: 100%;
    height: 100%;
    z-index: 990;
  }
</style>
