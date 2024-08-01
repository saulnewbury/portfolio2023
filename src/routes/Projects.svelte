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
      width = container.getBoundingClientRect().width
      height = container.getBoundingClientRect().height
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
      width = container.getBoundingClientRect().width
      height = container.getBoundingClientRect().height
    })

    window.addEventListener('mousemove', (e) => {
      x = e.clientX
      y = e.clientY

      xTo(x + 40)
      yTo(y - relPosition)
      vXTo(x - 25)
      vYTo(y - 20)
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
      return y > rect.top && y < rect.bottom
    })

    // do nothing and make sure view lable is hidden
    if (!project && !prev) return gsap.to(view, { opacity: 0, duration: 0.3 })

    // show view label
    gsap.to(view, { opacity: 1, duration: 0.3 })

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

  function handleMouseOver(e) {
    e.stopPropagation()

    e.currentTarget.dataset.mousein = true
    gsap.to(view, { opacity: 1 })

    const clipPath = clipPaths.find(
      (p) => p.dataset.project === e.currentTarget.dataset.project
    )

    gsap.to(clipPath, {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: 0.3
    })
  }

  function handleMouseLeave(e) {
    // if mouse isn't in any of the rows hide 'view' label
    e.currentTarget.dataset.mousein = false
    const isInside = projectRows.some((p) => {
      if (p !== e.currentTarget) return p.dataset.mousein === 'true'
    })
    if (!isInside) gsap.to(view, { opacity: 0 })

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
<section class="uppercase text-[3.6rem] p-0">
  <div
    bind:this={projectsCard}
    use:portal={document.body}
    class="fixed h-[20rem] w-[15rem] z-[900] pointer-events-none"
  >
    {#each projects as project, i}
      <div class="rounded-md w-full h-full absolute top-0 left-0 rotate-6">
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

  <div class="w-full h-[100vh] px-[6vw] md:px-[3vw] flex items-center">
    <div class="w-full">
      <div class="font-body text-base mb-[3vw] flex-co">
        <span class="text-[2vw] text-red">•</span>
        <span>Projects</span>
      </div>
      <div
        class="fixed font-body bg-white rounded-full px-[0.8rem] pointer-events-none"
        bind:this={view}
        use:portal={document.body}
      >
        view
      </div>
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
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
              on:mouseover={handleMouseOver}
              on:mouseleave={handleMouseLeave}
              data-project={i}
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
