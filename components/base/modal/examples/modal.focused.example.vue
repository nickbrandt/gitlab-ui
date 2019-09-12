<template>
  <div>
    <button v-gl-modal-directive="'basic-modal-id'" type="button">
      Open modal
    </button>
    <gl-modal modal-id="basic-modal-id" title="Example title" no-fade @shown="focusElement">
      This is my content
      <gl-form-input ref="focusThis" />
    </gl-modal>
  </div>
</template>

<script>
export default {
  methods: {
    focusElement() {
      this.$refs.focusThis.$el.focus();
    },
  },
};
</script>
