<template>
  <div>
    <h1>Here's a headline</h1>
    <span>With some details</span>
    <gl-button v-gl-collapse-toggle.collapse-1 class="float-right" category="primary">
      Toggle Collapse
    </gl-button>
    <gl-collapse id="collapse-1" class="gl-mt-2">
      <h1>This is collapsed by default</h1>
      <span>
        Which is good if there are some extensive details that should only be visible if the user
        wants to interact with this extra detail
      </span>
    </gl-collapse>
  </div>
</template>
