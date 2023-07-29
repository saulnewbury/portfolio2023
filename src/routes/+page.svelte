<script>
  import arrowRight from '$lib/icons/arrow-right.svg'
</script>

<section class="hero">
  <div class="container">
    <h1 class="light">
      Hello world! I'm Saul Newbury, a creative developer with endless curiosity
      for how an interactive UI can move to create exceptional user experiences.
    </h1>
    <button
      >Get in touch <img
        class="arrow-right"
        src={arrowRight}
        alt="arrow right"
      /></button
    >
  </div>
</section>

<style>
  section {
    height: 100vh;
    display: flex;
    align-items: center;
  }

  h1 {
    margin-top: 7vh;
    max-width: 26em;
    max-width: 30em;
    line-height: 1.45;
    font-size: 30px;
    margin-bottom: 1.8em;
  }

  button {
    display: flex;
    align-items: center;
  }

  img.arrow-right {
    width: 20px;
    margin-left: 0.6em;
  }

  @media screen and (min-width: 1046px) {
    .container {
      margin-left: auto;
      margin-right: auto;
      padding-right: var(--gutter-lg);
    }
  }
</style>
