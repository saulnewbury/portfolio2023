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
    }
    // {
    //   num: '04',
    //   name: 'Barn Configurator',
    //   role: 'developer and designer',
    //   image: barnCongigurator,
    //   alt: 'view of graphical barn door'
    // }
  ]

  const images = [bloomingdale, veronica, oakhanger]

  let width, height, x, y, xTo, yTo, relPosition, clipPathElement

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
      x = e.pageX + 40
      y = e.pageY - relPosition

      xTo(x)
      yTo(y)
    })

    // clip path

    gsap.set(clipPathElement, {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
    })
  })

  function handleMouseEnter(e) {
    e.currentTarget.dataset.mouseIn = true
    gsap.to(clipPathElement, {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: 0.5
    })
  }
  function handleMouseLeave(e) {
    console.log(e.currentTarget.dataset.mouseIn)
    e.currentTarget.dataset.mouseIn = false
    console.log(e.currentTarget.dataset.mouseIn)

    setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('.projectRow'))
      const val = elements.some((ele) => {
        ele.dataset.mouseIn === true
      })

      if (!val) {
        console.log('bla')
        gsap.to(clipPathElement, {
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          duration: 0.5
        })
      }
    }, 100)
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section class="uppercase mx-[4vw] text-[4vw] my-[15vw]" bind:this={section}>
  <div
    bind:this={projectsCard}
    class="absolute h-[25vw] w-[18vw] top-0 left-0 z-[900]"
  >
    <div bind:this={clipPathElement} class="flex overflow-hidden h-full w-full">
      {#each projects as project}
        <div
          style={`background-image: url(${project.image}); background-size: cover`}
          class={`h-full w-full absolute top-0 left-0`}
        ></div>
        <!-- <img
          class="projectCardImage absolute top-0 left-0"
          src={project.image}
          alt={project.alt}
        /> -->
      {/each}
    </div>
  </div>

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
        <BouncyLine {width} height={height * 1.7} zIndex={10 - i} top={-5.1} />
        <div
          class="projectRow w-full flex justify-between relative z-20"
          on:mouseenter={handleMouseEnter}
          on:mouseleave={handleMouseLeave}
          data-mouseIn={false}
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
</section>

<!-- last-of-type:border-b-[1px] border-t-[1px] border-black  -->
