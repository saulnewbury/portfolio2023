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
      '(max-width: 611px)',
      () => {
        isMobile = true
        isTablet = false
        isDesktop = false
        splitTheText()
      },
      section
    )

    mm.add(
      '(min-width: 612px) and (max-width: 1055px)',
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
      master.add(textReveal()).add(buttonReveal(), '<60%')

      if (eggBuilt) {
        master.play()
      } else {
        setTimeout(() => {
          master.play()
        }, 3600)
      }
    }
  })
</script>

<section class="hero" bind:this={section}>
  <div class={'text desktop ' + (isDesktop ? 'show' : '')}>
    <h1>I'm Saul Newbury, a freelance developer, interested in</h1>
    <h1>how great design, asthetics and motion can come together</h1>
    <h1>to enhance user experiences.</h1>
  </div>
  <div class={'text tablet ' + (isTablet ? 'show' : '')}>
    <h1>I'm <span>Saul Newbury</span>, a freelance developer,</h1>
    <h1>interested in how great design, asthetics</h1>
    <h1>and motion can come together to enhance</h1>
    <h1>user experiences.</h1>
  </div>
  <div class={'text mobile ' + (isMobile ? 'show' : '')}>
    <h1>I'm Saul Newbury, a</h1>
    <h1>freelance developer,</h1>
    <h1>interested in how great</h1>
    <h1>design, asthetics and</h1>
    <h1>motion can come together</h1>
    <h1>to enhance user experiences.</h1>
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
    font-size: clamp(1.8rem, 3.5vw, 3rem);
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
      font-size: clamp(1.8rem, 4.9vw, 2.8rem);
    }

    button {
      font-size: clamp(1.6rem, 4vw, 2rem);
    }
  }

  @media screen and (max-width: 611px) {
    section :global(h1) {
      /* font-size: 7vw; */
      font-size: clamp(1.8rem, 7vw, 2.8rem);
    }
  }
</style>
