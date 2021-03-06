<script>
import isEmpty from 'lodash/isEmpty';
import { maxZIndex } from '../../../utils/constants';
import GlButton from '../button/button.vue';

export default {
  components: {
    GlButton,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    headerHeight: {
      type: String,
      required: false,
      default: '',
    },
    zIndex: {
      type: Number,
      required: false,
      default: maxZIndex,
    },
  },
  computed: {
    positionFromTop() {
      return !isEmpty(this.headerHeight) ? this.headerHeight : 0;
    },
    drawerStyles() {
      const styles = {
        top: this.positionFromTop,
        zIndex: this.zIndex,
      };

      if (this.positionFromTop) {
        styles.maxHeight = `calc(100vh - ${this.positionFromTop})`;
      }

      return styles;
    },
  },
  watch: {
    open: {
      immediate: true,
      handler(open) {
        if (open) {
          document.addEventListener('keydown', this.handleEscape);
        } else {
          document.removeEventListener('keydown', this.handleEscape);
        }
      },
    },
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleEscape);
  },
  methods: {
    handleEscape(e) {
      const ESC = 27;

      if (this.open && e.keyCode === ESC) {
        this.$emit('close');
      }
    },
  },
};
</script>
<template>
  <transition name="gl-drawer">
    <aside v-if="open" :style="drawerStyles" class="gl-drawer">
      <div class="gl-drawer-header">
        <span class="gl-drawer-title">
          <slot name="title"></slot>
          <gl-button
            category="tertiary"
            size="small"
            icon="close"
            class="gl-drawer-close-button"
            aria-label="Close drawer"
            @click="$emit('close')"
          />
        </span>
        <slot name="header"></slot>
      </div>
      <div class="gl-drawer-body">
        <slot></slot>
      </div>
    </aside>
  </transition>
</template>
