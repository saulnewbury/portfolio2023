<script>
  import './global.css'

  import { initialiseThreeJSScene } from '$lib/noise/noise.js'
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/dist/SplitText'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
  import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
  import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
  import { GSDevTools } from 'gsap/dist/GSDevTools'

  import Time from './Time.svelte'

  // components
  import HeroText from './HeroText.svelte'

  gsap.registerPlugin(
    SplitText,
    ScrollTrigger,
    ScrollSmoother,
    GSDevTools,
    ScrollToPlugin
  )

  // Refs
  let nav, canvas, overlayOne, overlayTwo, overlayColor

  onMount(() => {
    window.scrollTo(0, 0)
    initialiseThreeJSScene(canvas, overlayOne, overlayTwo)

    const q = gsap.utils.selector(nav)
    setTimeout(() => {
      gsap.to('.brand-name, .right a, .time', {
        opacity: 1,
        duration: 1,
        stagger: 0.1
      })
    }, 3500)

    gsap.fromTo(
      overlayOne,
      {
        backgroundColor: 'rgba(0, 0, 0, 1)'
      },
      {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        duration: 2.5,
        delay: 0.2
      }
    )
    gsap.from(canvas, { opacity: 0, duration: 1, delay: 0.2 })
  })
</script>

<nav bind:this={nav}>
  <a
    class="brand-name border-b-[1px] border-black border-solid flex items-center hover:text-[red] hover:border-[red]"
    style={{ color: 'red' }}
    href="mailto:hello@saulnewbury.com"
  >
    <span class="mr-1">
      <svg
        width={`${23 * 0.6}`}
        height={`${21 * 0.6}`}
        viewBox={`0 0 ${23} ${21}`}
        fill="current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.2071 13.7071C22.5976 13.3166 22.5976 12.6834 22.2071 12.2929L15.8431 5.92893C15.4526 5.53841 14.8195 5.53841 14.4289 5.92893C14.0384 6.31946 14.0384 6.95262 14.4289 7.34315L20.0858 13L14.4289 18.6569C14.0384 19.0474 14.0384 19.6805 14.4289 20.0711C14.8195 20.4616 15.4526 20.4616 15.8431 20.0711L22.2071 13.7071ZM0.5 0.5V9H2.5V0.5H0.5ZM5.5 14H21.5V12H5.5V14ZM0.5 9C0.5 11.7614 2.73858 14 5.5 14V12C3.84315 12 2.5 10.6569 2.5 9H0.5Z"
          fill="currentColor"
        />
      </svg>
    </span>
    <span>Get in touch</span></a
  >

  <div class="right">
    <a href="/">Saul Newbury</a>
  </div>
</nav>
<!-- <div class="bottom">
  <p class="time text-[#000000]"><Time /></p>
</div> -->

<canvas class="webgl" bind:this={canvas} />

<div class="overlay one" bind:this={overlayOne} />
<div class="overlay two" bind:this={overlayTwo} />

<!-- <div class="overlay color" bind:this={overlayColor}></div> -->

<HeroText />

<!-- <div class="title">Bloomingdale</div> -->

<!-- <div class="content-container"></div> -->

<!-- <div id="smooth-wrapper">
  <div id="smooth-content">
    <div class="content">
      <slot />
    </div>
  </div>
</div> -->

<style>
  /* nav */
  nav {
    padding: 3.5rem var(--gutter) 0;
    display: flex;
    justify-content: space-between;
    position: fixed;
    z-index: 100;
    width: 100vw;
  }

  a.brand-name {
    opacity: 0;
    /* font-size: 1.2rem;
    font-weight: 600; */
  }

  .right a,
  .time {
    opacity: 0;
  }

  .right a:not(:last-child) {
    margin-right: 0.5rem;
    text-align: right;
  }

  .webgl {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
  }

  div.bottom {
    /* font-size: 3em; */
    /* font-size: clamp(1.2rem, 3.1vw, 2rem); */
    line-height: 1.6;
    position: absolute;
    bottom: 3.5rem;
    right: var(--gutter);
    z-index: 100;
  }

  .content {
    /* pointer-events: none; */
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 var(--gutter);
  }

  .overlay {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .overlay.one {
    background-color: rgba(0, 0, 0, 1);
    mix-blend-mode: hard-light;
  }

  .overlay.two {
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.6);
    mix-blend-mode: overlay;
  }
  .title {
    font-size: 20vw;
    font-size: 12vw;
    position: fixed;
    /* top: 10vh; */
    bottom: 10vh;
    left: var(--gutter);
    z-index: 909;
    mix-blend-mode: color-burn;
    color: black;
    line-height: 0.8;
  }

  .overlay.color {
    position: fixed;
    height: 100vh;
    background-color: rgb(72, 71, 71);
    opacity: 0.8;
    mix-blend-mode: difference;
  }

  #smooth-wrapper {
    position: relative;
  }

  @media screen and (max-width: 768px) {
    .content {
      padding: 0 var(--gutter-mob);
    }

    nav {
      padding: 2rem var(--gutter-mob) 0;
    }
  }
</style>
