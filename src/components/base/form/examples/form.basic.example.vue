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
    <gl-form-group label="Name" label-for="input-name">
      <gl-form-input
        v-model="name"
        name="input-name"
        type="text"
        required
        placeholder="Your name"
      />
    </gl-form-group>

    <gl-button type="submit" variant="success">Submit</gl-button>
    <gl-button type="reset" variant="secondary">Reset</gl-button>
  </gl-form>
</template>
