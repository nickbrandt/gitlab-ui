<script>
export default {
  data() {
    return {
      originalName: 'First last',
      name: 'First last',
      submitDisabled: false,
    };
  },
  computed: {
    formClean() {
      return this.name === this.originalName;
    },
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.submitDisabled = true;
      setTimeout(() => {
        this.submitDisabled = true;
      }, 1000);
    },
  },
};
</script>

<template>
  <gl-form @submit="onSubmit">
    <gl-form-group label="Name">
      <gl-form-input v-model="name" type="text" required />
    </gl-form-group>

    <gl-button :disabled="formClean || submitDisabled" type="submit" variant="success"
      >Submit</gl-button
    >
  </gl-form>
</template>
