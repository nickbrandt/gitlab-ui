<template>
  <div>
    <gl-form-input
      ref="input"
      v-model="value"
      type="text"
    />
    <p class="mt-3">The entered value is: {{ value }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
  mounted() {
    const inputElement = this.$refs.input.$el;
    inputElement.value = 'some value';
    inputElement.dispatchEvent(new Event('input'));
  },
};
</script>
