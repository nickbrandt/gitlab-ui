<script>
import GlIcon from '../icon/icon.vue';
import { tokenVariants } from '../../../utils/constants';

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
      default: 'default',
      validator: variant => tokenVariants.includes(variant),
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
  <span :class="['gl-token', `gl-token-${variant}-variant`]">
    <span class="gl-token-content">
      <slot></slot>
      <gl-icon v-if="!viewOnly" class="gl-token-close" name="close" :size="12" @click="close" />
    </span>
  </span>
</template>
