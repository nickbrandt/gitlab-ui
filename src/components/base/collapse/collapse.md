# Collapse

<!-- STORY -->

## Usage

Collapse is used to keep pages focused on the overview of what the user can do. Details and
additional actions are hidden in the fold, and can be opened if the user wants to interact with
those elements.

```html
<template>
  <div>
    <gl-button v-gl-collapse-toggle.collase-id variant="primary">
      Toggle Collapse
    </gl-button>
    <gl-collapse id="collase-id" class="gl-mt-3">
      <gl-card>
        <p class="card-text">Collapse contents Here</p>
      </gl-card>
    </gl-collapse>
  </div>
</template>
```
