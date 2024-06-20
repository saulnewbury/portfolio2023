<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/dist/SplitText'
  import { loadingSequenceComplete } from '$lib/noise/noise.js'
  // import scrollSmoother from '$lib/smoother.js'

  import Balance from '$lib/components/Balance.svelte'

  import arrowRight from '$lib/icons/arrow-right.svg'

  // Refs
  let section, button

  // Vars
  let splitText,
    lines,
    mainChars,
    btnCharsA,
    btnCharsB,
    master,
    mainText,
    isMobile = null,
    isTablet = null,
    isDesktop = null,
    tlA,
    tlB

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
     * Compose egg
     */
    // Check named export for when the egg has been built
    let IntervalId
    function checkEggBuilt() {
      if (loadingSequenceComplete) {
        clearInterval(IntervalId)
        intro()
      }
    }
    IntervalId = setInterval(checkEggBuilt, 300)

    /**
     *  Animate Main Characters
     */

    function splitTheText() {
      mainText = isMobile
        ? q('.mobile span')
        : isTablet
          ? q('.tablet span')
          : q('.desktop span')
      splitText = new SplitText(mainText, {
        type: 'lines, chars'
      })
      lines = splitText.lines
      mainChars = splitText.chars
      if (loadingSequenceComplete) {
        intro()
      }
    }

    /**
     * Main text hover effect
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
     * Button hover effect
     */
    const qButton = gsap.utils.selector('button')

    const splitBtnTextA = new SplitText(qButton('span:first-child'), {
      type: 'chars'
    })
    const splitBtnTextB = new SplitText(qButton('span:nth-child(2)'), {
      type: 'chars'
    })

    btnCharsA = splitBtnTextA.chars
    btnCharsB = splitBtnTextB.chars

    gsap.set(btnCharsA, { transformOrigin: 'bottom center' })

    tlA = gsap.timeline({ paused: true })
    tlB = gsap.timeline({ paused: true })

    for (let i = 0; i < btnCharsA.length; i++) {
      tlA.fromTo(
        btnCharsA[i],
        {
          yPercent: 0
        },
        {
          yPercent: -100,
          scaleY: 0,
          // skewX: -45,
          ease: 'power1.inOut'
        },
        '<3%'
      )

      tlB.fromTo(
        btnCharsB[i],
        {
          yPercent: 100
        },
        {
          yPercent: 0,
          ease: 'power1.inOut'
        },
        '<3%'
      )
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
              rotateY: 90,
              onComplete: () => {}
            },
            '<50%'
          )
        return tl
      }
      master.add(textReveal()).add(buttonReveal(), '<50%')

      master.play()
    }
  })

  /**
   * Button hover effect
   */
  function handleMouseEnter() {
    tlA.play()
    tlB.play()
  }
  function handleMouseLeave() {
    tlA.reverse()
    tlB.reverse()
  }
</script>

<section class="hero" bind:this={section}>
  <h1 class={'text desktop ' + (isDesktop ? 'show' : '')}>
    <span>I'm Saul Newbury, a Creative Developer, interested in how</span>
    <span>great design, asthetics and motion can work together to create</span>
    <span>experiences that are fun, playful and memorable.</span>
  </h1>
  <h1 class={'text tablet ' + (isTablet ? 'show' : '')}>
    <span>Hello world! I'm Saul, a Creative Developer,</span>
    <span>interested in how great design, asthetics and</span>
    <span>motion can work together to create experiences</span>
    <span>that are fun, playful and memorable.</span>
  </h1>
  <h1 class={'text mobile ' + (isMobile ? 'show' : '')}>
    <span>Hello world! I'm Saul,</span>
    <span>a Creative Developer, interested</span>
    <span>in how great design, asthetics</span>
    <span>and motion can work together</span>
    <span>to create experiences that are</span>
    <span>fun, playful and memorable.</span>
  </h1>

  <button
    bind:this={button}
    on:mouseenter={() => {
      handleMouseEnter()
    }}
    on:mouseleave={() => {
      handleMouseLeave()
    }}
  >
    <span>Get in touch</span>
    <span>Get in touch</span>
    <span>
      <img class="arrow-right" src={arrowRight} alt="arrow right" />
    </span>
  </button>
</section>

<Balance />

<style>
  section {
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
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

  section :global(h1 span) {
    display: block;
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
    right: 0;
    display: flex;
    align-items: center;
    font-size: clamp(1.6rem, 2.4vw, 2.2rem);
  }

  button > span {
    opacity: 0;
    display: inline-block;
  }

  button > span:nth-child(2) {
    position: absolute;
  }

  button > span:last-child {
    padding-right: 5px;
  }

  img.arrow-right {
    opacity: 0;
    width: 0.8em;
    margin-left: 0.4em;
  }

  .me {
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 60%;
  }

  @media screen and (max-width: 1055px) {
    section :global(h1 span) {
      font-size: clamp(1.8rem, 3.7vw, 2.2rem);
    }

    button {
      font-size: clamp(1.6rem, 3.2vw, 1.8rem);
    }
  }

  @media screen and (max-width: 768px) {
    section :global(h1 span) {
      /* font-size: 7vw; */
      font-size: clamp(1.8rem, 6vw, 2.2rem);
    }
  }
</style>
