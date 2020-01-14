<script>
import GlIcon from '../icon/icon.vue';
import { colorThemes } from '../../../utils/constants';

export default {
  components: {
    GlIcon,
  },
  props: {
    iconName: {
      type: String,
      required: false,
      default: 'bullhorn',
    },
    dismissLabel: {
      type: String,
      required: false,
      default: 'Dismiss',
    },
    theme: {
      type: String,
      required: false,
      default: Object.keys(colorThemes)[0],
      validator: value => Object.keys(colorThemes).includes(value),
    },
  },
};
</script>

<template>
  <div class="gl-broadcast-message" :class="theme" role="alert">
    <div class="gl-broadcast-message-content">
      <div class="gl-broadcast-message-icon">
        <gl-icon :name="iconName" />
      </div>
      <div class="gl-broadcast-message-text">
        <slot></slot>
      </div>
    </div>
    <footer class="gl-broadcast-message-footer">
      <button
        ref="dismiss"
        type="button"
        class="gl-broadcast-message-dismiss"
        :aria-label="dismissLabel"
        @click="$emit('dismiss')"
      >
        <gl-icon class="gl-broadcast-message-dismiss-icon" name="close" />
        <span class="gl-broadcast-message-dismiss-label">{{ dismissLabel }}</span>
      </button>
    </footer>
  </div>
</template>
