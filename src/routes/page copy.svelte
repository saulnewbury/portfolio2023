<script>
  import arrowRight from '$lib/icons/arrow-right.svg'

  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/dist/SplitText'

  import { eggBuilt } from '$lib/noise/noise.js'

  // Refs
  let section

  // Vars
  let splitText, lines, master

  let isMobile = null
  $: htmlContent = !isMobile
    ? "<h1>I'm Saul Newbury, a freelance developer, interested in</h1> <h1>how great design, asthetics and motion can come together</h1> <h1>to enhance user experiences.</h1>"
    : "<h1>I'm Saul Newbury, a freelance developer,</h1> <h1>interested in how great design, asthetics</h1> <h1>and motion can come together to enhance</h1><h1>user experiences.</h1>"

  onMount(() => {
    const q = gsap.utils.selector(section)

    const mm = gsap.matchMedia()

    mm.add(
      '(max-width: 829px)',
      () => {
        console.log('mobile mm')
        isMobile = true
        splitTheText()
        animate()
      },
      section
    )

    mm.add(
      '(min-width: 830px)',
      () => {
        console.log('desktop mm')
        isMobile = false
        splitTheText()
        animate()
      },
      section
    )

    function splitTheText() {
      console.log('Split the text')
      splitText = new SplitText(q('h1'), { type: 'lines' })
      lines = splitText.lines
    }

    /**
     *  Animate Characters
     */

    function animate() {
      console.log('animate')
      master = gsap.timeline({ paused: true })

      function textReveal() {
        const tl = gsap.timeline()

        tl.to(q('h1'), { opacity: 1 })

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
            q('.text h1')[i],
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
      master.add(textReveal()).add(buttonReveal(), '<70%')

      if (eggBuilt) {
        master.play()
      } else {
        setTimeout(() => {
          master.play()
        }, 3000)
      }
    }
    return () => {
      master.kill()
      master.revert()
    }
  })
</script>

<section class="hero" bind:this={section}>
  <!-- <div class={'text desktop ' + !isMobile ? 'show' : ''}> -->
  <div class="text">
    {@html htmlContent}
  </div>
  <!-- <div class={'text mobile ' + isMobile ? 'show' : ''}>
    <h1>I'm Saul Newbury, a freelance developer,</h1>
    <h1>interested in how great design, asthetics</h1>
    <h1>and motion can come together to enhance</h1>
    <h1>user experiences.</h1>
  </div> -->

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

  /* section :global(.text) {
    display: none;
  }

  section :global(.text.mobile.show),
  section :global(.text.desktop.show) {
    display: block;
  } */

  section :global(h1) {
    opacity: 0;
    overflow: hidden;
    font-size: clamp(1.8rem, 3.5vw, 3.5vw);
    margin-bottom: 0.02em;
    max-width: 32em;
    line-height: 1.12em;
  }

  button {
    /* opacity: 0; */
    overflow: hidden;
    position: absolute;
    bottom: 10vh;
    right: var(--gutter);
    display: flex;
    align-items: center;
    font-size: clamp(1.4rem, 2.4vw, 2.4vw);
  }

  button span {
    display: inline-block;
  }

  img.arrow-right {
    width: 0.8em;
    margin-left: 0.4em;
  }
</style>
