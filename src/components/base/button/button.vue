<script>
import BButton from 'bootstrap-vue/src/components/button/button';
import RelMixin from '../../mixins/rel_mixin';
import {
  buttonCategoryOptions,
  deprecatedButtonVariantCategoryMap,
  availableButtonVariantOptions,
  buttonSizeOptions,
} from '../../../utils/constants';

export default {
  components: {
    BButton,
  },
  mixins: [RelMixin],
  props: {
    category: {
      type: String,
      required: false,
      default: null,
      validator: value => Object.keys(buttonCategoryOptions).includes(value),
    },
    variant: {
      type: String,
      required: false,
      default: availableButtonVariantOptions.secondary,
    },
    size: {
      type: String,
      required: false,
      default: buttonSizeOptions.md,
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      return {
        'btn-inverted': this.buttonCategory === buttonCategoryOptions.secondary,
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
    v-on="$listeners"
  >
    <slot></slot>
  </b-button>
</template>
