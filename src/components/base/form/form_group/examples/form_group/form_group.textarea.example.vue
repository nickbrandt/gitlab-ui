<script>
export default {
  data() {
    return {
      text: '',
    };
  },
};
</script>

<template>
  <gl-form-group id="group-id-textarea1" label="Label Name" label-for="textarea1">
    <gl-form-textarea id="textarea1" v-model="text" placeholder="Enter something" />
  </gl-form-group>
</template>
