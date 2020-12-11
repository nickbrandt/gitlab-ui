<script>
import GlIcon from '../icon/icon.vue';
import {
  tokenVariants,
  tokenChevronSkippingPatternPalette,
  tokenChevronSkippingPatternWeights,
} from '../../../utils/constants';

export default {
  components: {
    GlIcon,
  },
  props: {
    viewOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    variant: {
      type: String,
      required: false,
      default: 'default',
      validator: variant => tokenVariants.includes(variant),
    },
    categoryPalette: {
      type: String,
      required: false,
      default: null,
      validator: categoryPalette => tokenChevronSkippingPatternPalette[categoryPalette],
    },
    categoryWeight: {
      type: String,
      required: false,
      default: null,
      validator: categoryWeight => tokenChevronSkippingPatternWeights[categoryWeight],
    },
  },
  computed: {
    categoryClass() {
      if (!(this.categoryPalette && this.categoryWeight)) {
        return '';
      }

      return `gl-token-category gl-token-category-${this.categoryPalette}-${this.categoryWeight}`;
    },
    variantClass() {
      return `gl-token-${this.variant}-variant`;
    },
  },
  methods: {
    close($event) {
      this.$emit('close', $event);
    },
  },
};
</script>

<template>
  <span :class="['gl-token', variantClass, categoryClass]" v-on="$listeners">
    <span class="gl-token-content">
      <slot></slot>
      <gl-icon v-if="!viewOnly" class="gl-token-close" name="close" :size="16" @click="close" />
    </span>
  </span>
</template>
