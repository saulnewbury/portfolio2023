<script>
  import { onMount, onDestroy } from 'svelte'

  let time = new Date()
  let interval

  function formatTime(date) {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'GMT',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    return formatter.format(date)
  }

  onMount(() => {
    interval = setInterval(() => {
      time = new Date()
    }, 1000)
  })

  onDestroy(() => {
    if (interval) clearInterval(interval)
  })
</script>

{formatTime(time)}
