<script>
export default {
  data() {
    return {
      state: false,
    };
  },
};
</script>

<template>
  <div>
    <gl-form-input-group>
      <template #prepend>
        <gl-input-group-text>Username</gl-input-group-text>
      </template>
      <gl-form-input :state="state" />
    </gl-form-input-group>
    <gl-form-invalid-feedback :state="state">Some custom invalid feedback</gl-form-invalid-feedback>
  </div>
</template>
