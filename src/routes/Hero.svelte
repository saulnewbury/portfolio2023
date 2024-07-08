<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

  import Peace from '../lib/images/peace.svg'
  import Star from '../lib/images/wiggly-circle.svg'

  // refs
  let wigglyCircle
  onMount(() => {
    let time = 25
    let velo

    const action = gsap.to(wigglyCircle, {
      transformOrigin: 'center',
      rotate: 360,
      repeat: -1,
      // ease: 'Power0.easeNone',
      ease: 'linear',
      duration: time
    })

    let limit = 15

    const scrollMeter = ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: '+=10000px',
      onUpdate: (self) => {
        velo = self.getVelocity()
        let speed = Math.max(Math.abs(velo * 0.01), 1)
        gsap.to(action, { timeScale: speed, duration: 1 })
      }
    })
  })
</script>

<section class="hero min-h-full">
  <h1 class="text-[12.8vw] leading-[1] uppercase mt-[20px] mx-[4vw]">
    <div class="line w-[max-content] mb-[3.5vw] ml-[4.6vw]">
      <span class="inline-block"
        >hello <span>&nbsp; &nbsp; &nbsp; </span>world<span class="exclamation"
          >!</span
        ></span
      >
    </div>
    <div class=" w-[max-content] mb-[3.5vw] flex">
      <div class="line w-[max-content]">
        <span class="inline-block">folio of saul newbury</span>
      </div>
      <div class="self-center inline-block relative h-full w-[15vw]">
        <img
          src={Peace}
          alt="peace sign"
          class="h-[14vw] w-[14vw] self-center absolute top-[-1vw] left-0 block"
        />
      </div>
      <span class="inline-block text-[4vw] w-[8vw] self-end mb-[2rem]"
        ><span class="text-[red]">(</span> based in bristol
        <span class="text-[red]">)</span></span
      >
    </div>
    <div class="flex justify-between justif-self-[unset]">
      <div class="relative w-[15vw] h-full m-auto">
        <img
          src={Star}
          alt="wiggly circle"
          class="w-[15vw] h-[auto]"
          bind:this={wigglyCircle}
        />
        <span
          class="hire-text text-[4vw] absolute top-[45%] left-[50%] -translate-y-[50%] -translate-x-[50%] -rotate-[25deg]"
          >hire me :)</span
        >
      </div>
      <div class=" line w-[max-content]">
        <span class="inline-block">front end developer</span>
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

  h1 .line::before {
    content: '';
    display: block;
    background-color: black;
    height: 1px;
    width: 100%;
    position: absolute;
    top: -0.5vw;
    left: 0px;
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
    height: 15px;
    width: 12px;
    position: absolute;
    bottom: 2.66vw;
    left: 0.4vw;
  }
</style>
