<script>
  import { onMount, onDestroy } from 'svelte'
  import { browser } from '$app/environment'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/dist/SplitText'
  import { eggBuilt } from '$lib/noise/noise.js'

  // refs
  let container

  // Vars
  let isMobile = null,
    isTablet = null,
    isDesktop = null,
    currentSize = '',
    master,
    mainText,
    splitText,
    lines,
    mainChars

  onMount(() => {
    const q = gsap.utils.selector(container)
    const mm = gsap.matchMedia()

    mm.add(
      '(max-width: 768px)',
      () => {
        isMobile = true
        isTablet = false
        isDesktop = false
        splitTheText()
      },
      container
    )

    mm.add(
      '(min-width: 769px) and (max-width: 1055px)',
      () => {
        isMobile = false
        isTablet = true
        isDesktop = false
        splitTheText()
      },
      container
    )

    mm.add(
      '(min-width: 1056px)',
      () => {
        isTablet = false
        isMobile = false
        isDesktop = true
        splitTheText()
      },
      container
    )

    // Animate characters
    function splitTheText() {
      mainText = isMobile
        ? q('.mobile .line')
        : isTablet
          ? q('.tablet .line')
          : q('.desktop .line')
      splitText = new SplitText(mainText, {
        type: 'lines, chars'
      })
      lines = splitText.lines
      mainChars = splitText.chars
      intro()
    }

    function intro() {
      master = gsap.timeline({ paused: true })

      function textReveal() {
        const tl = gsap.timeline()
        tl.to(mainText, { opacity: 1 })
        for (let i = 0; i < lines.length; i++) {
          tl.from(
            lines[i],
            {
              opacity: 0,
              yPercent: 80,
              duration: 0.8
            },
            `<.2`
          ).from(
            mainText[i],
            {
              y: -20,
              duration: 0.8
            },
            '<'
          )
        }
        return tl
      }

      function rolesReveal() {
        const tl = gsap.timeline()
        tl.from(q('.details'), { opacity: 0, duration: 1 })
        return tl
      }

      master.add(textReveal(), '<50%').add(rolesReveal(), '<80%')

      if (eggBuilt) {
        console.log('egg built')
        master.play()
      } else {
        setTimeout(() => {
          master.play()
        }, 3200)
      }
    }
  })

  $: textContent = {
    desktop: {
      lines: [
        'Fluidity is the catalyst of creative endeavour, with',
        'each conversation and adjustment embodying resilience,',
        'collaboration, and a steadfast focus on user experience.'
      ],
      show: currentSize === 'desktop'
    },
    tablet: {
      lines: [
        'Fluidity is the catalyst for creative endeavour,',
        'with each dialogue and adjustment embodying',
        'resilience, collaboration, and a steadfast',
        'focus on user experience.'
      ],
      show: currentSize === 'tablet'
    },
    mobile: {
      lines: [
        'Fluidity is the catalyst',
        'of creative endeavour, with',
        'each conversation and adjustment,',
        'embodying resilience, collaboration,',
        'and unwavering focus on',
        'user experience.'
      ],
      show: currentSize === 'mobile'
    }
  }

  function updateSize() {
    if (!browser) return
    const width = window.innerWidth
    currentSize = width <= 768 ? 'mobile' : width <= 1055 ? 'tablet' : 'desktop'
  }

  onMount(() => {
    if (!browser) return
    gsap.registerPlugin(SplitText)
    updateSize()
    window.addEventListener('resize', updateSize)
    // animate()
  })

  onDestroy(() => {
    if (!browser) return
    window.removeEventListener('resize', updateSize)
    if (timeline) timeline.kill()
    if (splitText) splitText.revert()
  })
</script>

<div
  bind:this={container}
  class="h-screen w-screen flex items-center justify-center pt-24"
>
  {#each Object.entries(textContent) as [size, { lines, show }]}
    <div
      class="text-container {size} {show ? 'visible' : 'invisible absolute'}"
    >
      {#each lines as line}
        <div
          class="line opacity-0 overflow-hidden text-2xl lg:text-4xl max-w-3xl leading-tight"
        >
          {line}
        </div>
      {/each}
      <div class="details flex mt-8 space-x-2">
        <p>Saul Newbury</p>
        <span>•</span>
        <p>Designer / Developer</p>
        <span>•</span>
        <a
          href="/cv-saulnewbury-2025.pdf"
          class="underline"
          target="_blank"
          rel="noopener">C.V.</a
        >
      </div>
    </div>
  {/each}
</div>
