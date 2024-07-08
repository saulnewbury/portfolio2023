<script>
  const projects = [
    { num: '01', name: 'BIS', role: 'developer' },
    { num: '02', name: 'Jenni Cadman', role: 'developer and designer' },
    { num: '03', name: 'Oakhanger Metalworks', role: 'developer and designer' },
    { num: '04', name: 'Barn Configurator', role: 'developer and designer' }
  ]
</script>

<section class="uppercase mx-[4vw] text-[4vw] my-[12vw]">
  <div class="font-body text-base mb-[3vw] flex-co">
    <span class="text-[2vw] text-red">•</span>
    <span>Projects</span>
  </div>
  {#each projects as p}
    <div
      class="project flex justify-between last-of-type:border-b-[1px] border-t-[1px] border-black self-center"
    >
      <div class="flex">
        <span class="num text-[1vw] mr-[3vw] self-center font-body"
          >({p.num})</span
        ><span>{p.name}</span>
      </div>
      <span class="role normal-case font-body text-base self-center"
        >{p.role}</span
      >
    </div>
  {/each}
</section>
