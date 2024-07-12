<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'

  // Components
  import BouncyLine from '../lib/components/BouncyLine.svelte'
  import WigglyCircle from '../lib/components/WigglyCircle.svelte'
  import Reveal from '../lib/components/Reveal.svelte'

  // Assets
  import Peace from '../lib/images/peace.svg'
  import Egg from '../lib/images/egg.png'
  import { elasticIn } from 'svelte/easing'

  let oneWidth = 0,
    twoWidth = 0,
    threeWidth = 0,
    container = 0

  // refs
  let one, two, three, egg, peace

  onMount(() => {
    oneWidth = one.getBoundingClientRect().width
    twoWidth = two.getBoundingClientRect().width
    threeWidth = three.getBoundingClientRect().width
    container = three.getBoundingClientRect().height * 0.9

    gsap.fromTo(egg, { opacity: 0 }, { opacity: 0.8, delay: 3, duration: 1 })

    gsap.fromTo(
      peace,
      { rotate: 360, scale: 0 },
      {
        rotate: 0,
        scale: 1,
        duration: 2.5,
        delay: 3.5,
        ease: 'elastic.out(1,1)'
      }
    )
  })
</script>

<section class="hero min-h-full">
  <h1 class="text-[12.8vw] leading-[1] uppercase mt-[20px] mx-[4vw]">
    <div bind:this={one} class="row w-[max-content] mb-[2.2vw] ml-[4.6vw]">
      <BouncyLine delay={1} width={oneWidth} height={container} />
      <div class="relative">
        <Reveal
          html={'<span>hello<span class="ml-[2.5vw]">&nbsp; &nbsp; &nbsp; </span>world<span class="relative after:content-[""] after:block after:bg-red after:h-[1.12vw] after:w-[0.82vw] after:absolute after:bottom-[2.66vw] after:left-[0.4vw]">!</span></span>'}
          delay={1}
          rotation={4}
        />
        <img
          bind:this={egg}
          src={Egg}
          alt="egg"
          class="w-[9.5vw] absolute top-[5px] left-[50%] -translate-x-[73%] mix-blend-difference opacity-0"
        />
      </div>
    </div>
    <div class="row w-[max-content] mb-[2.2vw] flex">
      <div bind:this={two}>
        <BouncyLine
          delay={1.2}
          reverse="true"
          width={twoWidth}
          height={container}
        />
        <Reveal html={'folio of saul newbury'} delay={1.2} rotation={-5} />
      </div>
      <div class="self-center inline-block relative w-[15vw] h-full">
        <img
          bind:this={peace}
          src={Peace}
          alt="peace sign"
          class="h-[14vw] w-[14vw] self-center absolute top-[-1vw] left-0 block scale-0"
        />
      </div>
      <div class="flex h-full items-start relative">
        <div class="absolute top-[-2vw] left-0">
          <Reveal
            html={'<span class="inline-block text-[4vw] w-[8vw]"><span class="text-[red]">(</span> based in bristol <span class="text-[red]">)</span></span>'}
            delay={1.3}
            rotation={-5}
          />
        </div>
      </div>
    </div>
    <div class="row flex justify-between justif-self-[unset]">
      <div class="relative w-[15vw] h-full m-auto">
        <WigglyCircle />
      </div>
      <div bind:this={three}>
        <BouncyLine delay={1.4} width={threeWidth} height={container} />
        <div class="inline-block">
          <Reveal
            html={'<span class="inline-block">frontend developer</span>'}
            delay={1.4}
            rotation={5}
          />
        </div>
      </div>
    </div>
  </h1>
</section>

<style>
  h1 {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
  }

  h1 div {
    position: relative;
    /* grid-row-start: 0; */
  }

  .row {
    height: 14vw;
  }
  h1 div:first-child {
    justify-self: center;
  }
</style>
