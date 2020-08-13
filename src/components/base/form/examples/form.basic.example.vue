<script>
export default {
  data() {
    return {
      form: {
        submitDisabled: false,
        email: '',
        name: '',
        mergeState: null,
        checked: [],
      },
      states: [{ text: 'Select One', value: null }, 'Open', 'Resolved', 'Closed', 'Blocked'],
      show: true,
    };
  },
  methods: {
    onReset() {
      this.form.name = '';
      this.form.submitDisabled = false;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.form.submitDisabled = true;
      setTimeout(() => {
        this.form.submitDisabled = false;
        // eslint-disable-next-line no-alert
        alert(JSON.stringify(this.form));
      }, 1000);
    },
  },
};
</script>

<template>
  <div>
    <gl-form @submit="onSubmit" @reset="onReset">
      <gl-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <gl-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        />
      </gl-form-group>

      <gl-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <gl-form-input id="input-2" v-model="form.name" required placeholder="Enter name" />
      </gl-form-group>

      <gl-form-group id="input-group-3" label="Merge State:" label-for="input-3">
        <gl-form-select id="input-3" v-model="form.mergeState" :options="states" required />
      </gl-form-group>

      <gl-form-group id="input-group-4">
        <gl-form-checkbox-group id="checkboxes-4" v-model="form.checked">
          <gl-form-checkbox value="squash">Squash Commits</gl-form-checkbox>
          <gl-form-checkbox value="new">Create New Issue</gl-form-checkbox>
        </gl-form-checkbox-group>
      </gl-form-group>

      <div class="gl-display-flex gl-justify-content-end">
        <gl-button type="reset" variant="secondary" class="gl-mr-3">Cancel</gl-button>
        <gl-button type="submit" variant="success">Submit</gl-button>
      </div>
    </gl-form>
  </div>
</template>
