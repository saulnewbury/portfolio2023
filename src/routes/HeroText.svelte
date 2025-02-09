<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/dist/SplitText'
  import { eggBuilt } from '$lib/noise/noise.js'

  import Time from './Time.svelte'

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
  class="h-screen w-screen flex justify-center relative flex-col pt-24 px-[var(--gutter)]"
>
  <div
    class={'text desktop  pl-[10vw] ' +
      (isDesktop ? 'visible' : 'invisible absolute')}
  >
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,2.73vw,2.8rem)] max-w-[32em] leading-[1.2em]"
    >
      Fluidity is the catalyst for creative endeavour, with
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,2.73vw,2.8rem)] max-w-[32em] leading-[1.2em]"
    >
      each conversation and adjustment embodying resilience,
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,2.73vw,2.8rem)] max-w-[32em] leading-[1.2em]"
    >
      collaboration, and an unwavering focus on user experience.
    </div>
    <div class="relative details flex mt-8 self-start items-center">
      <p>Designer & Developer</p>
      <span class="mx-2">•</span>

      <p class="time text-[#000000]">
        Bristol &nbsp;(<span class="text-[red]"><Time /></span>)
      </p>
      <span class="mx-2">•</span>
      <a
        class="underline hover:text-[red]"
        href="/cv-saulnewbury-2025.pdf"
        donwload
        target="_blank">C V</a
      >
    </div>
  </div>

  <div
    class={'text tablet pl-[8vw] ' +
      (isTablet ? 'visible' : 'invisible absolute')}
  >
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,3.7vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      Fluidity is the catalyst for creative endeavour,
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,3.7vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      with each dialogue and adjustment embodying
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,3.7vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      resilience, collaboration, and an unwavering
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,3.7vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      focus on user experience.
    </div>
    <div class="relative details flex mt-8 self-start items-center">
      <p>Designer & Developer</p>
      <span class="mx-2">•</span>
      <a
        class="underline hover:text-[red]"
        href="/cv-saulnewbury-2025.pdf"
        donwload
        target="_blank">C V</a
      >
    </div>
  </div>

  <div
    class={'text mobile pl-[8vw] ' +
      (isMobile ? 'visible' : 'invisible absolute')}
  >
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,5vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      Fluidity is the catalyst
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,5vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      of creative endeavour
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,5vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      with each conversation,
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,5vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      and adjustment embodying
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,5vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      resilience, collaboration,
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,5vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      and an unwavering focus on
    </div>
    <div
      class="line opacity-0 overflow-hidden text-[clamp(1.8rem,5vw,2.2rem)] max-w-[32em] leading-[1.2em]"
    >
      user experience.
    </div>
    <div class="details flex mt-8 self-start">
      <p>Designer & Developer</p>
      <span class="mx-2">•</span>
      <p>Bristol (UK)</p>
      <span class="mx-2">•</span>
      <a
        class="underline"
        href="/cv-saulnewbury-2025.pdf"
        target="_blank"
        download>C V</a
      >
    </div>
  </div>
</div>
