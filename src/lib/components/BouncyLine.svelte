<script>
  import { gsap } from 'gsap'
  import { onMount } from 'svelte'

  export let delay = 0,
    reverse = false,
    width = 0,
    height = 160,
    zIndex = 900,
    top = -7.8

  let mouseInside, rectDimensions, mousePosition, x, y, mid

  // refs
  let line, container

  // account for egg intro anim
  delay = delay + 2

  $: {
    mid = height / 2
    gsap.set(container, { zIndex: zIndex, top: `${top}vw` })

    const start = reverse
      ? `M ${width} ${mid}, Q ${width} 200, ${width} ${mid}`
      : `M000, ${mid} Q 0 200, 0, ${mid}`
    const end = reverse
      ? `M 0 ${mid}, Q ${width / 2} ${mid}, ${width} ${mid}`
      : `M000, ${mid} Q ${width / 2} ${mid}, ${width}, ${mid}`

    console.log('HERE ' + start, end)

    gsap.fromTo(
      line,
      { attr: { d: start } },
      {
        attr: { d: end },
        duration: 0.8,
        delay: delay,
        onStart: () => {
          gsap.set(line, { strokeOpacity: 1 })
        }
      }
    )
  }

  onMount(() => {
    window.addEventListener('mousemove', () => {
      x = window.clientX
      y = window.clientY
    })
    window.addEventListener('resize', () => {
      const ele = document.elementFromPoint(x, y)
      const c = ele.closest(container)

      if (c && !mouseInside) {
        handleMouseEnter()
      } else if (!c && mouseInside) {
        handleMouseLeave()
      }
    })
  })

  function handleMouseEnter() {
    mouseInside = true
    const rect = container.getBoundingClientRect()
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
      attr: { d: `M000,${mid} Q ${width / 2} ${mid}, ${width}, ${mid}` },
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
      let distance = (targetCenter - relativeMousePos) / 2 // half the distance
      let y = targetCenter - distance

      gsap.to(line, {
        attr: {
          d: `M000,${mid} Q ${width / 2} ${(y / rectDimensions.height) * height}, ${width},${mid}`
        }
      })
    }
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->

<svg
  bind:this={container}
  on:mouseenter={(e) => handleMouseEnter(e)}
  on:mousemove={handleMouseMove}
  on:mouseleave={handleMouseLeave}
  viewBox={`0 0 ${width} ${height}`}
  class={`line absolute left-0`}
  style="transform-origin: left center; transform: translate(0px, 0px);"
  ><path
    bind:this={line}
    stroke-opacity="0"
    fill="none"
    stroke-width=".07vw"
    d={`M000, ${mid} Q ${width / 2} ${mid}, ${width}, ${mid}`}
  ></path></svg
>

<style>
  .line {
    stroke: black;
    width: 100%;
    z-index: 800;
    stroke-width: 0.07vw;
  }
</style>
