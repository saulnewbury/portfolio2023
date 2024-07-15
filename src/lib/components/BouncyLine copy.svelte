<script>
  import { gsap } from 'gsap'
  import { onMount } from 'svelte'

  // props
  export let delay = 0,
    reverse = false,
    width = 0,
    height = 160,
    zIndex = 900,
    top = -7.2

  let mouseInside,
    rectDimensions,
    mousePosition,
    x = 0,
    mid,
    start,
    end,
    sw,
    bouncyLines,
    bl,
    blPrev,
    y = null

  // refs
  let line, container

  // account for egg intro anim
  delay = delay + 2

  $: if (width && height && typeof height === 'number') {
    mid = height / 2
    gsap.set(container, { zIndex: zIndex, top: `${top}vw` })

    start = reverse
      ? `M ${width} ${mid}, Q ${width} 200, ${width} ${mid}`
      : `M000, ${mid} Q 0 200, 0, ${mid}`
    end = reverse
      ? `M 0 ${mid}, Q ${width / 2} ${mid}, ${width} ${mid}`
      : `M000, ${mid} Q ${width / 2} ${mid}, ${width}, ${mid}`

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
    const diag = Math.sqrt(width ** 2 + height ** 2)
    sw = (0.1 * window.innerWidth) / diag

    bouncyLines = Array.from(document.querySelectorAll('.bouncy-line'))
  }

  onMount(() => {
    window.addEventListener('mousemove', defineXAndY)
    window.addEventListener('resize', doStuff)

    return () => {
      window.removeEventListener('mousemove', defineXAndY)
      window.removeEventListener('resize', doStuff)
    }
  })

  function defineXAndY(e) {
    x = e.clientX
    y = e.clientY

    const mouseInside = bouncyLines.some((el) => {
      const rect = el.getBoundingClientRect()
      if (y > rect.top && y < rect.bottom && x > rect.left && x < rect.right) {
        rectDimensions = {
          height: rect.height,
          width: rect.widtht,
          left: rect.left,
          top: rect.top
        }
        bl = el.children[0]
        blPrev = bl
        console.log('entered')
        let targetCenter = rectDimensions.height / 2
        let relativeMousePos = y - rectDimensions.top
        let distance = (targetCenter - relativeMousePos) / 2 // half the distance
        let num = targetCenter - distance

        console.log(`${(num / rectDimensions.height) * height}`)

        gsap.to(bl, {
          attr: {
            d: `M000,${mid} Q ${width / 2} ${(num / rectDimensions.height) * height}, ${width},${mid}`
          }
        })
      } else {
        console.log('leave')
        gsap.to(bl, {
          // ease: Elastic.easeOut.config(2, 0.5),
          ease: 'elastic.out(1, 0.3)',
          attr: { d: `M000,${mid} Q ${width / 2} ${mid}, ${width}, ${mid}` },
          duration: 0.8
        })
      }
    })

    if (mouseInside) {
    } else {
    }
  }

  function doStuff() {
    const ele = document.elementFromPoint(x, y)
    const c = ele?.closest(container)

    if (c && !mouseInside) {
      handleMouseEnter()
    } else if (!c && mouseInside) {
      handleMouseLeave()
    }
  }

  function handleMouseEnter() {
    // mouseInside = true
    // const rect = container.getBoundingClientRect()
    // rectDimensions = {
    //   height: rect.height,
    //   width: rect.widtht,
    //   left: rect.left,
    //   top: rect.top
    // }
  }

  function handleMouseLeave() {
    // mouseInside = false
    // gsap.to(line, {
    //   // ease: Elastic.easeOut.config(2, 0.5),
    //   ease: 'elastic.out(1, 0.3)',
    //   attr: { d: `M000,${mid} Q ${width / 2} ${mid}, ${width}, ${mid}` },
    //   duration: 0.8
    // })
  }

  function handleMouseMove(e) {
    // mousePosition = {
    //   x: e.clientX,
    //   y: e.clientY
    // }
    // if (mouseInside) {
    //   let targetCenter = rectDimensions.height / 2
    //   let relativeMousePos = mousePosition.y - rectDimensions.top
    //   let distance = (targetCenter - relativeMousePos) / 2 // half the distance
    //   let y = targetCenter - distance
    //   console.log(`${(y / rectDimensions.height) * height}`)
    //   gsap.to(line, {
    //     attr: {
    //       d: `M000,${mid} Q ${width / 2} ${(y / rectDimensions.height) * height}, ${width},${mid}`
    //     }
    //   })
    // }
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if width && height && typeof height === 'number'}
  <svg
    bind:this={container}
    on:mouseenter={(e) => handleMouseEnter(e)}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
    viewBox={`0 0 ${width} ${height}`}
    class={`bouncy-line line absolute left-0`}
    style="transform-origin: left center; transform: translate(0px, 0px);"
    ><path
      bind:this={line}
      stroke-opacity="0"
      fill="none"
      stroke-width={`${sw}%`}
      d={`M000, ${mid} Q ${width / 2} ${mid}, ${width}, ${mid}`}
    ></path></svg
  >
{/if}

<!-- stroke-width={strokeWidth} -->
<style>
  .line {
    stroke: black;
    width: 100%;
    z-index: 800;
    /* width: 100%;
    height: 100%; */
    /* stroke-width: 0.07vw; */
  }
</style>
