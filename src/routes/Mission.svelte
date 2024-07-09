<script>
  import Reveal from '../lib/components/Reveal.svelte'

  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
</script>

<section class="my-[12vw] mx-[4vw] text-[6vw] uppercase">
  <p class="leading-[1] w-[65vw]">
    <Reveal
      html={"<span class='inline-block mb-[10px]'>i'm interested in how great design and motion can</span>"}
      rotation={4}
      hasScrollTrigger={true}
    />
    <!-- <span class="inline-block mb-[10px]">i'm interested in how great design and motion can</span> -->
    <Reveal
      html={"<span class='inline-block mb-[10px]'>work together to create experiences that are fun,</span>"}
      rotation={-4}
      hasScrollTrigger={true}
    />
    <!-- <span class="inline-block mb-[10px]">work together to create experiences that are fun,</span> -->
    <Reveal
      html={'<span class="inline-block mb-[1rem]">playful and immersive . . .</span>'}
      rotation={4}
      hasScrollTrigger={true}
    />
  </p>
</section>
