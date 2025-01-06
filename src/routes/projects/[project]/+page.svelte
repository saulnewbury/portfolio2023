<script>
  import veronica from '../../../lib/images/projects/veronica-iii.webp'

  import BouncyLine from '../../../lib/components/BouncyLine.svelte'
  import { onMount } from 'svelte'

  let titleWidth, titleHeight, sectionWidth, sectionHeight

  // refs
  let title, section

  onMount(() => {
    const tRect = title.getBoundingClientRect()
    titleWidth = tRect.width
    titleHeight = tRect.height

    const sRect = section.getBoundingClientRect()
    sectionWidth = sRect.width
    sectionHeight = sRect.height

    window.addEventListener('resize', () => {
      const tRect = title.getBoundingClientRect()
      titleWidth = tRect.width
      titleHeight = tRect.height

      const sRect = section.getBoundingClientRect()
      sectionWidth = sRect.width
      sectionHeight = sRect.height
    })
  })
</script>

<section class="relative h-[100vh] mx-[6vw]" bind:this={section}>
  <!-- <div class="w-full h-full px-[6vw]"> -->
  <div class="absolute w-[35vw] right-[7vw] top-[5em] rotate-6">
    <img
      src={veronica}
      alt="Example of Jenni Cadmans embroidery work"
      class="block object-cover w-[100%] h-[100%]"
    />
  </div>
  <div
    bind:this={title}
    class="relative text-[24.8vw] md:text-[12.8vw] leading-[1] uppercase mt-[20px] w-[fit-content]"
  >
    <div class="mb-[3rem]">Jenni <br />Cadman</div>
    <BouncyLine
      width={titleWidth}
      height={titleHeight / 2.5}
      top={`${titleHeight / 22}vw`}
    />
    <p class="font-body text-base normal-case leading-5">
      "Drawin with the needle, Jenni creates <br /> artworks that speak for themselves"
    </p>
  </div>
  <BouncyLine
    width={sectionWidth}
    height={sectionHeight / 2.5}
    top={`${sectionHeight / 16}vw`}
  />
  <!-- </div> -->
</section>
