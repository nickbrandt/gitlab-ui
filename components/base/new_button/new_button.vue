<script>
import BButton from 'bootstrap-vue/src/components/button/button';
import RelMixin from '../../mixins/rel_mixin';
import {
  newButtonCategoryOptions,
  newButtonVariantOptions,
  newButtonSizeOptions,
  newButtonSizeOptionsMap,
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
      default: newButtonCategoryOptions.tertiary,
      validator: value => Object.keys(newButtonCategoryOptions).includes(value),
    },
    variant: {
      type: String,
      required: false,
      default: newButtonVariantOptions.default,
      validator: value => Object.keys(newButtonVariantOptions).includes(value),
    },
    size: {
      type: String,
      required: false,
      default: newButtonSizeOptions.medium,
      validator: value => Object.keys(newButtonSizeOptions).includes(value),
    },
  },
  computed: {
    buttonClasses() {
      return {
        'btn-inverted': this.category === newButtonCategoryOptions.secondary,
      };
    },
    buttonSize() {
      return newButtonSizeOptionsMap[this.size];
    },
  },
};
</script>
<template>
  <b-button
    v-bind="$attrs"
    :rel="relType"
    :target="target"
    :variant="variant"
    :size="buttonSize"
    :class="buttonClasses"
    v-on="$listeners"
  >
    <slot></slot>
  </b-button>
</template>
