<template>
  <gl-form-radio v-model="checked" disabled>Disabled and Checked Form Checkbox</gl-form-radio>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
    };
  },
};
</script>
