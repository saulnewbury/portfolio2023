<script>
  import arrowRight from '$lib/icons/arrow-right.svg'

  // refs
  let button

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
