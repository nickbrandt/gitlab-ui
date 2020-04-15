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
  <div>
    <gl-form-radio v-model="selected" value="one">One</gl-form-radio>
    <gl-form-radio v-model="selected" value="two">Two</gl-form-radio>
  </div>
</template>
