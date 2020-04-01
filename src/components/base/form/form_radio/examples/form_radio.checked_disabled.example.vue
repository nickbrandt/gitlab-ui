<template>
  <gl-form-radio v-model="checked" value="foo" disabled>Disabled and checked</gl-form-radio>
</template>

<script>
export default {
  data() {
    return {
      checked: 'foo',
    };
  },
};
</script>
