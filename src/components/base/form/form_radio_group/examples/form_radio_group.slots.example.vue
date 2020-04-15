<script>
export default {
  data() {
    return {
      selected: 'one',
    };
  },
};
</script>

<template>
  <gl-form-radio-group v-model="selected">
    <gl-form-radio value="one">One</gl-form-radio>
    <gl-form-radio value="two">
      Two
      <template #help>Help text</template>
    </gl-form-radio>
    <gl-form-radio value="three">Three</gl-form-radio>
    <gl-form-radio value="four" disabled>Disabled option</gl-form-radio>
  </gl-form-radio-group>
</template>
