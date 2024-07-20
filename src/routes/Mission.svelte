<script>
  import { gsap } from 'gsap'
  import Reveal from '../lib/components/Reveal.svelte'
  import { afterUpdate, onMount } from 'svelte'

  let md,
    delay = 0

  onMount(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      md = true
    })
    mm.add('(max-width: 768px)', () => {
      md = false
    })
  })

  afterUpdate(() => {
    delay = 0
  })
</script>

{#if md}
  <section class="my-[12vw] mx-[4vw] text-[6vw] uppercase">
    <p class="leading-[1] w-[72vw]">
      <Reveal
        html={"<span class='inline-block mb-[10px]'>i'm interested in how great design and motion can</span>"}
        rotation={4}
        hasScrollTrigger={true}
        {delay}
      />
      <!-- <span class="inline-block mb-[10px]">i'm interested in how great design and motion can</span> -->
      <Reveal
        html={"<span class='inline-block mb-[10px]'>work together to create experiences that are immersive,</span>"}
        rotation={-4}
        hasScrollTrigger={true}
        {delay}
      />
      <!-- <span class="inline-block mb-[10px]">work together to create experiences that are fun,</span> -->
      <Reveal
        html={'<span class="inline-block mb-[1rem]">playful, and interactive.</span>'}
        rotation={4}
        hasScrollTrigger={true}
        {delay}
      />
    </p>
  </section>
{:else if !md}
  <section class="my-[12vw] mx-[4vw] text-[11vw] uppercase">
    <p class="leading-[1] w-[72vw]">
      <Reveal
        html={"<span class='inline-block mb-[10px]'>I'm interested in how great</span>"}
        rotation={4}
        hasScrollTrigger={true}
        {delay}
      />
      <!-- <span class="inline-block mb-[10px]">i'm interested in how great design and motion can</span> -->
      <Reveal
        html={"<span class='inline-block mb-[10px]'>design and motion can work</span>"}
        rotation={-4}
        hasScrollTrigger={true}
        {delay}
      />
      <!-- <span class="inline-block mb-[10px]">work together to create experiences that are fun,</span> -->
      <Reveal
        html={'<span class="inline-block mb-[1rem]">together to create experiences</span>'}
        rotation={4}
        hasScrollTrigger={true}
        {delay}
      />
      <!-- <span class="inline-block mb-[10px]">work together to create experiences that are fun,</span> -->
      <Reveal
        html={'<span class="inline-block mb-[1rem]">that are immersive, playful</span>'}
        rotation={4}
        hasScrollTrigger={true}
        {delay}
      />
      <!-- <span class="inline-block mb-[10px]">work together to create experiences that are fun,</span> -->
      <Reveal
        html={'<span class="inline-block mb-[1rem]">and interactive</span>'}
        rotation={4}
        hasScrollTrigger={true}
        {delay}
      />
    </p>
  </section>
{/if}
