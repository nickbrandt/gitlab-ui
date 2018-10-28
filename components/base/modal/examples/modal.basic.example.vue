<template>
  <div>
    <button
      v-gl-modal-directive="'test-modal-id'"
      type="button"
    >
      Open modal
    </button>
    <gl-modal
      :header-bg-variant="headerBgVariant"
      :header-border-variant="headerBorderVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-border-variant="footerBorderVariant"
      :footer-text-variant="footerTextVariant"
      modal-id="test-modal-id"
      title="Example title"
      no-fade
    >
      This is my content
    </gl-modal>
  </div>
</template>
