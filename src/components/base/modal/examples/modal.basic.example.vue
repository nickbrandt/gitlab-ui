<script>
export default {
  computed: {
    primaryProps() {
      return {
        text: 'OK',
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
    <gl-deprecated-button v-gl-modal-directive="'basic-modal-id'" variant="info">
      Open modal
    </gl-deprecated-button>
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
