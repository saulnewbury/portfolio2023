<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

  export let html = '',
    delay = 0,
    rotation = 0,
    hasScrollTrigger = false

  // refs
  let reveal, container

  delay = delay + 1.5

  onMount(() => {
    let d = 2
    gsap.set(reveal, { yPercent: 100, opacity: 1 })
    gsap.set(container, { rotate: rotation })

    console.log(delay)
    const text = gsap.to(reveal, {
      yPercent: 0,
      duration: d,
      delay: delay,
      ease: 'expo.out'
    })
    const box = gsap.to(container, {
      rotate: 0,
      duration: d,
      delay: delay,
      ease: 'expo.out'
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
