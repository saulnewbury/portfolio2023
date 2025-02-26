<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/dist/SplitText'
  import { eggBuilt } from '$lib/noise/noise.js'

  // refs
  let container

  // Vars
  let isMobile = null,
    isTablet = null,
    isDesktop = null,
    master,
    mainText,
    splitText,
    lines,
    mainChars

  onMount(() => {
    const q = gsap.utils.selector(container)
    const mm = gsap.matchMedia()

    mm.add(
      '(max-width: 768px)',
      () => {
        isMobile = true
        isTablet = false
        isDesktop = false
        splitTheText()
      },
      container
    )

    mm.add(
      '(min-width: 769px) and (max-width: 1055px)',
      () => {
        isMobile = false
        isTablet = true
        isDesktop = false
        splitTheText()
      },
      container
    )

    mm.add(
      '(min-width: 1056px)',
      () => {
        isTablet = false
        isMobile = false
        isDesktop = true
        splitTheText()
      },
      container
    )

    // Animate characters
    function splitTheText() {
      mainText = isMobile
        ? q('.mobile .line')
        : isTablet
          ? q('.tablet .line')
          : q('.desktop .line')
      splitText = new SplitText(mainText, {
        type: 'lines, chars'
      })
      lines = splitText.lines
      mainChars = splitText.chars
      intro()
    }

    function intro() {
      master = gsap.timeline({ paused: true })

      function textReveal() {
        const tl = gsap.timeline()
        tl.to(mainText, { opacity: 1 })
        for (let i = 0; i < lines.length; i++) {
          tl.from(
            lines[i],
            {
              opacity: 0,
              yPercent: 80,
              duration: 0.8
            },
            `<.2`
          ).from(
            mainText[i],
            {
              y: -20,
              duration: 0.8
            },
            '<'
          )
        }
        return tl
      }

      function rolesReveal() {
        const tl = gsap.timeline()
        tl.from(q('.details'), { opacity: 0, duration: 1 })
        return tl
      }
      function buttonReveal() {
        const tl = gsap.timeline()
        tl.from(q('button'), { opacity: 0, duration: 1 })
        return tl
      }

      master
        .add(textReveal(), '<50%')
        .add(rolesReveal(), '<80%')
        .add(buttonReveal(), '<20%')

      if (eggBuilt) {
        console.log('egg built')
        master.play()
      } else {
        setTimeout(() => {
          master.play()
        }, 3200)
      }
    }
  })
</script>

<div
  bind:this={container}
  class="h-screen w-screen flex items-center justify-center relative flex-col m-auto pt-24"
>
  <div class={'text desktop ' + (isDesktop ? 'visible' : 'invisible absolute')}>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,2.3vw,2.2rem)] leading-[1.2em]"
    >
      Hey everyone! I'm Saul, a Web Designer and Developer who
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,2.3vw,2.2rem)] leading-[1.2em]"
    >
      thrives at the intersection of fluidity and creativity, where excellent
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,2.3vw,2.2rem)] leading-[1.2em]"
    >
      design reflects resilience, collaboration, and a sharp focus on
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,2.3vw,2.2rem)] leading-[1.2em]"
    >
      user experience. For any info just <a
        class="text-[red] mix-blend-difference"
        href="mailto:hello@saulnewbury.com">contact me</a
      >!
    </div>

    <div class="relative details flex mt-8 self-start">
      <p>Based in Bristol (UK)</p>
    </div>
  </div>

  <div class={'text tablet ' + (isTablet ? 'visible' : 'invisible absolute')}>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,3.7vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      Hey everyone! I'm Saul, a Web Designer
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,3.7vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      and Developer who thrives at the intersection
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,3.7vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      of fluidity and creativity, where excellent design
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,3.7vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      reflects resilience, collaboration, and a sharp
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,3.7vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      focus on user experience.
    </div>
    <br /> <br />
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,3.7vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      For any info just <a
        class="text-[red] mix-blend-difference"
        href="mailto:hello@saulnewbury.com">contact me</a
      >!
    </div>
    <div class="details flex mt-8 self-start">
      <p>Based in Bristol (UK)</p>
    </div>
  </div>

  <div class={'text mobile ' + (isMobile ? 'visible' : 'invisible absolute')}>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.5rem,3.7vw,2.5rem)] max-w-[32em] leading-[1.2em]"
    >
      Hey everyone! I'm Saul,
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.5rem,3.7vw,2.5rem)] max-w-[32em] leading-[1.2em]"
    >
      a Web Designer and Developer who
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.5rem,3.7vw,2.5rem)] max-w-[32em] leading-[1.2em]"
    >
      thrives at the intersection of fluidity and
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.5rem,3.7vw,2.5rem)] max-w-[32em] leading-[1.2em]"
    >
      creativity, where excellent design reflects
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.5rem,3.7vw,2.5rem)] max-w-[32em] leading-[1.2em]"
    >
      resilience, collaboration, and a sharp
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.5rem,3.7vw,2.5rem)] max-w-[32em] leading-[1.2em]"
    >
      focus on user experience.
    </div>
    <br /> <br />
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.5rem,3.7vw,2.5rem)] max-w-[32em] leading-[1.2em]"
    >
      For any info just <a
        class="text-[red] mix-blend-difference"
        href="mailto:hello@saulnewbury.com">contact me</a
      >!
    </div>
    <div class="details flex mt-8 self-start">
      <p>Based in Bristol (UK)</p>
    </div>
  </div>
</div>
