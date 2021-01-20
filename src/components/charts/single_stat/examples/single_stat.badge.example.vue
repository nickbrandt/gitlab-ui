<template>
  <div class="row">
    <div class="col-sm-4">
      <gl-single-stat
        title="Success stat"
        value="100"
        unit="ms"
        variant="success"
        meta-text="passed"
        meta-icon="check-circle"
      />
    </div>
    <div class="col-sm-4">
      <gl-single-stat
        title="Warning stat"
        value="1000"
        unit="ms"
        variant="warning"
        meta-text="warning"
        meta-icon="status-paused"
      />
    </div>
    <div class="col-sm-4">
      <gl-single-stat
        title="Danger stat"
        value="100000"
        unit="ms"
        variant="danger"
        meta-text="failed"
        meta-icon="status-failed"
      />
    </div>
  </div>
</template>
