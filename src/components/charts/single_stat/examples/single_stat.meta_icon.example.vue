<template>
  <div class="row">
    <div class="col-sm-4">
      <gl-single-stat
        title="Success stat"
        value="100"
        unit="ms"
        variant="success"
        meta-icon="heart"
      />
    </div>
    <div class="col-sm-4">
      <gl-single-stat
        title="Danger stat"
        value="100000"
        unit="ms"
        variant="danger"
        meta-icon="hourglass"
      />
    </div>
  </div>
</template>
