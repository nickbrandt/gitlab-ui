<script>
export default {
  data() {
    return {
      name: {
        first: '',
        last: '',
        submitDisabled: false,
      },
    };
  },
  methods: {
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
  <gl-form inline @submit="onSubmit">
    <!-- using plain label instead of gl-form-group to avoid margin layout issues -->
    <label for="input-name" class="gl-mr-3">First name</label>
    <gl-form-input v-model="name.first" name="input-name" class="ml-1" type="text" required />
    <label for="input-surname" class="gl-mx-3">Surname</label>
    <gl-form-input v-model="name.last" name="input-surname" class="ml-1" type="text" required />

    <gl-button class="gl-ml-3" small :disabled="submitDisabled" type="submit" variant="success"
      >Save</gl-button
    >
  </gl-form>
</template>
