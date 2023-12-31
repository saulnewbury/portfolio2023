<script>
  import arrowRight from '$lib/icons/arrow-right.svg'

  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/dist/SplitText'
  import { eggBuilt } from '$lib/noise/noise.js'

  // Refs
  let section, button

  // Vars
  let splitText,
    lines,
    mainChars,
    btnChars,
    master,
    mainText,
    isMobile = null,
    isTablet = null,
    isDesktop = null,
    rotation = -405

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
     *  Animate Main Characters
     */

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
     * Hover effect - blur main text
     */
    for (let i = 0; i < mainChars.length; i++) {
      mainChars[i].addEventListener('mouseenter', () => {
        gsap.to(mainChars[i], {
          filter: 'blur(2px)',
          scaleX: 0.95,
          opacity: 0.9,
          color: '#AD775B',
          duration: 0.8,
          onComplete: () => {
            gsap.to(mainChars[i], {
              filter: 'blur(0px)',
              opacity: 1,
              scaleX: 1,
              color: 'black',
              duration: 1.5
            })
          }
        })
      })
    }

    for (let i = 0; i < mainChars.length; i++) {
      mainChars[i].addEventListener('mouseleave', () => {
        gsap.to(mainChars[i], {
          filter: 'blur(0px)',
          opacity: 1,
          scaleX: 1,
          color: 'black',
          duration: 1,
          delay: 0.5
        })
      })
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

  /**
   * Button hover effect
   */
  function handleMouseEnter() {
    const q = gsap.utils.selector('button')
    const splitBtnText = new SplitText(button, {
      type: 'chars'
    })
    btnChars = splitBtnText.chars
    btnChars = [...splitBtnText.chars, q('img')]

    const tl = gsap.timeline()
    for (let i = 0; i < btnChars.length + 3; i++) {
      tl.to(
        btnChars[i],
        {
          scaleX: 0.95,
          opacity: 0.9,
          color: '#AD775B',
          duration: 0.09
        },
        '<20%'
      )
      if (btnChars.length + 3 > 1)
        tl.to(
          btnChars[i - 3],
          {
            opacity: 1,
            scaleX: 1,
            color: 'black',
            duration: 0.09
          },
          '<20%'
        )
    }
    gsap.to(q('img'), { xPercent: 20, repeat: 1, yoyo: true, duration: 0.2 })
    rotation += -360
  }
</script>

<section class="hero" bind:this={section}>
  <div class={'text desktop ' + (isDesktop ? 'show' : '')}>
    <h1>Hello world! I'm Saul, a Creative Developer, interested in how</h1>
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

  <button
    bind:this={button}
    on:mouseenter={() => {
      handleMouseEnter()
    }}
  >
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

  button span:last-child {
    padding-right: 5px;
  }

  img.arrow-right {
    opacity: 0;
    width: 0.8em;
    margin-left: 0.4em;
  }

  @media screen and (max-width: 1055px) {
    section :global(h1) {
      font-size: clamp(1.8rem, 3.7vw, 2.2rem);
    }

    button {
      font-size: clamp(1.6rem, 3.2vw, 1.8rem);
    }
  }

  @media screen and (max-width: 768px) {
    section :global(h1) {
      /* font-size: 7vw; */
      font-size: clamp(1.8rem, 6vw, 2.2rem);
    }
  }
</style>
