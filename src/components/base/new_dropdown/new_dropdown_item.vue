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
      isRequired: false,
      default: '',
    },
    iconColor: {
      type: String,
      isRequired: false,
      default: '',
    },
    iconName: {
      type: String,
      isRequired: false,
      default: '',
    },
    iconRightName: {
      type: String,
      isRequired: false,
      default: '',
    },
    isChecked: {
      type: Boolean,
      isRequired: false,
      default: false,
    },
    isCheckItem: {
      type: Boolean,
      isRequired: false,
      default: false,
    },
    secondaryText: {
      type: String,
      isRequired: false,
      default: '',
    },
    containerClasses: {
      type: String,
      isRequired: false,
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
    :class="['gl-new-dropdown-item', ...containerClasses]"
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
