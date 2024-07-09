<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

  // Components
  import BouncyLine from '../lib/components/BouncyLine.svelte'
  import WigglyCircle from '../lib/components/wigglyCircle.svelte'
  import Reveal from '../lib/components/Reveal.svelte'

  // Assets
  import Peace from '../lib/images/peace.svg'

  // refs
  let reveal, container

  onMount(() => {
    gsap.set(reveal, { yPercent: 100, opacity: 1 })
    gsap.set(container, { rotate: 4 })

    gsap.to(reveal, {
      yPercent: 0,
      duration: 1.5,
      delay: 1,
      ease: 'expo.out'
    })
    gsap.to(container, {
      rotate: 0,
      duration: 1.5,
      delay: 1,
      ease: 'expo.out'
    })
  })
</script>

<section class="hero min-h-full">
  <h1 class="text-[12.8vw] leading-[1] uppercase mt-[20px] mx-[4vw]">
    <div class="w-[max-content] mb-[2.2vw] ml-[4.6vw]">
      <BouncyLine delay={1} />
      <div class="inline-block">
        <Reveal
          html={'<span>hello<span>&nbsp; &nbsp; &nbsp; </span>world<span class="relative after:content-[""] after:block after:bg-red after:h-[1.12vw] after:w-[0.82vw] after:absolute after:bottom-[2.66vw] after:left-[0.4vw]">!</span></span>'}
          delay={1}
          rotation={4}
        />

        <!-- <span
          >hello<span>&nbsp; &nbsp; &nbsp; </span>world<span
            class="relative after:content-[''] after:block after:bg-red after:h-[1.12vw] after:w-[0.82vw] after:absolute after:bottom-[2.66vw] after:left-[0.4vw]"
            >!</span
          ></span
        > -->
      </div>
    </div>
    <div class=" w-[max-content] mb-[2.2vw] flex">
      <div class="w-[max-content]">
        <BouncyLine delay={1.3} />
        <Reveal html={'folio of saul newbury'} delay={1.3} rotation={-4} />
      </div>
      <div class="self-center inline-block relative h-full w-[15vw]">
        <img
          src={Peace}
          alt="peace sign"
          class="h-[14vw] w-[14vw] self-center absolute top-[-1vw] left-0 block"
        />
      </div>
      <Reveal
        html={'<span class="inline-block text-[4vw] w-[8vw] self-end mb-[2rem]"><span class="text-[red]">(</span> based in bristol<span class="text-[red]">)</span></span>'}
        delay={1.35}
        rotation={-4}
      />
    </div>
    <div class="flex justify-between justif-self-[unset]">
      <WigglyCircle />
      <div class="w-[max-content] mb-[2.2vw]">
        <BouncyLine delay={1.6} />
        <Reveal
          html={'<span class="inline-block">front end developer</span>'}
          delay={1.6}
          rotation={4}
        />
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
    grid-row-start: 0;
  }

  h1 div:first-child {
    justify-self: center;
  }

  .exclamation {
    position: relative;
  }
  .exclamation:after {
    content: '';
    display: block;
    background-color: red;
    height: 1.12vw;
    width: 0.82vw;
    position: absolute;
    bottom: 2.66vw;
    left: 0.4vw;
  }
</style>
