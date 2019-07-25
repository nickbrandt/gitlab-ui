<template>
  <gl-empty-state
    title="Slotted description example"
    svg-path="https://gitlab.com/gitlab-org/gitlab-svgs/raw/master/illustrations/issues.svg"
    primary-button-link="#"
    primary-button-text="Learn more"
  >
    <template #description>
      <p>A slotted description allows you to use more custom HTML such as <a href="#">links</a>.</p>
      <pre>You could also include code snippets</pre>
      <p><strong>Note:</strong> A slotted description will override one provided by a property.</p>
    </template>
  </gl-empty-state>
</template>
