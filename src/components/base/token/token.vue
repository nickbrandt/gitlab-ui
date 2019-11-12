<script>
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
  },
  methods: {
    close($event) {
      this.$emit('close', $event);
    },
  },
};
</script>

<template>
  <span class="gl-token">
    <span class="gl-token-content">
      <slot></slot>
      <gl-icon v-if="!viewOnly" class="gl-token-close" name="close" :size="12" @click="close" />
    </span>
  </span>
</template>
