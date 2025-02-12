<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'

  import veronica from '../lib/images/projects/veronica-iii.webp'
  import bloomingdale from '../lib/images/projects/bloomingdale.webp'
  import oakhanger from '../lib/images/projects/blue-urchin.webp'
  import dorsetInframeCabinetry from '../lib/images/projects/bathroom.webp'
  // import barnCongigurator from '../lib/images/projects/barn-configurator.png'

  export const csr = true // CSR = Client Side Rendering

  function portal(element, target = document.body) {
    if (!target) return

    target.appendChild(element)

    return {
      destroy() {
        if (element.parentNode) {
          element.parentNode.removeChild(element)
        }
      }
    }
  }

  const projects = [
    {
      num: '01',
      name: 'Dorset Inframe Cabinetry',
      roles: ['development', 'design', 'management'],
      image: dorsetInframeCabinetry,
      alt: 'bathroom showcasing inframe cabinetry'
    },
    {
      num: '02',
      name: 'Oakhanger Metalworks',
      roles: ['development', 'design', 'management'],
      image: oakhanger,
      alt: 'lamp made to look like a golden sea urchin'
    },
    {
      num: '03',
      name: 'BIS',
      roles: ['development', 'management'],
      image: bloomingdale,
      alt: 'student doing art'
    },
    {
      num: '04',
      name: 'Jenni Cadman',
      roles: ['development', 'design', 'management'],
      image: veronica,
      alt: 'Embroidery artwork'
    }
    // {
    //   num: '05',
    //   name: 'Barn Configurator',
    //   role: 'developer and designer',
    //   image: barnCongigurator,
    //   alt: 'view of graphical barn door'
    // }
  ]

  // array of bouncy lines. me at container, iterate through bouncy line children ,and see if me should be delivered by any of them. is it inside the bounding rect
  // me at parent, which c needs a copy of me, becaase they're all e targets, you can call dispatch e method on those es and pass the same me into them

  let width,
    height,
    x,
    y,
    xTo,
    yTo,
    vXTo,
    vYTo,
    relPosition,
    throttleTimer,
    projectRows,
    prev = null,
    clipPaths

  // refs
  let container, projectsCard, view

  onMount(() => {
    // Width and height values for bouncy line
    setTimeout(() => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
    }, 200)

    clipPaths = Array.from(document.querySelectorAll('.clip-paths'))
    projectRows = Array.from(document.querySelectorAll('.projectRow'))

    gsap.set(view, { opacity: 0 })

    clipPaths.forEach((cp) => {
      gsap.set(cp, {
        clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
      })
    })

    // projects to follow mouse
    xTo = gsap.quickTo(projectsCard, 'left', {
      duration: 0.4,
      ease: 'power1.out'
    })
    yTo = gsap.quickTo(projectsCard, 'top', {
      duration: 0.4,
      ease: 'power1.out'
    })

    vXTo = gsap.quickTo(view, 'left', {
      duration: 0.2,
      ease: 'power1.out'
    })
    vYTo = gsap.quickTo(view, 'top', {
      duration: 0.2,
      ease: 'power1.out'
    })

    relPosition = projectsCard.getBoundingClientRect().height / 2

    window.addEventListener('resize', () => {
      relPosition = projectsCard.getBoundingClientRect().height / 2
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
    })

    window.addEventListener('mousemove', (e) => {
      x = e.clientX
      y = e.clientY

      xTo(x + 40)
      yTo(y - relPosition)
      vXTo(x - 36)
      vYTo(y - 40)
    })

    window.addEventListener('scroll', () => {
      throttle(revealProjectCards, 20)
    })
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

  function revealProjectCards() {
    let clipPathElement
    // Get project over which mouse lies
    const project = projectRows.find((el) => {
      const rect = el.getBoundingClientRect()
      return y > rect.top && y < rect.bottom && x > rect.left && x < rect.right
    })

    // do nothing and make sure view lable is hidden
    if (!project && !prev) return gsap.to(view, { opacity: 0, duration: 0.2 })

    // show view label
    gsap.to(view, { opacity: 1, duration: 0.2 })

    // Get corresponding clipPath
    if (project) {
      clipPathElement = clipPaths.find(
        (cp) => cp.dataset.project === project.dataset.project
      )
    }

    // If the clipPathElement and prev are the same do nothing
    console.log(clipPathElement === prev)
    if (clipPathElement === prev) return (prev = clipPathElement)
    // console.log('past the guard')

    if (prev) {
      let temp = prev
      setTimeout(() => {
        gsap.to(temp, {
          clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
          duration: 0.3,
          onComplete: () => {
            gsap.set(temp, {
              clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
            })
          }
        })
      }, 99)
      prev = null
    }

    if (clipPathElement) {
      setTimeout(() => {
        gsap.to(clipPathElement, {
          overwrite: true,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.3
        })
      }, 100)
      prev = clipPathElement
    }
  }

  function handleMouseEnter(e) {
    console.log('over my friend')
    e.stopPropagation()

    e.currentTarget.dataset.mousein = true
    gsap.to(view, { opacity: 1, duration: 0.2 })

    const clipPath = clipPaths.find(
      (p) => p.dataset.project === e.currentTarget.dataset.project
    )

    gsap.fromTo(
      clipPath,
      { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 0.3
      }
    )

    const expBg = e.currentTarget.querySelectorAll('.expandingBg')
    gsap.fromTo(
      expBg,
      { transform: 'scaleX(0%)' },
      { transform: 'scaleX(100%)' }
    )
  }

  function handleMouseLeave(e) {
    // if mouse isn't in any of the rows hide 'view' label
    e.currentTarget.dataset.mousein = false
    const expBg = e.currentTarget.querySelectorAll('.expandingBg')
    gsap.to(expBg, { scaleX: 0 })

    const isInside = projectRows.some((p) => {
      if (p !== e.currentTarget) return p.dataset.mousein === 'true'
    })
    if (!isInside) gsap.to(view, { opacity: 0, duration: 0.2 })

    // animate clip path to hide images
    const clipPath = clipPaths.find(
      (p) => p.dataset.project === e.currentTarget.dataset.project
    )

    setTimeout(() => {
      gsap.to(clipPath, {
        clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        duration: 0.3,
        onComplete: () => {
          // resets on complete
          gsap.set(clipPath, {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
          })
        }
      })
    }, 100)
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section class="text-[5.6rem] px-[var(--gutter)]">
  <div
    bind:this={projectsCard}
    use:portal={document.body}
    class="fixed h-[23rem] w-[17rem] z-[900] pointer-events-none"
  >
    {#each projects as project, i}
      <div
        class="rounded-md w-full h-full absolute top-0 left-0 rotate-6 opacity-[1]"
      >
        <div
          class="flex overflow-hidden h-full w-full clip-paths"
          data-project={i}
        >
          <img
            class="projectCardImage absolute top-0 left-0 rounded-md object-cover w-full h-full"
            src={project.image}
            alt={project.alt}
          />
        </div>
      </div>
    {/each}
  </div>

  <div class="w-full h-[100vh] px-[10vw] flex items-center">
    <div class="w-full">
      <div class="font-body text-base mb-[3vw] flex-co">
        <span class="text-[1.5vw] text-[red]">•</span>&nbsp;
        <span>Projects</span>
      </div>

      <div
        class="fixed font-body border-[black] border-dotted rounded-full h-[5em] w-[5em] px-[0.8rem] py-[0.3rem] pointer-events-none flex items-center justify-center mix-blend-multiply"
        bind:this={view}
        use:portal={document.body}
      >
        <span> view </span>
      </div>

      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <div class="h-[max-content] cursor-none">
        {#each projects as p, i}
          <div
            bind:this={container}
            class="relative project flex justify-between self-center"
          >
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <a
              href={`/projects/${p.num}`}
              class={`projectRow w-full flex items-center justify-between relative z-20 flex-col md:flex-col p-4 border-t-[1px] border-dotted border-black  ${projects.length - 1 === i ? 'border-b-[1px]' : ''}`}
              on:mouseleave={handleMouseLeave}
              on:mouseenter={handleMouseEnter}
              data-project={i}
              data-mousein={false}
            >
              <div
                class="expandingBg absolute h-full w-full z-0 bottom-[0] left-0 scale-x-[0%] px-4 bg-[#ff07070c] origin-left"
              ></div>
              <div
                class="relative z-3 self-start flex h-[max-content] w-[max-content] text-[clamp(1.8rem,2.1vw,2.8rem)] mb-3 mix-blend-difference"
              >
                <span class="mr-[15vw] font-body w-[1.3em] text-base"
                  >{p.num}</span
                >
                <span>{p.name}</span>
              </div>
              <div
                class="relative z-3 flex self-start ml-[calc(0.2em+15vw)] pb-1 mix-blend-exclusion"
              >
                {#each p.roles as r}
                  <span
                    data-role
                    class="normal-case align-middle font-body text-sm self-center inline-block border-solid border-[black] border-[1px] text-[inherit] rounded-full px-4 pt-[0.2em] pb-[0.24em] mr-2"
                    >{r}</span
                  >
                {/each}
              </div>
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
