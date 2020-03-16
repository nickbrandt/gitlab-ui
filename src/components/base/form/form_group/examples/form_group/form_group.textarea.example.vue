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
  <div>
    <gl-form-group id="group-id-textarea1" label="Label Name" label-for="textarea1">
      <gl-form-textarea id="textarea1" v-model="text" placeholder="Enter something" size="md" />
    </gl-form-group>

    <p class="mt-3">The entered text is: {{ text }}</p>
  </div>
</template>
