<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/dist/SplitText'
  import { eggBuilt } from '$lib/noise/noise.js'

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
        }, 3200) // 3000
      }
    }
  })
</script>

<div bind:this={container} class="container">
  <div class={'text desktop ' + (isDesktop ? 'show' : '')}>
    <div class="line">Fluidity is the catalyst of creative endeavour, with</div>
    <div class="line">
      each conversation and adjustment embodying resilience,
    </div>
    <div class="line">
      collaboration, and a steadfast focus on user experience.
    </div>
    <div class="details">
      <p>Saul Newbury</p>
      &nbsp;&nbsp;•&nbsp;&nbsp;
      <p>Designer / Developer</p>
      &nbsp;&nbsp; • &nbsp;&nbsp;
      <a class="cv" href="/cv-saulnewbury-2025.pdf" target="_blank" donwload
        >C.V.</a
      ><br />
    </div>
    <!-- <p>* Designer / Developer</p> -->
  </div>
  <div class={'text tablet ' + (isTablet ? 'show' : '')}>
    <div class="line">Fluidity is the catalyst for creative endeavour,</div>
    <div class="line">with each dialogue and adjustment embodying</div>
    <div class="line">resilience, collaboration, and a steadfast</div>
    <div class="line">focus on user experience.</div>
    <div class="details">
      <p>Saul Newbury</p>
      &nbsp;&nbsp;•&nbsp;&nbsp;
      <p>Designer / Developer</p>
      &nbsp;&nbsp; • &nbsp;&nbsp;
      <a class="cv" href="/cv-saulnewbury-2025.pdf" target="_blank" donwload
        >C.V.</a
      ><br />
    </div>
  </div>
  <div class={'text mobile ' + (isMobile ? 'show' : '')}>
    <div class="line">Fluidity is the catalyst</div>
    <div class="line">of creative endeavour, with</div>
    <div class="line">each conversation and adjustment,</div>
    <div class="line">embodying resilience, collaboration,</div>
    <div class="line">and unwavering focus on</div>
    <div class="line">user experience.</div>
    <div class="details">
      <p>Saul Newbury</p>
      &nbsp;&nbsp;•&nbsp;&nbsp;
      <p>Designer / Developer</p>
      &nbsp;&nbsp; • &nbsp;&nbsp;
      <a class="cv" href="/cv-saulnewbury-2025.pdf" target="_blank" donwload
        >C.V.</a
      ><br />
    </div>
  </div>
</div>

<style>
  .container {
    --base: 10;
    /* padding-left: var(--gutter); */
    height: 100vh;
    width: 100vw;
    display: flex;
    padding-top: 100px;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-direction: column;
    margin: auto;
    /* text-align: center; */
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

  .container :global(.text > .line) {
    opacity: 0;
    overflow: hidden;
    font-size: clamp(1.8rem, 3.1vw, 2.5rem);
    max-width: 32em;
    line-height: 1.2em;
  }

  .cv {
    text-decoration: underline;
  }

  .container :global(.details) {
    /* font-weight: bold; */
    /* justify-content: center; */
    display: flex;
    margin-top: 35px;
    line-height: 1.5;
    align-self: flex-start;
  }
  @media screen and (max-width: 1055px) {
    .container :global(.text > .line) {
      font-size: clamp(1.8rem, 3.7vw, 2.2rem);
    }
  }

  @media screen and (max-width: 768px) {
    .container :global(.text > .line) {
      font-size: clamp(1.8rem, 6vw, 2.2rem);
    }
  }
</style>
