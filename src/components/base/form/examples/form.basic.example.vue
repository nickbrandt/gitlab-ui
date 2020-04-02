<script>
export default {
  data() {
    return {
      name: '',
      submitDisabled: false,
    };
  },
  methods: {
    onReset() {
      this.name = '';
      this.submitDisabled = false;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.submitDisabled = true;
      setTimeout(() => {
        this.submitDisabled = false;
      }, 1000);
    },
  },
};
</script>

<template>
  <gl-form @submit="onSubmit" @reset="onReset">
    <gl-form-group label="Name">
      <gl-form-input v-model="name" type="text" required />
    </gl-form-group>

    <gl-deprecated-button type="submit" variant="success">Submit</gl-deprecated-button>
    <gl-deprecated-button type="reset" variant="secondary">Reset</gl-deprecated-button>
  </gl-form>
</template>
