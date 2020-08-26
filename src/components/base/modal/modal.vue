<script>
import { BModal } from 'bootstrap-vue';
import GlButton from '../button/button.vue';
import { focusableTags, modalButtonDefaults, modalSizeOptions } from '../../../utils/constants';
import { focusFirstFocusableElement } from '../../../utils/utils';

function validatorHelper(obj) {
  return Object.keys(obj).every(val => val === 'text' || val === 'attributes');
}

export default {
  components: {
    BModal,
    GlButton,
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
    actionPrimary: {
      type: Object,
      required: false,
      default: null,
      validator: obj => validatorHelper(obj),
    },
    actionSecondary: {
      type: Object,
      required: false,
      default: null,
      validator: obj => validatorHelper(obj),
    },
    actionCancel: {
      type: Object,
      required: false,
      default: null,
      validator: obj => validatorHelper(obj),
    },
    size: {
      type: String,
      required: false,
      default: modalSizeOptions.md,
      validator: val => Object.keys(modalSizeOptions).includes(val),
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
    ok() {
      this.$refs.modal.onOk();
    },
    cancel() {
      this.$refs.modal.onCancel();
    },
    close() {
      this.$refs.modal.onClose();
    },
    primary(event) {
      this.$emit('primary', event);
    },
    canceled(event) {
      this.$emit('canceled', event);
    },
    secondary(event) {
      this.$emit('secondary', event);
      if (!event?.defaultPrevented) {
        this.close();
      }
    },
    // set default variant button styling
    buttonBinding(prop, name) {
      if (!prop.attributes) {
        return modalButtonDefaults[name];
      }
      return prop.attributes;
    },
    setFocus() {
      const btnElts = Array.from(this.$refs.modal.$refs.modal.querySelectorAll('button'));
      const modalElts = [...this.$refs.modal.$refs.body.querySelectorAll(focusableTags.join(','))];

      // Iterate over the array and if you find the close button,
      // move it to the end
      btnElts.forEach((elt, index) => {
        if (elt === this.$refs.modal.$refs['close-button']) {
          btnElts.push(btnElts.splice(index, 1));
        }
      });

      // ModalElts are the first choice, the btnElts are a backup
      focusFirstFocusableElement([...modalElts, ...btnElts]);
    },
  },
};
</script>

<template>
  <b-modal
    :id="modalId"
    ref="modal"
    :title-tag="titleTag"
    :size="size"
    v-bind="$attrs"
    lazy
    :modal-class="['gl-modal', modalClass]"
    v-on="$listeners"
    @shown="setFocus"
    @ok="primary"
    @cancel="canceled"
  >
    <slot></slot>
    <slot slot="modal-header" name="modal-header"></slot>
    <slot slot="modal-title" name="modal-title"></slot>
    <slot slot="modal-header-close" name="modal-header-close"></slot>
    <slot slot="modal-ok" name="modal-ok"></slot>
    <slot slot="modal-cancel" name="modal-cancel"></slot>
    <slot slot="modal-footer" name="modal-footer">
      <gl-button
        v-if="actionCancel"
        class="js-modal-action-cancel"
        v-bind="buttonBinding(actionCancel, 'actionCancel')"
        @click="cancel"
      >
        {{ actionCancel.text }}
      </gl-button>
      <gl-button
        v-if="actionSecondary"
        class="js-modal-action-secondary"
        v-bind="buttonBinding(actionSecondary, 'actionSecondary')"
        @click="secondary"
      >
        {{ actionSecondary.text }}
      </gl-button>
      <gl-button
        v-if="actionPrimary"
        class="js-modal-action-primary"
        v-bind="buttonBinding(actionPrimary, 'actionPrimary')"
        @click="ok"
      >
        {{ actionPrimary.text }}
      </gl-button>
    </slot>
  </b-modal>
</template>
