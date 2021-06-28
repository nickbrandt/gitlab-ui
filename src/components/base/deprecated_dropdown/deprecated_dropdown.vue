<script>
import { BDropdown } from 'bootstrap-vue';
import { isVisible, selectAll } from 'bootstrap-vue/src/utils/dom';
import GlIcon from '../icon/icon.vue';

// Return an Array of visible items
function filterVisible(els) {
  return (els || []).filter(isVisible);
}

const Selector = {
  ITEM_SELECTOR:
    '.dropdown-item:not(.disabled):not([disabled]),.form-control:not(.disabled):not([disabled])',
};

// see https://gitlab.com/gitlab-org/gitlab-ui/merge_requests/130#note_126406721
const ExtendedBDropdown = {
  extends: BDropdown,
  methods: {
    getItems() {
      return filterVisible(selectAll(Selector.ITEM_SELECTOR, this.$refs.menu));
    },
  },
};

export default {
  components: {
    BDropdown: ExtendedBDropdown,
    GlIcon,
  },
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      required: false,
      default: '',
    },
    noCaret: {
      type: Boolean,
      required: false,
      default: false,
    },
    split: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    renderCaret() {
      if (this.split || this.noCaret) {
        return false;
      }
      return true;
    },
  },
  methods: {
    hide(...args) {
      this.$refs.dropdown.hide(...args);
    },
    show(...args) {
      this.$refs.dropdown.show(...args);
    },
  },
};
</script>

<template>
  <b-dropdown ref="dropdown" class="gl-dropdown" v-bind="$attrs" :split="split" v-on="$listeners">
    <slot></slot>
    <template #button-content>
      <slot name="button-content">
        <span class="gl-dropdown-toggle-text">{{ text }}</span>
        <gl-icon v-if="renderCaret" class="gl-dropdown-caret" name="chevron-down" />
      </slot>
    </template>
  </b-dropdown>
</template>
