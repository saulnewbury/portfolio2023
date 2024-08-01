<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'

  import { loadingSequenceComplete } from '../lib/noise/noise.js'

  // Components
  import BouncyLine from '../lib/components/BouncyLine.svelte'
  import WigglyCircle from '../lib/components/WigglyCircle.svelte'
  import Reveal from '../lib/components/Reveal.svelte'

  // Assets
  import Egg from '../lib/images/egg.png'

  let oneWidth = 0,
    twoWidth = 0,
    threeWidth = 0,
    containerHeight = 0,
    delay = 3

  // refs
  let one, two, three, four, egg

  onMount(() => {
    console.log('is this working')

    if (loadingSequenceComplete) {
      delay = 0.5
    }

    // give browser time
    setTimeout(() => {
      oneWidth = one.getBoundingClientRect().width
      twoWidth = two.getBoundingClientRect().width
      threeWidth = three.getBoundingClientRect().width
      containerHeight = three.getBoundingClientRect().height * 0.9
    }, 200)

    gsap.fromTo(egg, { opacity: 0 }, { opacity: 0.8, delay, duration: 1 })
  })
</script>

<section class="hero min-h-full">
  <div
    class="heading text-[24.8vw] md:text-[12.8vw] leading-[1] uppercase mt-[20px] px-[6vw]"
  >
    <div
      bind:this={one}
      class="row w-[max-content] mb-[2.2vw] md:ml-[4.6vw] md:h-[14vw]] justify-self-start md:justify-self-center"
    >
      <BouncyLine delay={3} width={oneWidth} height={containerHeight} />
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
          class="w-[13vw] md:w-[9.5vw] absolute top-[3px] md:top-[5px] left-[50%] -translate-x-[73%] mix-blend-difference opacity-0"
        />
      </div>
    </div>
    <div class="row mb-[2.2vw] flex justify-between w-full">
      <div bind:this={two}>
        <BouncyLine
          delay={3.2}
          reverse="true"
          width={twoWidth}
          height={containerHeight}
        />
        <Reveal html={'folio of saul newbury'} delay={3.2} rotation={-5} />
      </div>
      <div class="flex h-full items-start relative">
        <div class="absolute left-0">
          <Reveal
            html={'<span class="inline-block text-[4vw]"><span class="text-[red]">(</span> based in bristol <span class="text-[red]">)</span></span>'}
            delay={3.3}
            rotation={-5}
          />
        </div>
      </div>
    </div>
    <div class="row flex justify-between justif-self-[unset]">
      <div
        class="relative w-[15vw] h-full md:flex items-center mx-[auto] order-2 md:order-1 hidden md:w-[15vw]"
      >
        <WigglyCircle />
      </div>
      <div bind:this={three} class="order-1 md:order-2">
        <BouncyLine delay={3.4} width={threeWidth} height={containerHeight} />
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
    /* grid-row-start: 0; */
  }

  /* .row {
    height: 14vw;
  } */
  /* h1 div:first-child {
    justify-self: center;
  } */
</style>
