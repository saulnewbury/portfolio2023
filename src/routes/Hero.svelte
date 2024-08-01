<script>
  import HeroDesk from './HeroDesk.svelte'
  import HeroMob from './HeroMob.svelte'

  import { md } from '../lib/stores'

  // Components
</script>

{#if $md}
  {#key 'true'}
    <HeroDesk />
  {/key}
{:else}
  {#key 'false'}
    <HeroMob />
  {/key}
{/if}

<style>
</style>
