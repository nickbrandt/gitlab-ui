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
      <span class="gl-avatar-labeled-label">{{ label }}</span>
      <span class="gl-avatar-labeled-sublabel">{{ subLabel }}</span>
    </div>
  </div>
</template>
