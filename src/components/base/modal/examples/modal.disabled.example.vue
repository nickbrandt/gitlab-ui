<script>
export default {
  data() {
    return {
      enteredText: '',
    };
  },
  computed: {
    primaryProps() {
      return {
        text: 'Okay',
        attributes: [{ disabled: !this.canSubmit }, { variant: 'danger' }],
      };
    },
    secondaryProps() {
      return {
        text: 'Secondary',
        attributes: [{ disabled: !this.canSubmit }, { variant: 'warning' }],
      };
    },
    cancelProps() {
      return {
        text: 'Cancel',
      };
    },
    canSubmit() {
      return this.enteredText === 'gitlab';
    },
  },
  methods: {
    clearInput() {
      this.enteredText = '';
    },
  },
};
</script>

<template>
  <div>
    <gl-button v-gl-modal-directive="'basic-modal-id'" category="primary" variant="info">
      Open modal
    </gl-button>
    <gl-modal
      modal-id="basic-modal-id"
      title="Example title"
      no-fade
      :action-primary="primaryProps"
      :action-secondary="secondaryProps"
      :action-cancel="cancelProps"
      @primary="clearInput"
      @secondary="clearInput"
      @cancel="clearInput"
    >
      <p>Enter "gitlab" to change the button state.</p>
      <input v-model="enteredText" type="text" />
    </gl-modal>
  </div>
</template>
