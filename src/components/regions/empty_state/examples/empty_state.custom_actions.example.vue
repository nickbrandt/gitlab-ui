<template>
  <gl-empty-state
    title="The issue tracker is a place to add things that need to be improved or solved in a project"
    svg-path="https://gitlab.com/gitlab-org/gitlab-svgs/raw/v1.152.0/illustrations/issues.svg"
    description="Issues can be bugs, tasks, or ideas to be discissed. Also, issues are searchable and filterable."
  >
    <template #actions>
      <gl-button variant="link" class="gl-mb-3 gl-ml-3" href="#" @click.prevent>
        Custom link
      </gl-button>
    </template>
  </gl-empty-state>
</template>
