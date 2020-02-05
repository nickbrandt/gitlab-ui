<script>
import { BModal } from 'bootstrap-vue';
import GlButton from '../button/button.vue';
import { focusableTags, modalButtonDefaults, modalSizeOptions } from '../../../utils/constants';

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
  data() {
    return {
      shouldCallFocus: false,
    };
  },
  watch: {
    shouldCallFocus(val) {
      if (val) {
        this.$nextTick(() => {
          this.setFocus();
        });
      }
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
    },
    // set default variant button styling
    buttonBinding(prop, name) {
      if (!prop.attributes) {
        return modalButtonDefaults[name];
      }
      return prop.attributes;
    },
    // Check all the children of default slot and as soon a one of them is focusable,
    // set the focus of the user on that.
    setFocus() {
      // Reset the value to allow the focus to re-occur if it's closed and reopened.
      this.shouldCallFocus = false;

      const scopeChildren = this.$scopedSlots.default()[0].children || [];
      const btnElts = document.querySelectorAll(`#${this.modalId} button`);

      const modalElts = scopeChildren.map(node =>
        document.querySelector(`#${this.modalId} ${node.tag}`)
      );
      // ModalElts are the first choice, the btnElts are a backup
      const potentialElts = [...modalElts, ...btnElts];

      for (let i = 0; i < potentialElts.length; i += 1) {
        const elt = potentialElts[i];

        if (this.isFocusable(elt)) {
          setTimeout(() => {
            elt.focus();
          }, 100);
          break;
        }
      }
    },
    isFocusable(elt) {
      // To determine if an element is focusable, we need to check the tag type
      // and some special attributes such as `type="hidden"` or `disabled`
      if (!elt) return false;

      const tag = elt.tagName;

      const isTagFocusable = focusableTags.indexOf(tag) !== -1;
      const hasValidType = elt.getAttribute('type') !== 'hidden';
      const isNotDisabled = !elt.getAttribute('disabled');
      const hasValidZIndex = elt.getAttribute('z-index') !== '-1';
      const isInvalidAnchorTag = tag === 'A' && !elt.getAttribute('href');

      return (
        isTagFocusable && hasValidType && isNotDisabled && hasValidZIndex && !isInvalidAnchorTag
      );
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
    @show="shouldCallFocus = true"
    @ok="primary"
    @cancel="canceled"
    @close="secondary"
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
        class="gl-button js-modal-action-cancel"
        v-bind="buttonBinding(actionCancel, 'actionCancel')"
        @click="cancel"
        >{{ actionCancel.text }}</gl-button
      >
      <gl-button
        v-if="actionSecondary"
        class="gl-button js-modal-action-secondary"
        v-bind="buttonBinding(actionSecondary, 'actionSecondary')"
        @click="close"
        >{{ actionSecondary.text }}</gl-button
      >
      <gl-button
        v-if="actionPrimary"
        class="gl-button js-modal-action-primary"
        v-bind="buttonBinding(actionPrimary, 'actionPrimary')"
        @click="ok"
        >{{ actionPrimary.text }}</gl-button
      >
    </slot>
  </b-modal>
</template>
