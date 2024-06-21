<script>
  import { onMount } from 'svelte'

  import arrowRight from '$lib/icons/arrow-right.svg'

  // refs
  let button, btnCharsA, btnCharsB, tlA, tlB

  onMount(() => {
    /**
     * Button hover effect
     */
    const qButton = gsap.utils.selector('button')

    const splitBtnTextA = new SplitText(qButton('span:first-child'), {
      type: 'chars'
    })
    const splitBtnTextB = new SplitText(qButton('span:nth-child(2)'), {
      type: 'chars'
    })

    btnCharsA = splitBtnTextA.chars
    btnCharsB = splitBtnTextB.chars

    gsap.set(btnCharsA, { transformOrigin: 'bottom center' })

    tlA = gsap.timeline({ paused: true })
    tlB = gsap.timeline({ paused: true })

    for (let i = 0; i < btnCharsA.length; i++) {
      tlA.fromTo(
        btnCharsA[i],
        {
          yPercent: 0
        },
        {
          yPercent: -100,
          scaleY: 0,
          // skewX: -45,
          ease: 'power1.inOut'
        },
        '<3%'
      )

      tlB.fromTo(
        btnCharsB[i],
        {
          yPercent: 100
        },
        {
          yPercent: 0,
          ease: 'power1.inOut'
        },
        '<3%'
      )
    }
  })

  // Button hover effect
  function handleMouseEnter() {
    tlA.play()
    tlB.play()
  }
  function handleMouseLeave() {
    tlA.reverse()
    tlB.reverse()
  }
</script>

<button
  bind:this={button}
  on:mouseenter={() => {
    handleMouseEnter()
  }}
  on:mouseleave={() => {
    handleMouseLeave()
  }}
>
  <span>Get in touch</span>
  <span>Get in touch</span>
  <span>
    <img class="arrow-right" src={arrowRight} alt="arrow right" />
  </span>
</button>

<style>
  button {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    bottom: 10vh;
    right: 0;
    display: flex;
    align-items: center;
    font-size: clamp(1.6rem, 2.4vw, 2.2rem);
  }

  button > span {
    opacity: 0;
    display: inline-block;
  }

  button > span:nth-child(2) {
    position: absolute;
  }

  button > span:last-child {
    padding-right: 5px;
  }

  img.arrow-right {
    opacity: 0;
    width: 0.8em;
    margin-left: 0.4em;
  }

  @media screen and (max-width: 1055px) {
    button {
      font-size: clamp(1.6rem, 3.2vw, 1.8rem);
    }
  }
</style>
