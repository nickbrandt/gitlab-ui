<script>
import BModal from 'bootstrap-vue/src/components/modal/modal';

export default {
  components: {
    BModal,
  },
  inheritAttrs: false,
  props: {
    modalId: {
      type: String,
      required: true,
    },
    titleTag: {
      type: String,
      required: false,
      default: 'h4',
    },
    modalClass: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    show() {
      this.$refs.modal.show();
    },
    hide() {
      this.$refs.modal.hide();
    },
    toggle() {
      this.$refs.modal.toggle();
    },
  },
};
</script>

<template>
  <b-modal
    :id="modalId"
    ref="modal"
    :title-tag="titleTag"
    v-bind="$attrs"
    lazy
    :modal-class="['gl-modal', modalClass]"
    v-on="$listeners"
  >
    <slot></slot>
    <slot slot="modal-header" name="modal-header"></slot>
    <slot slot="modal-title" name="modal-title"></slot>
    <slot slot="modal-header-close" name="modal-header-close"></slot>
    <slot slot="modal-footer" name="modal-footer"></slot>
    <slot slot="modal-ok" name="modal-ok"></slot>
    <slot slot="modal-cancel" name="modal-cancel"></slot>
  </b-modal>
</template>
