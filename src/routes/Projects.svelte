<script>
  import { onMount } from 'svelte'
  import BouncyLine from '../lib/components/BouncyLine.svelte'
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
      url: '../lib/images/projects/veronica-iii.webp',
      alt: 'student doing art'
    },
    {
      num: '02',
      name: 'Jenni Cadman',
      role: 'developer and designer',
      image: veronica,
      url: '../lib/images/projects/bloomingdale.webp',
      alt: 'Embroidery artwork'
    },
    {
      num: '03',
      name: 'Oakhanger Metalworks',
      role: 'developer and designer',
      image: oakhanger,
      url: '../lib/images/projects/urchin1.webp',
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

  const images = [bloomingdale, veronica, oakhanger]

  let width,
    height,
    x,
    y,
    xTo,
    yTo,
    relPosition,
    clipPathElement,
    elTop,
    elBottom,
    throttleTimer,
    elements,
    px,
    py

  // refs
  let section, container, projectsCard

  onMount(() => {
    // Width and height values for bouncy line
    width = container.getBoundingClientRect().width
    height = container.getBoundingClientRect().height

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
    })

    window.addEventListener('mousemove', (e) => {
      x = e.clientX
      y = e.clientY

      // coords for positioning projects cards
      px = e.pageX
      py = e.pageY

      console.log(px, py)

      xTo(x + 40)
      yTo(y - relPosition)
    })

    gsap.set(clipPathElement, {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
    })

    window.addEventListener('scroll', () => {
      throttle(doIt, 10)
    })

    elements = Array.from(document.querySelectorAll('.projectRow'))
  })

  function throttle(callback, time) {
    xTo(x)
    yTo(y)
    if (throttleTimer) return
    throttleTimer = true
    setTimeout(() => {
      callback()
      throttleTimer = false
    }, time)
  }

  // scroll, tt false pass, tt set to true, tout created, after .4s run fn and set tt false.

  function doIt() {
    // console.log('do it')

    const mouseInside = elements.some((el) => {
      return (
        y > el.getBoundingClientRect().top &&
        y < el.getBoundingClientRect().bottom
      )
    })

    if (mouseInside) {
      // position projects cards
      gsap.to(clipPathElement, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 0.5
      })
    } else {
      gsap.to(clipPathElement, {
        clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        duration: 0.5,
        onComplete: () => {
          gsap.set(clipPathElement, {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
          })
        }
      })
    }
  }

  function handleMouseEnter(e) {
    e.currentTarget.dataset.mousein = true
    const elements = Array.from(document.querySelectorAll('.projectRow'))
    const val = elements.some((ele) => {
      ele.dataset.mousein == 'true'
    })
    if (val) return
    gsap.to(clipPathElement, {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: 0.5
    })
  }
  function handleMouseLeave(e) {
    e.currentTarget.dataset.mousein = false
    setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('.projectRow'))
      const val = elements.some((ele) => ele.dataset.mousein == 'true')
      if (!val) {
        gsap.to(clipPathElement, {
          clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
          duration: 0.5,
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
<section class="uppercase text-[4vw] p-0" bind:this={section}>
  <div class="fixed h-full w-full top-0 left-0">
    <div bind:this={projectsCard} class="absolute h-[20rem] w-[14rem] z-[900]">
      <div
        bind:this={clipPathElement}
        class="flex overflow-hidden h-full w-full"
      >
        {#each projects as project}
          <!-- <div
            style={`background-image: url(${project.image}); background-size: cover`}
            class={`h-full w-full absolute top-0 left-0 rounded-md`}
          ></div> -->
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
  </div>

  <div class="w-full h-[100vh] px-[8vw] flex items-center">
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
              top={-5.1}
            />
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <div
              class="projectRow w-full flex justify-between relative z-20"
              on:mouseover={handleMouseEnter}
              on:mouseleave={handleMouseLeave}
              data-mousein={false}
            >
              <div class="flex h-[max-content] w-[max-content]">
                <span class="num text-[1vw] mr-[3vw] self-center font-body"
                  >({p.num})</span
                ><span>{p.name}</span>
              </div>
              <span class="role normal-case font-body text-base self-center"
                >{p.role}</span
              >
            </div>
            {#if i + 1 === projects.length}
              <BouncyLine
                {width}
                height={height * 1.7}
                zIndex={10 - projects.length}
                top={0.8}
              />
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- last-of-type:border-b-[1px] border-t-[1px] border-black  -->
