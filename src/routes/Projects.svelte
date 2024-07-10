<script>
  import { onMount } from 'svelte'
  import BouncyLine from '../lib/components/BouncyLine.svelte'

  const projects = [
    { num: '01', name: 'BIS', role: 'developer' },
    { num: '02', name: 'Jenni Cadman', role: 'developer and designer' },
    { num: '03', name: 'Oakhanger Metalworks', role: 'developer and designer' },
    { num: '04', name: 'Barn Configurator', role: 'developer and designer' }
  ]

  let width, height

  // refs
  let container

  onMount(() => {
    width = container.getBoundingClientRect().width
    height = container.getBoundingClientRect().height
  })
</script>

<section class="uppercase mx-[4vw] text-[4vw] my-[12vw]">
  <div class="font-body text-base mb-[3vw] flex-co">
    <span class="text-[2vw] text-red">•</span>
    <span>Projects</span>
  </div>
  {#each projects as p, i}
    <div
      bind:this={container}
      class="relative project flex justify-between self-center"
    >
      <BouncyLine {width} height={height * 1.7} zIndex={990 - i} top={-5.1} />
      <div class="flex">
        <span class="num text-[1vw] mr-[3vw] self-center font-body"
          >({p.num})</span
        ><span>{p.name}</span>
      </div>
      <span class="role normal-case font-body text-base self-center"
        >{p.role}</span
      >
      {#if i + 1 === projects.length}
        <BouncyLine
          {width}
          height={height * 1.7}
          zIndex={990 - projects.length}
          top={0.8}
        />
      {/if}
    </div>
  {/each}
</section>

<!-- last-of-type:border-b-[1px] border-t-[1px] border-black  -->
