<script>
import GlAvatar from '../avatar/avatar.vue';

export default {
  components: {
    GlAvatar,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    subLabel: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>
<template>
  <div class="gl-avatar-labeled">
    <gl-avatar v-bind="$attrs" alt v-on="$listeners" />
    <div class="gl-avatar-labeled-labels">
      <div class="gl-display-flex gl-flex-wrap gl-align-items-center gl-mx-n1 gl-my-n1">
        <span class="gl-avatar-labeled-label">{{ label }}</span>
        <slot name="meta"></slot>
      </div>
      <span class="gl-avatar-labeled-sublabel">{{ subLabel }}</span>
    </div>
  </div>
</template>
