<script>
  import { gsap } from 'gsap'
  import { onMount } from 'svelte'

  // props
  export let delay = 0,
    reverse = false,
    width = 0,
    height = 160,
    zIndex = 900,
    top = '-7.2vw'

  let mouseInside,
    dim,
    x = 0,
    y = null,
    mid,
    sw,
    bouncyLines,
    current,
    prev,
    introDone = false

  // refs
  let line, container

  // account for egg intro anim

  $: if (width && height && typeof height === 'number') {
    mid = height / 2

    if (container && !introDone) {
      bouncyLines = Array.from(document.querySelectorAll('.bouncy-line'))
      gsap.set(container, { zIndex, top })
      const start = reverse
        ? `M ${width} ${mid}, Q ${width} 200, ${width} ${mid}`
        : `M000, ${mid} Q 0 200, 0, ${mid}`
      const end = reverse
        ? `M 0 ${mid}, Q ${width / 2} ${mid}, ${width} ${mid}`
        : `M000, ${mid} Q ${width / 2} ${mid}, ${width}, ${mid}`

      gsap.fromTo(
        line,
        { attr: { d: start, strokeOpacity: 1 } },
        {
          immediateRender: false,
          attr: { d: end },
          duration: 0.8,
          delay: delay,
          strokeOpacity: 1,
          onComplete: () => (introDone = true)
        }
      )
    }

    const diag = Math.sqrt(width ** 2 + height ** 2)
    sw = (0.1 * window.innerWidth) / diag
    // introDone = true
  }

  onMount(() => {
    window.addEventListener('mousemove', animation)
    return () => {
      window.removeEventListener('mousemove', animation)
    }
  })

  function animation(e) {
    if (!introDone) return
    x = e.clientX
    y = e.clientY

    const { el, r } = getElementUnderMouse(x, y)

    current = el

    if (current) {
      dim = { height: r.height, top: r.top }

      if (!prev || current === prev) {
        if (!prev) prev = current
        insideAnimation(
          current.children[0],
          y,
          current.dataset.width,
          current.dataset.height
        )
      } else if (prev && current !== prev) {
        insideAnimation(
          current.children[0],
          y,
          current.dataset.width,
          current.dataset.height
        )
        leaveAnimation(
          prev.children[0],
          prev.dataset.width,
          prev.dataset.height
        )
        prev = current
      }
    } else if (!current && prev) {
      leaveAnimation(prev.children[0], prev.dataset.width, prev.dataset.height)
      prev = null
      current = null
    } else {
      dim = null
      // do nothing
    }
  }

  function getElementUnderMouse(x, y) {
    let obj = {}
    const r = container.getBoundingClientRect()
    if (y > r.top && y < r.bottom && x > r.left && x < r.right) {
      obj = { el: container, r }
    }
    return obj
  }

  function insideAnimation(el, y, w, h) {
    let targetCenter = dim.height / 2
    let relativeMousePos = y - dim.top
    let distance = (targetCenter - relativeMousePos) / 2 // half the distance
    let num = targetCenter - distance
    gsap.to(el, {
      overwrite: true,
      ease: 'elastic.out(1.5, 0.3)',
      attr: {
        d: `M000, ${h / 2} Q ${w / 2} ${(num / dim.height) * h}, ${w},${h / 2}`
      },
      duration: 2
    })
  }

  function leaveAnimation(el, w, h) {
    gsap.to(el, {
      overwrite: true,
      ease: 'elastic.out(1.5, 0.3)',
      attr: { d: `M000, ${h / 2} Q ${w / 2} ${h / 2}, ${w}, ${h / 2}` },
      duration: 1
    })
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if width && height && typeof height === 'number'}
  <svg
    bind:this={container}
    viewBox={`0 0 ${width} ${height}`}
    class={`bouncy-line line absolute left-0`}
    style="transform-origin: left center; transform: translate(0px, 0px);"
    data-width={width}
    data-height={height}
    ><path
      bind:this={line}
      stroke-opacity="0"
      fill="none"
      stroke-width={`${sw}%`}
      d={`M000, ${mid} Q ${width / 2} ${mid}, ${width}, ${mid}`}
    ></path></svg
  >
{/if}

<style>
  .line {
    stroke: black;
    width: 100%;
  }
</style>
