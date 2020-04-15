<script>
export default {
  data() {
    return {
      checked: true,
    };
  },
};
</script>

<template>
  <gl-form-checkbox v-model="checked" disabled>Disabled and Checked Form Checkbox</gl-form-checkbox>
</template>
