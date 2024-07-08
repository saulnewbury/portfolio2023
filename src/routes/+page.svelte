<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
  gsap.registerPlugin(ScrollSmoother)

  import Peace from '../lib/images/peace.svg'
  import Star from '../lib/images/wiggly-circle.svg'
  Star
  // Vars
  // let mainChars

  onMount(() => {
    ScrollSmoother.create({
      smooth: 0.2, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0.1 // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    })
  })
</script>

<section class="min-h-full">
  <h1 class="text-[12.8vw] leading-[1] uppercase mt-[25px] mx-[4vw]">
    <div class="line w-[max-content] mb-[3.5vw] ml-[4.6vw]">
      <span class="inline-block"
        >hello <span>&nbsp; &nbsp; &nbsp; </span>world<span class="text-[13vw]"
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
        <img src={Star} alt="wiggly circle" class="w-[15vw] h-[auto]" />
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
<!-- mission -->
<section class="my-[12vw] mx-[4vw] text-[6vw] uppercase">
  <p class="leading-[1] w-[65vw]">
    i'm interested in how great design and motion can work together to create
    experiences that are fun, playful and immersive
  </p>
</section>
<!-- projects -->
<section class="uppercase mx-[4vw] text-[4vw] my-[12vw]">
  <div>Projects</div>
  <div
    class="project flex justify-between border-b-[1px] border-t-[1px] border-black"
  >
    <div class="flex">
      <span class="num text-[1vw] mr-[3vw] self-center">(01)</span><span
        >BIS</span
      >
    </div>
    <span class="role normal-case">Developer</span>
  </div>
  <div class="project flex justify-between border-b-[1px] border-black">
    <div class="flex">
      <span class="num text-[1vw] mr-[3vw] self-center">(01)</span><span
        >BIS</span
      >
    </div>
    <span class="role normal-case">Developer</span>
  </div>
  <div class="project flex justify-between border-b-[1px] border-black">
    <div class=" flex">
      <span class="num text-[1vw] mr-[3vw] self-center">(01)</span><span
        >BIS</span
      >
    </div>
    <span class="role normal-case">Developer</span>
  </div>
  <div class="project flex justify-between border-b-[1px] border-black">
    <div class="flex">
      <span class="num text-[1vw] mr-[3vw] self-center">(01)</span><span
        >BIS</span
      >
    </div>
    <span class="role normal-case">Developer</span>
  </div>
</section>
<section>Contact</section>

<!-- <SpinTransition /> -->

<style>
  section {
    padding: 75px 4vw 0;
  }

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
  .num,
  .role {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1vw;
    align-self: center;
  }
</style>
