<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap/dist/gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

  import { getEggMesh, getSphereMesh } from '$lib/noise/noise.js'

  import bloomingdale from '../images/projects/bloomingdale.webp'
  import urchin from '../images/projects/urchin.webp'
  import veronica from '../images/projects/veronica-iii.webp'

  gsap.registerPlugin(ScrollTrigger)

  // Refs
  let one, two, three

  // Vars
  let proxy = { skew: 0 },
    eggMesh,
    sphereMesh

  onMount(() => {
    eggMesh = getEggMesh()
    sphereMesh = getSphereMesh()
    let skewSetter = gsap.quickSetter(two, 'skewY', 'deg'), // fast
      clamp = gsap.utils.clamp(-20, 20) // don't let the skew go beyond 20 degrees.
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
      { xPercent: -12 },
      { xPercent: -2, yPercent: -10, ease: 'linear' }
    )
    ScrollTrigger.create({
      animation: tween2,
      trigger: two,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -1000)
        // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          // console.log('un skew')
          proxy.skew = skew
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: 'power3',
            overwrite: true,
            onUpdate: () => {
              skewSetter(proxy.skew)
            }
          })
        }
      }
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

    // Egg
    // const sphereAnimation = gsap.to(sphereMesh.rotation, {
    //   y: 0,
    //   duration: 3,
    //   ease: 'power2.out'
    // })
    ScrollTrigger.create({
      trigger: two,
      start: 'top bottom',
      end: 'bottom top',
      markers: true,
      onEnter: () => {
        console.log('onEnter')
        gsap.to(sphereMesh?.rotation, {
          y: Math.PI * 2,
          duration: 3,
          ease: 'power2.out'
        })
        // gsap.to(eggMesh?.scale, {
        //   x: 0.2,
        //   duration: 3,
        //   ease: 'power2.out'
        // })
        gsap.to(eggMesh?.scale, {
          y: 0.2,
          duration: 3,
          ease: 'power2.out'
        })
        // gsap.to(eggMesh?.scale, {
        //   z: 0.2,
        //   duration: 3,
        //   ease: 'power2.out'
        // })
      },
      onLeaveBack: () => {
        console.log('onLeaveBack')
        gsap.set(sphereMesh?.rotation, {
          y: `-${Math.PI * 2}`
        })
      }
    })
  })
</script>

<section class="projects">
  <div data-lag="1.3" class="project one" bind:this={one}>
    <img src={bloomingdale} alt="student holding paintbrush" />
  </div>
  <div data-lag=".3" class="project two" bind:this={two}>
    <img src={urchin} alt="close up of urchin lamp showing gold leaf finish" />
  </div>
  <div data-lag=".7" class="project three" bind:this={three}>
    <img src={veronica} alt="Embroidered portrait of artists monther" />
  </div>
</section>

<style>
  section {
    /* background-color: aqua; */
    position: relative;
    display: flex;
    align-items: center;
    height: 200vh;
    width: calc();
    gap: 3px;
  }

  .project {
    box-sizing: border-box;
    height: auto;
    flex-grow: 1;
    flex-basis: 33.3333%;
    opacity: 0.7;
  }
  .one {
    margin-top: 0;
    background: rgb(97, 55, 151);
  }
  .two {
    margin-top: 45vw;
    background: rgb(37, 167, 95);
  }
  .three {
    margin-top: 20vw;
    background: grey;
  }

  img {
    width: 100%;
  }
</style>
