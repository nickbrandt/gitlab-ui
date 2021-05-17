<script>
import { colorThemes } from '../../../utils/constants';
import CloseButton from '../../shared_components/close_button/close_button.vue';
import GlIcon from '../icon/icon.vue';

export default {
  components: {
    CloseButton,
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
      validator: (value) => Object.keys(colorThemes).includes(value),
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
    <close-button
      ref="dismiss"
      class="gl-close-btn-color-inherit gl-broadcast-message-dismiss"
      :label="dismissLabel"
      @click="$emit('dismiss')"
    />
  </div>
</template>
