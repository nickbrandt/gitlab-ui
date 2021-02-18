<template>
  <div class="row">
    <div class="col-sm-4">
      <gl-single-stat
        title="Success stat"
        value="100"
        variant="success"
        meta-text="passed"
        meta-icon="status_success_solid"
      />
    </div>
    <div class="col-sm-4">
      <gl-single-stat
        title="Warning stat"
        value="1000"
        variant="warning"
        meta-text="warning"
        meta-icon="status-alert"
      />
    </div>
    <div class="col-sm-4">
      <gl-single-stat
        title="Danger stat"
        value="100000"
        variant="danger"
        meta-text="failed"
        meta-icon="status-failed"
      />
    </div>
  </div>
</template>
