<script>
import { badgeVariantOptions, variantCssColorMap } from '../../../utils/constants';
import GlBadge from '../../base/badge/badge.vue';
import GlIcon from '../../base/icon/icon.vue';

export default {
  components: {
    GlIcon,
    GlBadge,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    unit: {
      type: [String, Number],
      required: false,
      default: null,
    },
    variant: {
      type: String,
      required: false,
      default: badgeVariantOptions.muted,
      validator: (variant) => Object.values(badgeVariantOptions).includes(variant),
    },
    titleIcon: {
      type: String,
      required: false,
      default: null,
    },
    metaIcon: {
      type: String,
      required: false,
      default: null,
    },
    metaText: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    showMetaIcon() {
      return Boolean(this.metaIcon && !this.metaText);
    },
    showBadge() {
      return Boolean(this.metaText);
    },
    showTitleIcon() {
      return Boolean(this.titleIcon);
    },
    textColor() {
      return variantCssColorMap[this.variant];
    },
  },
};
</script>

<template>
  <div class="gl-single-stat gl-display-flex gl-flex-direction-column">
    <div class="gl-display-flex gl-align-items-center gl-text-gray-700 gl-mb-2">
      <gl-icon v-if="showTitleIcon" :name="titleIcon" class="gl-mr-2" data-testid="title-icon" />
      <span class="gl-font-base gl-font-weight-normal" data-testid="title-text">{{ title }}</span>
    </div>
    <div class="gl-display-flex gl-align-items-baseline gl-font-weight-bold gl-text-gray-900">
      <span class="gl-font-size-h-display" :class="{ 'gl-mr-2': !unit }" data-testid="value">{{
        value
      }}</span>
      <span v-if="unit" class="gl-font-sm gl-mr-2" data-testid="unit">{{ unit }}</span>
      <gl-icon v-if="showMetaIcon" :class="textColor" :name="metaIcon" data-testid="meta-icon" />
      <gl-badge v-if="showBadge" :variant="variant" :icon="metaIcon" data-testid="meta-badge">{{
        metaText
      }}</gl-badge>
    </div>
  </div>
</template>
