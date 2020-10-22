<template>
  <div>
    <gl-button v-gl-collapse-toggle.collase-basic-example category="primary">
      Toggle Collapse
    </gl-button>
    <gl-collapse id="collase-basic-example" class="gl-mt-3">
      <gl-card>
        <p class="card-text">Collapse contents Here</p>
        <gl-button v-gl-collapse-toggle.collase-basic-example-inner size="sm">
          Toggle Inner Collapse
        </gl-button>
        <gl-collapse id="collase-basic-example-inner" class="gl-mt-3">
          <gl-card>Hello!</gl-card>
        </gl-collapse>
      </gl-card>
    </gl-collapse>
  </div>
</template>
