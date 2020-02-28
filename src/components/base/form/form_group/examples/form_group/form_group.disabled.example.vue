<script>
export default {
  computed: {
    disabled() {
      return true;
    },
  },
};
</script>

<template>
  <gl-form-group
    id="group-id"
    label="Label Name"
    label-size="sm"
    description="This feature is disabled"
    label-for="input1"
  >
    <gl-form-input id="input1" type="text" :disabled="disabled" value="Disabled" />
  </gl-form-group>
</template>
