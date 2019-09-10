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
  mounted() {
    if (this.$slots['modal-footer']) {
      this.buttonWarning();
    }
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
    buttonWarning() {
      let count = 0;
      const nodes = this.$slots['modal-footer'][0].children;

      if (nodes) {
        nodes.forEach(node => {
          if (node.tag === 'button') {
            count += 1;
          }
        });
      }

      if (count >= 4) {
        console.warn(
          `Warning: The modal footer should not contain more than three button elements. There are currently ${count} buttons.`
        );
      }
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
