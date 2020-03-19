<script>
import { BDropdownItem, BDropdownItemButton } from 'bootstrap-vue';
import { variantCssColorMap } from '../../../utils/constants';
import GlIcon from '../icon/icon.vue';

export default {
  components: {
    GlIcon,
  },
  inheritAttrs: false,
  props: {
    avatarUrl: {
      type: String,
      required: false,
      default: '',
    },
    iconColor: {
      type: String,
      required: false,
      default: '',
    },
    iconName: {
      type: String,
      required: false,
      default: '',
    },
    iconRightName: {
      type: String,
      required: false,
      default: '',
    },
    isChecked: {
      type: Boolean,
      required: false,
      default: false,
    },
    isCheckItem: {
      type: Boolean,
      required: false,
      default: false,
    },
    secondaryText: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    bootstrapComponent() {
      return this.$attrs.href ? BDropdownItem : BDropdownItemButton;
    },
    iconColorCss() {
      return variantCssColorMap[this.iconColor] || 'gl-text-gray-700';
    },
    shouldShowCheckIcon() {
      return this.isChecked || this.isCheckItem;
    },
  },
};
</script>

<template>
  <component
    :is="bootstrapComponent"
    class="gl-new-dropdown-item"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <gl-icon
      v-if="shouldShowCheckIcon"
      name="mobile-issue-close"
      :class="['gl-new-dropdown-item-check-icon', { 'gl-visibility-hidden': !isChecked }]"
    />
    <gl-icon
      v-if="iconName"
      :name="iconName"
      :class="['gl-new-dropdown-item-icon', iconColorCss]"
    />
    <gl-avatar v-if="avatarUrl" :size="32" :src="avatarUrl" />
    <div class="gl-new-dropdown-item-text-wrapper">
      <p class="gl-new-dropdown-item-text-primary"><slot></slot></p>
      <p v-if="secondaryText" class="gl-new-dropdown-item-text-secondary">{{ secondaryText }}</p>
    </div>
    <gl-icon v-if="iconRightName" :name="iconRightName" class="gl-new-dropdown-item-icon-right" />
  </component>
</template>
