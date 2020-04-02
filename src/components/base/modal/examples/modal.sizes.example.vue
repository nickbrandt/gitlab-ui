<template>
  <div>
    <gl-deprecated-button v-gl-modal-directive="'small-modal-id'" variant="info">
      Small Modal
    </gl-deprecated-button>
    <gl-deprecated-button v-gl-modal-directive="'medium-modal-id'" variant="info">
      Default Modal
    </gl-deprecated-button>
    <gl-deprecated-button v-gl-modal-directive="'large-modal-id'" variant="info">
      Large Modal
    </gl-deprecated-button>
    <gl-modal
      modal-id="small-modal-id"
      title="Example title"
      no-fade
      :action-primary="primaryProps"
      :action-secondary="secondaryProps"
      :action-cancel="cancelProps"
      size="sm"
    >
      <p>Small modal: 512px</p>
    </gl-modal>
    <gl-modal
      modal-id="medium-modal-id"
      title="Example title"
      no-fade
      :action-primary="primaryProps"
      :action-secondary="secondaryProps"
      :action-cancel="cancelProps"
    >
      <p>Medium modal: 768px (default)</p>
    </gl-modal>
    <gl-modal
      modal-id="large-modal-id"
      title="Example title"
      no-fade
      :action-primary="primaryProps"
      :action-secondary="secondaryProps"
      :action-cancel="cancelProps"
      size="lg"
    >
      <p>Large modal: 990px</p>
    </gl-modal>
  </div>
</template>

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
