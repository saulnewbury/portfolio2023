<script>
  import arrowRight from '$lib/icons/arrow-right.svg'

  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/dist/SplitText'

  import { eggBuilt } from '$lib/noise/noise.js'

  let section

  onMount(() => {
    const q = gsap.utils.selector(section)
    const splitText = new SplitText(q('h1'), { type: 'lines' })
    const lines = splitText.lines

    /**
     *  Animate Characters
     */
    function textReveal() {
      const tl = gsap.timeline({
        // paused: true
      })

      tl.to(q('h1'), { opacity: 1 })

      for (let i = 0; i < lines.length; i++) {
        tl.from(
          lines[i],
          {
            opacity: 0,
            yPercent: 80,
            duration: 0.8,
            ease: 'linear'
          },
          `<.15`
        ).from(
          q('.text h1')[i],
          {
            // y: -10,
            y: -39,
            ease: 'linear',
            duration: 0.8
          },
          '<'
        )
      }

      return tl
    }

    if (eggBuilt) {
      textReveal()
    } else {
      setTimeout(() => {
        textReveal()
      }, 3900)
    }
  })
</script>

<section class="hero" bind:this={section}>
  <!-- I'm Saul Newbury, a freelance developer<br />
    passionate about how great design, <br />
    asthetics and motion come together to <br />
    make memorable experiences. -->
  <div class="text">
    <h1>I'm Saul Newbury, a freelance developer passionate</h1>
    <h1>about how great design, asthetics and motion can come</h1>
    <h1>together to make memorable experiences.</h1>
  </div>

  <button
    >Get in touch <img
      class="arrow-right"
      src={arrowRight}
      alt="arrow right"
    /></button
  >
</section>

<style>
  section {
    height: 100vh;
    display: flex;
    align-items: center;
  }

  h1 {
    opacity: 0;
    overflow: hidden;
    font-size: 2.7rem;
    /* font-size: 1.2rem; */
    margin-bottom: 0.02em;
    max-width: 32em;
    line-height: 1.12em;
  }

  button {
    position: absolute;
    bottom: 10vh;
    right: var(--gutter);
    display: flex;
    align-items: center;
  }

  img.arrow-right {
    width: 25px;
    margin-left: 0.5em;
  }

  /* @media screen and (min-width: 1046px) {
    .container {
      margin-left: auto;
      margin-right: auto;
      padding-right: var(--gutter-lg);
    }
  } */
</style>
