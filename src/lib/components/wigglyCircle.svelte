<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

  import Star from '../images/wiggly-circle.svg'

  // refs
  let wigglyCircle, container, text

  onMount(() => {
    // intro
    gsap.fromTo(
      container,
      { x: '-50vw' },
      { x: '0vw', delay: 3, duration: 1.5 }
    )

    const tl = gsap.timeline()

    gsap.set(text, { transformOrigin: '20% bottom' })
    tl.fromTo(
      text,
      { rotate: -20 },
      { rotate: -50, delay: 3, duration: 0.8, ease: 'power1.out' }
    ).to(text, {
      rotate: -20,
      delay: 0.5,
      duration: 2.7,
      ease: 'elastic.out'
    })

    // continuous rotation
    let time = 20
    let velo
    const action = gsap.to(wigglyCircle, {
      transformOrigin: 'center',
      rotate: 360,
      repeat: -1,
      ease: 'linear',
      duration: time
    })

    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: '+=10000px',
      onUpdate: (self) => {
        velo = self.getVelocity()
        let speed = Math.max(Math.min(Math.abs(velo * 0.01), 10), 1)
        gsap.to(action, { timeScale: speed, duration: 2 })
      }
    })
  })
</script>

<div bind:this={container} class="absolute w-full h-full">
  <img
    src={Star}
    alt="wiggly circle"
    class="w-[15vw] h-[auto]"
    bind:this={wigglyCircle}
  />
  <span
    bind:this={text}
    class="w-[max-content] text-[4vw] absolute top-[56%] left-[55%] -translate-y-[50%] -translate-x-[50%] -rotate-[25deg]"
    >hire me :)</span
  >
</div>
