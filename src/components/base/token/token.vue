<script>
import { tokenVariants } from '../../../utils/constants';
import GlIcon from '../icon/icon.vue';

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
      validator: (variant) => tokenVariants.includes(variant),
    },
  },
  computed: {
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
  <span :class="['gl-token', variantClass]" v-on="$listeners">
    <span class="gl-token-content">
      <slot></slot>
      <gl-icon v-if="!viewOnly" class="gl-token-close" name="close" :size="16" @click="close" />
    </span>
  </span>
</template>
