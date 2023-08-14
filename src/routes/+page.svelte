<script>
  import arrowRight from '$lib/icons/arrow-right.svg'

  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/dist/SplitText'
  import { eggBuilt } from '$lib/noise/noise.js'

  // Refs
  let section

  // Vars
  let splitText,
    lines,
    master,
    text,
    isMobile = null,
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

    /**
     *  Animate Characters
     */

    function splitTheText() {
      text = isMobile
        ? q('.mobile h1')
        : isTablet
        ? q('.tablet h1')
        : q('.desktop h1')
      console.log('Split the text')
      splitText = new SplitText(text, {
        type: 'lines'
      })
      lines = splitText.lines

      animate()
    }

    function animate() {
      master = gsap.timeline({ paused: true })

      function textReveal() {
        const tl = gsap.timeline()
        tl.to(text, { opacity: 1 })
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
            text[i],
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

      function buttonReveal() {
        const tl = gsap.timeline()
        gsap.set(q('button'), { opacity: 1 })
        gsap.set(q('button span'), { opacity: 1 })
        gsap.set(q('button img'), { opacity: 1 })

        tl.from(q('button span'), { yPercent: 100, duration: 0.8 })
          .from(q('button'), { y: -15, duration: 0.8 }, '<')
          .from(
            q('button img'),
            {
              rotateY: 90
            },
            '<50%'
          )
        return tl
      }
      master.add(textReveal()).add(buttonReveal(), '<50%')

      if (eggBuilt) {
        master.play()
      } else {
        setTimeout(() => {
          master.play()
        }, 3600) // 3000
      }
    }
  })
</script>

<section class="hero" bind:this={section}>
  <div class={'text desktop ' + (isDesktop ? 'show' : '')}>
    <h1>The humble egg is as beautiful and timeless as it is functional.</h1>
    <h1>Nestled under its mothers breast, a miraculous process unfolds,</h1>
    <h1>until at last, a baby website is born!</h1>
  </div>
  <div class={'text tablet ' + (isTablet ? 'show' : '')}>
    <h1>The humble egg is as beautiful and timeless as</h1>
    <h1>it is functional. Nestled under its mothers breast,</h1>
    <h1>a miraculous process unfolds, until at last, a baby</h1>
    <h1>website is born!</h1>
  </div>
  <div class={'text mobile ' + (isMobile ? 'show' : '')}>
    <h1>The humble egg is as</h1>
    <h1>beautiful and timeless</h1>
    <h1>as it is functional. Nestled</h1>
    <h1>under its mothers breast,</h1>
    <h1>a miraculous process</h1>
    <h1>unfolds until at last,</h1>
    <h1>a baby website is born.</h1>
  </div>

  <button>
    <span>Get in touch</span>
    <span>
      <img class="arrow-right" src={arrowRight} alt="arrow right" />
    </span>
  </button>
</section>

<style>
  section {
    height: 100vh;
    display: flex;
    align-items: center;
  }

  section :global(.text) {
    visibility: hidden;
    position: absolute;
  }

  section :global(.text.mobile.show),
  section :global(.text.tablet.show),
  section :global(.text.desktop.show) {
    position: unset;
    visibility: visible;
  }

  section :global(h1) {
    opacity: 0;
    overflow: hidden;
    font-size: clamp(1.8rem, 3.1vw, 3rem);
    margin-bottom: 0.02em;
    max-width: 32em;
    line-height: 1.12em;
  }

  button {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    bottom: 10vh;
    right: var(--gutter);
    display: flex;
    align-items: center;
    font-size: clamp(1.6rem, 2.4vw, 2.2rem);
  }

  button span {
    opacity: 0;
    display: inline-block;
  }

  img.arrow-right {
    opacity: 0;
    width: 0.8em;
    margin-left: 0.4em;
  }

  @media screen and (max-width: 1055px) {
    section :global(h1) {
      font-size: clamp(1.8rem, 4.2vw, 2.4rem);
    }

    button {
      font-size: clamp(1.6rem, 4vw, 2rem);
    }
  }

  @media screen and (max-width: 768px) {
    section :global(h1) {
      /* font-size: 7vw; */
      font-size: clamp(1.8rem, 7vw, 2.8rem);
    }
  }
</style>
