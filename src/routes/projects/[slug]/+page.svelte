<script>
  export function load({ params }) {
    const { slug } = params

    // In a real app, you'd fetch this from a database
    const projects = {
      'project-one': {
        title: 'Project One',
        content: 'Content for project one'
      },
      'project-two': {
        title: 'Project Two',
        content: 'Content for project two'
      },
      'project-three': {
        title: 'Project Three',
        content: 'Content for project three'
      },
      'project-four': {
        title: 'Project Four',
        content: 'Content for project four'
      },
      'project-five': {
        title: 'Project Five',
        content: 'Content for project five'
      }
    }

    const project = projects[slug]

    if (!project) {
      throw error(404, 'Project not found')
    }

    return { project }
  }
</script>

<div>Whats up</div>
