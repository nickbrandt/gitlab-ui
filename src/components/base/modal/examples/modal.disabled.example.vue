<template>
  <div>
    <button v-gl-modal-directive="'basic-modal-id'" type="button">
      Open modal
    </button>
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
      Enter "gitlab" to change the button state.
      <input v-model="enteredText" type="text" />
    </gl-modal>
  </div>
</template>

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
        text: 'OK',
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
