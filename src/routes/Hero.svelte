<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  // Components
  import BouncyLine from '../lib/components/BouncyLine.svelte'
  import WigglyCircle from '../lib/components/WigglyCircle.svelte'
  import Reveal from '../lib/components/Reveal.svelte'

  // Assets
  import Peace from '../lib/images/peace.svg'

  let oneWidth, twoWidth, threeWidth, oneHeight, twoHeight, threeHeight

  // refs
  let one, two, three

  onMount(() => {
    oneWidth = one.getBoundingClientRect().width
    twoWidth = two.getBoundingClientRect().width
    threeWidth = three.getBoundingClientRect().width
    oneHeight = one.getBoundingClientRect().height
    twoHeight = two.getBoundingClientRect().height
    threeHeight = three.getBoundingClientRect().height
  })
</script>

<section class="hero min-h-full">
  <h1 class="text-[12.8vw] leading-[1] uppercase mt-[20px] mx-[4vw]">
    <div bind:this={one} class="row w-[max-content] mb-[2.2vw] ml-[4.6vw]">
      <BouncyLine delay={1} width={oneWidth} height={oneHeight} />
      <div class="inline-block">
        <Reveal
          html={'<span>hello<span>&nbsp; &nbsp; &nbsp; </span>world<span class="relative after:content-[""] after:block after:bg-red after:h-[1.12vw] after:w-[0.82vw] after:absolute after:bottom-[2.66vw] after:left-[0.4vw]">!</span></span>'}
          delay={1}
          rotation={4}
        />
      </div>
    </div>
    <div class="row w-[max-content] mb-[2.2vw] flex">
      <div bind:this={two} class="inline-block">
        <BouncyLine
          delay={1.2}
          reverse="true"
          width={twoWidth}
          height={twoHeight}
        />
        <Reveal html={'folio of saul newbury'} delay={1.2} rotation={-5} />
      </div>
      <div class="self-center inline-block relative w-[15vw] h-full">
        <img
          src={Peace}
          alt="peace sign"
          class="h-[14vw] w-[14vw] self-center absolute top-[-1vw] left-0 block"
        />
      </div>
      <Reveal
        html={'<span class="inline-block text-[4vw] w-[8vw] self-end mb-[2rem]"><span class="text-[red]">(</span> based in bristol<span class="text-[red]">)</span></span>'}
        delay={1.3}
        rotation={-5}
      />
    </div>
    <div class="row flex justify-between justif-self-[unset]">
      <div class="relative w-[15vw] h-full m-auto">
        <WigglyCircle />
      </div>
      <div bind:this={three}>
        <BouncyLine delay={1.4} width={threeWidth} height={threeHeight} />
        <div class="inline-block">
          <Reveal
            html={'<span class="inline-block">front end developer</span>'}
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
