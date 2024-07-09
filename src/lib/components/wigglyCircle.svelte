<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

  import Star from '../images/wiggly-circle.svg'

  // refs
  let wigglyCircle

  onMount(() => {
    let time = 20
    let velo

    const action = gsap.to(wigglyCircle, {
      transformOrigin: 'center',
      rotate: 360,
      repeat: -1,
      // ease: 'Power0.easeNone',
      ease: 'linear',
      duration: time
    })

    let limit = 15

    const scrollMeter = ScrollTrigger.create({
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

<div class="relative w-[15vw] h-full m-auto -translate-y-7">
  <img
    src={Star}
    alt="wiggly circle"
    class="w-[15vw] h-[auto]"
    bind:this={wigglyCircle}
  />
  <span
    class="hire-text text-[4vw] absolute top-[45%] left-[50%] -translate-y-[50%] -translate-x-[50%] -rotate-[25deg]"
    >hire me :)</span
  >
</div>

<style>
</style>
