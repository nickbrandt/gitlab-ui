<script>
import isEmpty from 'lodash/isEmpty';
import GlIcon from '../icon/icon.vue';
import { maxZIndex } from '../../../utils/constants';

export default {
  components: {
    GlIcon,
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
        <span>
          <slot name="header"></slot>
        </span>
        <button class="gl-drawer-close-button" @click="$emit('close')">
          <gl-icon name="close" />
        </button>
      </div>
      <div class="gl-drawer-body">
        <slot></slot>
      </div>
    </aside>
  </transition>
</template>
