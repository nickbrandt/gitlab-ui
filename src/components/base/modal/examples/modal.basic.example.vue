<script>
export default {
  computed: {
    primaryProps() {
      return {
        text: 'Okay',
      };
    },
    secondaryProps() {
      return {
        text: 'Secondary',
      };
    },
    cancelProps() {
      return {
        text: 'Cancel',
      };
    },
  },
};
</script>

<template>
  <div>
    <gl-button v-gl-modal-directive="'basic-modal-id'" category="primary" variant="confirm">
      Open modal
    </gl-button>
    <gl-modal
      modal-id="basic-modal-id"
      title="Example title"
      no-fade
      :action-primary="primaryProps"
      :action-secondary="secondaryProps"
      :action-cancel="cancelProps"
    >
      This is my content
    </gl-modal>
  </div>
</template>
