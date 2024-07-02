<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/dist/SplitText'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import { eggBuilt } from '$lib/noise/noise.js'
  import { tweened } from 'svelte/motion'

  // refs
  let container

  // Vars
  let isMobile = null,
    isTablet = null,
    isDesktop = null,
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
        ? q('.mobile h1')
        : isTablet
          ? q('.tablet h1')
          : q('.desktop h1')
      splitText = new SplitText(mainText, {
        type: 'lines, chars'
      })
      lines = splitText.lines
      mainChars = splitText.chars
      intro()
    }

    /**
     * intro
     */
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
              // y: -39,
              duration: 0.8
            },
            '<'
          )
        }
        return tl
      }

      master.add(textReveal(), '<50%')

      if (eggBuilt) {
        console.log('egg built')
        master.play()
      } else {
        setTimeout(() => {
          master.play()
        }, 3600) // 3000
      }

      ScrollTrigger.create({
        start: 1,
        end: '90%',
        scrub: true,
        markers: true,
        onUpdate: (self) => {
          console.log(self)
          if (self.direction === 1 && self.progress > 0.1) {
            master.timeScale(1.8).reverse()
          } else if (self.direction === -1 && self.progress < 0.4) {
            console.log(
              'backwards' + ' ' + self.direction + ' ' + self.progress
            )
            master.timeScale(1).play()
          }
        }
      })
    }
  })
</script>

<div bind:this={container} class="container">
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
  .container {
    padding-left: var(--gutter);
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    position: fixed;
    /* mix-blend-mode: color-burn; */
  }

  .container :global(.text) {
    visibility: hidden;
    position: absolute;
  }

  .container :global(.text.mobile.show),
  .container :global(.text.tablet.show),
  .container :global(.text.desktop.show) {
    position: unset;
    visibility: visible;
  }

  .container :global(h1) {
    opacity: 0;
    overflow: hidden;
    font-size: clamp(1.8rem, 3.1vw, 3rem);
    margin-bottom: 0.02em;
    max-width: 32em;
    line-height: 1.12em;
  }
  @media screen and (max-width: 1055px) {
    .container :global(h1) {
      font-size: clamp(1.8rem, 3.7vw, 2.2rem);
    }
  }

  @media screen and (max-width: 768px) {
    .container :global(h1) {
      /* font-size: 7vw; */
      font-size: clamp(1.8rem, 6vw, 2.2rem);
    }
  }
</style>
