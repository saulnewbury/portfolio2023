<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import { SplitText } from 'gsap/dist/SplitText'

  gsap.registerPlugin(ScrollTrigger, SplitText)

  let hero

  onMount(() => {
    console.log(ScrollTrigger)
    const q = gsap.utils.selector(hero),
      splitText1 = new SplitText(q('.line1'), { type: 'words, chars' }),
      chars1 = splitText1.chars, //an array of all the divs that wrap each character
      splitText2 = new SplitText(q('.line2'), { type: 'words, chars' }),
      chars2 = splitText2.chars, //an array of all the divs that wrap each character
      splitText3 = new SplitText(q('.line3'), { type: 'words, chars' }),
      chars3 = splitText3.chars, //an array of all the divs that wrap each character
      base = 3

    /**
     *  Animate Characters
     */
    function animateText(chars, startTime) {
      const tl = gsap.timeline({ paused: true })
      for (let i = 0; i < chars.length; i++) {
        tl.fromTo(
          chars[i],
          { y: base },
          {
            y: `-${base}`,
            repeat: 1000,
            yoyo: true,
            ease: 'power1.inOut',
            duration: 1,
          },
          `<.1`
        )
      }
      tl.play(startTime)
      return tl
    }

    animateText(chars1, 1)
    animateText(chars2, 2)
    animateText(chars3, 2.4)

    /**
     *  Animate Lines
     */
    // gsap.to('.line', { y: 100 })
    gsap.fromTo(
      q('.line'),
      { yPercent: 20, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.2, duration: 1 }
    )
  })
</script>

<section class="Hero" bind:this={hero}>
  <div class="background" />
  <h1 class="">
    <span class="line line1"> I'm a frontend developer with endless </span>
    <span class="line line2">
      curiosity for how an interactive UI can move
    </span>
    <span class="line line3">to create exceptional user experiences</span>
  </h1>
</section>

<style>
  .Hero {
    height: 100vh;
    display: flex;
    align-items: center;
  }

  .background {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150vw;
    height: 150vh;
    /* width: 50vw;
    height: 50vh; */
    transform: translate(-50%, -50%);
    --gr-deg: 173;
    --gr-1: hsl(217, 100%, 75%);
    --gr-2: hsl(342, 100%, 80%);
    --gr-3: hsl(44, 100%, 75%);
    --gr-4: hsl(114, 100%, 75%);

    background: linear-gradient(
      170deg,
      var(--gr-1),
      var(--gr-2),
      var(--gr-3),
      var(--gr-4),
      var(--gr-1),
      var(--gr-2),
      var(--gr-3),
      var(--gr-4)
    );
  }

  h1 {
    margin: auto;
    text-align: center;
    max-width: 60vw;
    line-height: 3;
    letter-spacing: 0.3rem;
    font-size: 1.6rem;
  }

  span {
    display: inline-block;
  }
</style>
