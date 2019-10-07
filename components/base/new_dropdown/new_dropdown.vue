<script>
import { isVisible, selectAll } from 'bootstrap-vue/src/utils/dom';
import BDropdown from 'bootstrap-vue/src/components/dropdown/dropdown';
import {
  newButtonCategoryOptions,
  newDropdownVariantOptions,
  newButtonSizeOptions,
} from '../../../utils/constants';
import ButtonMixin from '../../mixins/button_mixin';

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
  },
  mixins: [ButtonMixin],
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
    category: {
      type: String,
      required: false,
      default: newButtonCategoryOptions.tertiary,
      validator: value => Object.keys(newButtonCategoryOptions).includes(value),
    },
    variant: {
      type: String,
      required: false,
      default: newDropdownVariantOptions.default,
      validator: value => Object.keys(newDropdownVariantOptions).includes(value),
    },
    size: {
      type: String,
      required: false,
      default: newButtonSizeOptions.medium,
      validator: value => Object.keys(newButtonSizeOptions).includes(value),
    },
  },
  computed: {
    renderCaret() {
      if (this.split || this.noCaret) {
        return false;
      }
      return true;
    },
    categoryHandler() {
      return this.category === 'secondary' ? 'btn-secondary' : null;
    },
  },
};
</script>

<template>
  <b-dropdown
    class="gl-new-dropdown"
    v-bind="$attrs"
    :split="split"
    :variant="variant"
    :size="buttonSize"
    :toggle-class="categoryHandler"
    v-on="$listeners"
  >
    <slot></slot>
    <slot slot="button-content" name="button-content">
      {{ text }}
      <i v-if="renderCaret" class="fa fa-chevron-down" aria-hidden="true"></i>
    </slot>
  </b-dropdown>
</template>
