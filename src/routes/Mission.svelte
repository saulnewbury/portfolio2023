<script context="module">
  import { addQueries } from '../lib/mediaQueries.js'
</script>

<script>
  import { afterUpdate, onMount } from 'svelte'

  import Reveal from '../lib/components/Reveal.svelte'

  import { md } from '../lib/stores.js'

  let delay = 0

  onMount(() => {
    addQueries()
  })

  afterUpdate(() => {
    delay = 0
  })
</script>

{#if $md}
  {#key 'true'}
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
  {/key}
{:else}
  {#key 'false'}
    <section class="my-[12vw] mx-[4vw] text-[11vw] uppercase">
      <p class="leading-[1] w-[72vw]">
        <Reveal
          html={"<span class='inline-block mb-[0.4rem]'>I'm interested in how great</span>"}
          rotation={4}
          hasScrollTrigger={true}
          {delay}
        />
        <!-- <span class="inline-block mb-[10px]">i'm interested in how great design and motion can</span> -->
        <Reveal
          html={"<span class='inline-block mb-[0.4rem]'>design and motion can work</span>"}
          rotation={-4}
          hasScrollTrigger={true}
          {delay}
        />
        <!-- <span class="inline-block mb-[10px]">work together to create experiences that are fun,</span> -->
        <Reveal
          html={'<span class="inline-block mb-[0.4rem]">together to create experiences</span>'}
          rotation={4}
          hasScrollTrigger={true}
          {delay}
        />
        <!-- <span class="inline-block mb-[10px]">work together to create experiences that are fun,</span> -->
        <Reveal
          html={'<span class="inline-block mb-[0.4rem]">that are immersive, playful</span>'}
          rotation={4}
          hasScrollTrigger={true}
          {delay}
        />
        <!-- <span class="inline-block mb-[10px]">work together to create experiences that are fun,</span> -->
        <Reveal
          html={'<span class="inline-block mb-[0.4rem]">and interactive</span>'}
          rotation={4}
          hasScrollTrigger={true}
          {delay}
        />
      </p>
    </section>
  {/key}
{/if}
