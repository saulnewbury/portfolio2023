<script>
  import arrowRight from '$lib/icons/arrow-right.svg'
</script>

<section class="hero">
  <h1>
    I'm Saul Newbury, a freelance developer passionate about how great design,
    asthetics and motion come together to make memorable experiences.
  </h1>
  <button
    >Get in touch <img
      class="arrow-right"
      src={arrowRight}
      alt="arrow right"
    /></button
  >
</section>

<style>
  section {
    height: 100vh;
    display: flex;
    align-items: center;
  }

  h1 {
    max-width: 23em;
  }

  button {
    position: absolute;
    bottom: 3.5rem;
    right: var(--gutter);
    display: flex;
    align-items: center;
  }

  img.arrow-right {
    width: 25px;
    margin-left: 0.5em;
  }

  /* @media screen and (min-width: 1046px) {
    .container {
      margin-left: auto;
      margin-right: auto;
      padding-right: var(--gutter-lg);
    }
  } */
</style>
