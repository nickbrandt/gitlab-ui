<script>
import { BButton } from 'bootstrap-vue';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';
import RelMixin from '../../mixins/rel_mixin';
import {
  deprecatedButtonCategoryOptions,
  deprecatedButtonVariantCategoryMap,
  availableButtonVariantOptions,
  deprecatedButtonSizeOptions,
} from '../../../utils/constants';

export default {
  components: {
    BButton,
    GlLoadingIcon,
  },
  mixins: [RelMixin],
  props: {
    category: {
      type: String,
      required: false,
      default: null,
      validator: value => Object.keys(deprecatedButtonCategoryOptions).includes(value),
    },
    variant: {
      type: String,
      required: false,
      default: availableButtonVariantOptions.secondary,
    },
    size: {
      type: String,
      required: false,
      default: deprecatedButtonSizeOptions.md,
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      return {
        'btn-inverted': this.buttonCategory === deprecatedButtonCategoryOptions.secondary,
        selected: this.selected,
      };
    },
    buttonCategory() {
      if (this.category === null) {
        return deprecatedButtonVariantCategoryMap[this.variant];
      }
      return this.category;
    },
    hasText() {
      return Boolean(this.$slots.default);
    },
  },
};
</script>
<template>
  <b-button
    v-bind="$attrs"
    :rel="relType"
    :target="target"
    :size="size"
    :variant="variant"
    :class="buttonClasses"
    :disabled="loading || disabled"
    v-on="$listeners"
  >
    <gl-loading-icon v-if="loading" inline />
    <slot></slot>
  </b-button>
</template>
