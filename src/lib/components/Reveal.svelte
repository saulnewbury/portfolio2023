<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

  export let html = '',
    delay = 2,
    rotation = 0,
    hasScrollTrigger = false

  // refs
  let reveal, container

  onMount(() => {
    let d = 1
    gsap.set(reveal, { yPercent: 100, opacity: 1 })
    gsap.set(container, { rotate: rotation })

    // console.log(delay)
    const text = gsap.to(reveal, {
      yPercent: 0,
      duration: d,
      delay,
      // ease: 'expo.out',
      ease: 'power1.Out'
    })
    const box = gsap.to(container, {
      rotate: 0,
      duration: d,
      delay: delay,
      ease: 'power1.Out'
    })

    if (hasScrollTrigger) {
      ScrollTrigger.create({
        animation: text,
        trigger: container,
        start: 'top 80%'
      })

      ScrollTrigger.create({
        animation: box,
        trigger: container,
        start: 'top 80%'
      })
    }
  })
</script>

<div bind:this={container} class="overflow-hidden">
  <span bind:this={reveal} class="inline-block opacity-0">
    {@html html}
  </span>
</div>
