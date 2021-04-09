<script>
import { tokenVariants } from '../../../utils/constants';
import CloseButton from '../../shared_components/close_button/close_button.vue';

export default {
  components: {
    CloseButton,
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
      let classes = `gl-token-${this.variant}-variant`;
      if (!this.viewOnly) classes += ' gl-pt-0! gl-pr-0! gl-pb-0!';
      return classes;
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
      <close-button v-if="!viewOnly" class="gl-token-close" label="close" @click="close" />
    </span>
  </span>
</template>
