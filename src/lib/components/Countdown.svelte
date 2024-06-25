<div class="countdown">
  <span>1</span>
  <span>2</span>
  <span>3</span>
</div>

<style>
  .countdown {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 900;
  }
  .countdown span {
    font-size: 100px;
    text-align: center;
    display: inline-block;
    position: absolute;
    /* top: 50%; */
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 1em;
  }

  .countdown span:nth-child(2),
  .countdown span:nth-child(3) {
    opacity: 0;
  }
</style>
