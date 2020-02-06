<script>
export default {
  data() {
    return {
      name: '',
      errorText: '',
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.name === '') {
        this.errorText = 'Please enter your name';
      } else {
        this.errorText = '';
      }
    },
  },
};
</script>

<template>
  <gl-form novalidate @submit="onSubmit">
    <gl-form-group label="Name">
      <gl-form-input v-model="name" type="text" required />
    </gl-form-group>
    <p class="text-danger">{{ errorText }}</p>
    <gl-button type="submit" variant="success">Submit</gl-button>
  </gl-form>
</template>
