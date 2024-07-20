<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

  import Star from '../images/wiggly-circle.svg'

  // refs
  let wigglyCircle, container, text

  onMount(() => {
    // intro

    const mm = gsap.matchMedia()

    mm.add('(max-width: 768px)', () => {
      // TODO: if intro anim done set delay to 0

      gsap.fromTo(
        container,
        { scale: 0 },
        { scale: 1.3, delay: 3, duration: 1, ease: 'power1.out' }
      )
    })
    mm.add('(min-width: 769px)', () => {
      gsap.fromTo(
        container,
        { scale: 0 },
        { scale: 1, delay: 3, duration: 1, ease: 'power1.out' }
      )
    })

    gsap.set(text, { xPercent: -50, yPercent: -50 })

    const tl = gsap.timeline()

    tl.fromTo(
      text,
      { rotate: -360 },
      { rotate: -25, delay: 3, duration: 1.5, ease: 'elastic.out(1,1)' }
    )

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

<div bind:this={container} class="absolute w-full">
  <img
    src={Star}
    alt="wiggly circle"
    class="w-[19vw] md:w-[15vw] h-[auto]"
    bind:this={wigglyCircle}
  />
  <span
    bind:this={text}
    class="w-[max-content] text-[4vw] absolute top-[50%] left-[50%] -rotate-[25deg]"
    >hire me :)</span
  >
</div>
