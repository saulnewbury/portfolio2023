<script>
  import './global.css'
</script>

<nav>
  <a href="/">Saul Newbury</a>

  <div class="right">
    <a href="/">v1</a>
    <a href="/v2">v2</a>
  </div>
</nav>

<slot />

<style>
  /* nav */
  nav {
    padding: 1rem var(--gutter-sm);
    display: flex;
    justify-content: space-between;
    position: absolute;
    z-index: 100;
    width: 100vw;
  }

  .right a:not(:last-child) {
    margin-right: 0.5rem;
  }
</style>
