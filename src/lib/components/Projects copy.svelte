<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap/dist/gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import { CustomEase } from 'gsap/dist/CustomEase'

  import bloomingdale from '../images/projects/bloomingdale.webp'
  import urchin from '../images/projects/oakhanger-metalworks.png'
  import veronica from '../images/projects/veronica-iii.webp'
  import { circInOut } from 'svelte/easing'

  gsap.registerPlugin(ScrollTrigger, CustomEase)

  // Refs
  let one, two, three

  onMount(() => {
    const tween1 = gsap.fromTo(
      one,
      { xPercent: 4 },
      { xPercent: -8, ease: 'linear' }
    )
    ScrollTrigger.create({
      animation: tween1,
      trigger: one,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5
    })

    const tween2 = gsap.fromTo(
      two,
      { xPercent: -20 },
      { xPercent: -6, yPercent: -10, ease: 'linear' }
    )
    ScrollTrigger.create({
      animation: tween2,
      trigger: two,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5
    })

    const tween3 = gsap.fromTo(three, { xPercent: 2 }, { xPercent: -4 })
    ScrollTrigger.create({
      animation: tween3,
      trigger: three,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    })

    gsap.set(two, { force3D: true })
  })

  function handleMouseEnter(e) {
    gsap.to(e.currentTarget.children[0], { scale: 1.06, ease: 'power2.Out' })
  }
  function handleMouseLeave(e) {
    gsap.to(e.currentTarget.children[0], { scale: 1 })
  }
</script>

<section>
  <div class="projects">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      data-lag="1.3"
      class="project one"
      bind:this={one}
      on:mouseenter={(e) => handleMouseEnter(e)}
      on:mouseleave={(e) => handleMouseLeave(e)}
    >
      <img src={bloomingdale} alt="student holding paintbrush" />
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      data-lag=".3"
      class="project two"
      bind:this={two}
      on:mouseenter={(e) => handleMouseEnter(e)}
      on:mouseleave={(e) => handleMouseLeave(e)}
    >
      <img
        src={urchin}
        alt="close up of urchin lamp showing gold leaf finish"
      />
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      data-lag=".7"
      class="project three"
      bind:this={three}
      on:mouseenter={(e) => handleMouseEnter(e)}
      on:mouseleave={(e) => handleMouseLeave(e)}
    >
      <img src={veronica} alt="Embroidered portrait of artists monther" />
    </div>
  </div>
</section>

<style>
  section {
    position: relative;
  }

  .projects {
    display: flex;
    align-items: center;
    height: 200vh;
    width: calc();
    gap: 3px;
  }

  .project {
    /* border-radius: 1rem; */
    cursor: pointer;
    box-sizing: border-box;
    height: auto;
    flex-grow: 1;
    flex-basis: 33.3333%;
    opacity: 0.77;
    overflow: hidden;
    transition: opacity 0.3s ease-in-out;
  }

  .project:hover {
    opacity: 0.88;
  }

  .project img {
    object-fit: cover;
    object-position: 50% 50%;
    width: 100%;
    height: 100%;
  }

  /* .project img {
    transform: scale(1);
    transition: transform 0.3s ease-in-out;
  }
  .project:hover img {
    transform: scale(1.05);
  } */

  .one {
    margin-top: -45vw;
    background: rgb(97, 55, 151);
    height: 35vw;
  }
  .two {
    margin-top: -20vh;
    background: rgb(37, 167, 95);
    height: 32vw;
  }
  .three {
    margin-top: -55vh;
    background: grey;
    height: 37vw;
  }

  img {
    width: 100%;
  }
</style>
