<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'

  // Components
  import BouncyLine from '../lib/components/BouncyLine.svelte'
  import Reveal from '../lib/components/Reveal.svelte'

  import { loadingSequenceComplete } from '../lib/noise/noise.js'

  // Assets
  import Egg from '../lib/images/egg.png'

  let oneWidth = 0,
    twoWidth = 0,
    threeWidth = 0,
    container = 0,
    delay = 3

  // refs
  let one,
    two,
    three,
    egg,
    top = '-12vw'

  onMount(() => {
    console.log('Mobile')

    if (loadingSequenceComplete) {
      delay = 0.5
    }

    // give browser time
    setTimeout(() => {
      oneWidth = one.getBoundingClientRect().width
      twoWidth = two.getBoundingClientRect().width
      threeWidth = three.getBoundingClientRect().width
      container = three.getBoundingClientRect().height * 0.9
    }, 200)

    gsap.fromTo(egg, { opacity: 0 }, { opacity: 0.8, delay, duration: 1 })
  })
</script>

<section class="hero min-h-full px-[6vw]">
  <div class="heading text-[19.8vw] leading-[1] uppercase mt-[40px]">
    <!-- Hello World -->
    <div
      bind:this={one}
      class="row w-[max-content] mb-[5.2vw] justify-self-start"
    >
      <BouncyLine delay={3} width={oneWidth} height={container} {top} />
      <div class="relative">
        <Reveal
          html={'<span>hello<span class="ml-[2.5vw]">&nbsp; &nbsp; &nbsp; </span>world<span class="relative">!</span></span>'}
          delay={3}
          rotation={4}
        />
        <img
          bind:this={egg}
          src={Egg}
          alt="egg"
          class="w-[0.75em] absolute top-[4px] left-[50%] -translate-x-[73%] mix-blend-difference opacity-0"
        />
      </div>
    </div>
    <!-- Folio of -->
    <div class="row mb-[5.2vw] flex justify-between w-full">
      <div bind:this={two}>
        <BouncyLine
          delay={3.2}
          reverse="true"
          width={twoWidth}
          height={container}
          {top}
        />
        <Reveal html={'folio of saul newbury'} delay={3.2} rotation={-5} />
      </div>
    </div>
    <!-- Frontend developer-->
    <div class="row flex justify-between justif-self-[unset]">
      <div bind:this={three} class="order-1">
        <BouncyLine delay={3.4} width={threeWidth} height={container} {top} />
        <div class="inline-block">
          <Reveal
            html={'<span class="inline-block">frontend developer</span>'}
            delay={3.4}
            rotation={5}
          />
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .heading {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
  }

  .heading div {
    position: relative;
  }
</style>
