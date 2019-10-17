<template>
  <div class="row">
    <div class="col-sm-4">
      <gl-single-stat title="Success stat" value="100ms" variant="success">
        <span slot="icon">+</span>
      </gl-single-stat>
    </div>
    <div class="col-sm-4">
      <gl-single-stat title="Danger stat" value="100000ms" variant="danger">
        <span slot="icon">!</span>
      </gl-single-stat>
    </div>
  </div>
</template>
