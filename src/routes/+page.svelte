<script>
  import { onMount } from 'svelte'

  // Vars
  // let mainChars

  onMount(() => {
    /**
     * Main text hover effect
     */
    // for (let i = 0; i < mainChars.length; i++) {
    //   mainChars[i].addEventListener('mouseenter', () => {
    //     gsap.to(mainChars[i], {
    //       filter: 'blur(2px)',
    //       scaleX: 0.95,
    //       opacity: 0.9,
    //       color: '#AD775B',
    //       duration: 0.8,
    //       onComplete: () => {
    //         gsap.to(mainChars[i], {
    //           filter: 'blur(0px)',
    //           opacity: 1,
    //           scaleX: 1,
    //           color: 'black',
    //           duration: 1.5
    //         })
    //       }
    //     })
    //   })
    // }
    // for (let i = 0; i < mainChars.length; i++) {
    //   mainChars[i].addEventListener('mouseleave', () => {
    //     gsap.to(mainChars[i], {
    //       filter: 'blur(0px)',
    //       opacity: 1,
    //       scaleX: 1,
    //       color: 'black',
    //       duration: 1,
    //       delay: 0.5
    //     })
    //   })
    // }
  })
</script>

<section class="hero"></section>

<!-- <Balance /> -->

<style>
  section {
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    opacity: 0;
  }
</style>
