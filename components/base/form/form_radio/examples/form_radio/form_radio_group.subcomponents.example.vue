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
  <gl-form-radio-group
    v-model="selected"
    :checked="selected"
  >
    <gl-form-radio value="one">
      Option 1
    </gl-form-radio>
    <gl-form-radio value="two">
      Option 2
    </gl-form-radio>
  </gl-form-radio-group>
</template>
