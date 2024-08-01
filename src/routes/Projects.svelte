<script>
  import { onMount } from 'svelte'
  import BouncyLine from '../lib/components/BouncyLine.svelte'
  import { portal } from 'svelte-portal'
  import { gsap } from 'gsap'

  import veronica from '../lib/images/projects/veronica-iii.webp'
  import bloomingdale from '../lib/images/projects/bloomingdale.webp'
  import oakhanger from '../lib/images/projects/urchin1.webp'
  import barnCongigurator from '../lib/images/projects/barn-configurator.png'

  const projects = [
    {
      num: '01',
      name: 'BIS',
      role: 'developer',
      image: bloomingdale,
      alt: 'student doing art'
    },
    {
      num: '02',
      name: 'Jenni Cadman',
      role: 'developer and designer',
      image: veronica,
      alt: 'Embroidery artwork'
    },
    {
      num: '03',
      name: 'Oakhanger Metalworks',
      role: 'developer and designer',
      image: oakhanger,
      alt: 'lamp made to look like a golden sea urchin'
    },
    {
      num: '04',
      name: 'Barn Configurator',
      role: 'developer and designer',
      image: barnCongigurator,
      alt: 'view of graphical barn door'
    }
  ]

  // array of bouncy lines. me at container, iterate through bouncy line children ,and see if me should be delivered by any of them. is it inside the bounding rect
  // me at parent, which c needs a copy of me, becaase they're all e targets, you can call dispatch e method on those es and pass the same me into them

  let width,
    height,
    x,
    y,
    xTo,
    yTo,
    relPosition,
    clipPathElement,
    throttleTimer,
    elements,
    prevMouseInside

  // refs
  let container, projectsCard

  onMount(() => {
    // Width and height values for bouncy line
    setTimeout(() => {
      width = container.getBoundingClientRect().width
      height = container.getBoundingClientRect().height
    }, 200)

    // projects to follow mouse
    xTo = gsap.quickTo(projectsCard, 'left', {
      duration: 0.4,
      ease: 'power1.out'
    })
    yTo = gsap.quickTo(projectsCard, 'top', {
      duration: 0.4,
      ease: 'power1.out'
    })

    relPosition = projectsCard.getBoundingClientRect().height / 2

    window.addEventListener('resize', () => {
      relPosition = projectsCard.getBoundingClientRect().height / 2
      width = container.getBoundingClientRect().width
      height = container.getBoundingClientRect().height
    })

    window.addEventListener('mousemove', (e) => {
      x = e.clientX
      y = e.clientY

      xTo(x + 40)
      yTo(y - relPosition)
    })

    gsap.set(clipPathElement, {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
    })

    window.addEventListener('scroll', () => {
      throttle(doIt, 200)
    })

    elements = Array.from(document.querySelectorAll('.projectRow'))
  })

  function throttle(callback, time) {
    if (throttleTimer) return
    throttleTimer = true
    setTimeout(() => {
      callback()
      throttleTimer = false
    }, time)
  }

  // scroll, tt false pass, tt set to true, tout created, after .4s run fn and set tt false.

  function doIt() {
    const mouseInside = elements.some((el) => {
      const rect = el.getBoundingClientRect()
      return y > rect.top && y < rect.bottom
    })

    if (mouseInside === prevMouseInside) return (prevMouseInside = mouseInside)

    if (mouseInside) {
      // position projects cards
      gsap.to(clipPathElement, {
        overwrite: true,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 0.3
      })
      prevMouseInside = mouseInside
    } else {
      gsap.to(clipPathElement, {
        clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        duration: 0.3,
        onComplete: () => {
          gsap.set(clipPathElement, {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
          })
        }
      })
    }
  }

  function handleMouseEnter(e) {
    e.stopPropagation()

    // handle reveal
    e.currentTarget.dataset.mousein = true
    const elements = Array.from(document.querySelectorAll('.projectRow'))
    const val = elements.some((ele) => {
      ele.dataset.mousein == 'true'
    })
    prevMouseInside = val
    if (val) return
    gsap.to(clipPathElement, {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: 0.3
    })
  }

  function handleMouseLeave(e) {
    e.currentTarget.dataset.mousein = false
    setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('.projectRow'))
      const val = elements.some((ele) => ele.dataset.mousein == 'true')
      prevMouseInside = val
      if (!val) {
        gsap.to(clipPathElement, {
          clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
          duration: 0.3,
          onComplete: () => {
            // resets on complete
            gsap.set(clipPathElement, {
              clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
            })
          }
        })
      }
    }, 100)
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section class="uppercase text-[3.6rem] p-0">
  <div
    bind:this={projectsCard}
    use:portal={document.body}
    class="fixed h-[20rem] w-[14rem] z-[900]"
  >
    <div bind:this={clipPathElement} class="flex overflow-hidden h-full w-full">
      {#each projects as project}
        <div class="rounded-md">
          <img
            class="projectCardImage absolute top-0 left-0 rounded-md"
            src={project.image}
            alt={project.alt}
          />
        </div>
      {/each}
    </div>
  </div>

  <div class="w-full h-[100vh] px-[6vw] md:px-[3vw] flex items-center">
    <div class="w-full">
      <div class="font-body text-base mb-[3vw] flex-co">
        <span class="text-[2vw] text-red">•</span>
        <span>Projects</span>
      </div>
      <div class="h-[max-content]">
        {#each projects as p, i}
          <div
            bind:this={container}
            class="relative project flex justify-between self-center"
          >
            <BouncyLine
              {width}
              height={height * 1.7}
              zIndex={10 - i}
              top="-4.5rem"
            />
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <div
              class="projectRow w-full flex justify-between relative z-20 flex-col md:flex-row"
              on:mouseover={handleMouseEnter}
              on:mouseleave={handleMouseLeave}
              data-mousein={false}
            >
              <div class="flex h-[max-content] w-[max-content]">
                <span class="text-base mr-[3vw] self-center font-body"
                  >({p.num})</span
                ><span>{p.name}</span>
              </div>
              <span
                class="normal-case font-body text-base self-center hidden md:inline"
                >{p.role}</span
              >
            </div>
            {#if i + 1 === projects.length}
              <BouncyLine
                {width}
                height={height * 1.7}
                zIndex={10 - projects.length}
                top="0.8rem"
              />
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- last-of-type:border-b-[1px] border-t-[1px] border-black  -->
