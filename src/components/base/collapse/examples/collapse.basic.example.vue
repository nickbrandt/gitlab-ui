<template>
  <div>
    <gl-deprecated-button v-gl-collapse-toggle.collase-basic-example variant="primary">
      Toggle Collapse
    </gl-deprecated-button>
    <gl-collapse id="collase-basic-example" class="gl-mt-3">
      <gl-card>
        <p class="card-text">Collapse contents Here</p>
        <gl-deprecated-button v-gl-collapse-toggle.collase-basic-example-inner size="sm">
          Toggle Inner Collapse
        </gl-deprecated-button>
        <gl-collapse id="collase-basic-example-inner" class="gl-mt-3">
          <gl-card>Hello!</gl-card>
        </gl-collapse>
      </gl-card>
    </gl-collapse>
  </div>
</template>
