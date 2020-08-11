<script>
import GlLink from '../link/link.vue';
import GlTooltip from '../tooltip/tooltip.vue';
import GlIcon from '../icon/icon.vue';
import { labelColorOptions } from '../../../utils/constants';
import { colorFromBackground } from '../../../utils/utils';

const titleColorClassMap = {
  [labelColorOptions.dark]: 'gl-label-text-dark',
  [labelColorOptions.light]: 'gl-label-text-light',
};

const backgroundCloseColorStyleMap = {
  [labelColorOptions.dark]: 'gl-label-close-dark',
  [labelColorOptions.light]: 'gl-label-close-light',
};

export default {
  components: {
    GlLink,
    GlTooltip,
    GlIcon,
  },
  props: {
    backgroundColor: {
      type: String,
      required: true,
      validator: value => /^(#|rgb|rgba)/.test(value),
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    size: {
      type: String,
      required: false,
      default: '',
    },
    tooltipPlacement: {
      type: String,
      required: false,
      default: 'top',
    },
    target: {
      type: String,
      required: false,
      default: '#',
    },
    scoped: {
      type: Boolean,
      required: false,
      default: false,
    },
    viewOnly: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      splitScopedLabelIndex: this.title.lastIndexOf('::'),
      isCloseHover: false,
    };
  },
  computed: {
    cssClasses() {
      return {
        'gl-label-sm': this.size === 'sm',
        'gl-label-scoped': this.scoped,
      };
    },
    titleColorClass() {
      return titleColorClassMap[colorFromBackground(this.backgroundColor)];
    },
    scopedRightLabelTextColor() {
      return colorFromBackground(this.backgroundColor) === labelColorOptions.dark
        ? this.titleColorClass
        : '';
    },
    scopedKey() {
      return this.scoped ? this.title.slice(0, this.splitScopedLabelIndex) : this.title;
    },
    scopedValue() {
      return this.title.slice(this.splitScopedLabelIndex + 2);
    },
    scopedValueColor() {
      return colorFromBackground(this.backgroundColor) === labelColorOptions.light
        ? this.backgroundColor
        : undefined;
    },
    boxShadow() {
      return {
        '--label-inset-border': `inset 0 0 0 ${this.size === 'sm' ? '1px' : '2px'} ${
          this.backgroundColor
        }`,
      };
    },
    closeButtonContainerStyle() {
      return this.scoped
        ? { color: this.scopedValueColor }
        : { backgroundColor: this.backgroundColor };
    },
    closeButtonClass() {
      return backgroundCloseColorStyleMap[colorFromBackground(this.backgroundColor)];
    },
    closeButtonStyle() {
      if (!this.isCloseHover) {
        return {};
      }

      return this.scoped
        ? { backgroundColor: this.scopedValueColor }
        : { color: this.backgroundColor };
    },
    closeIconSize() {
      return this.size === 'sm' ? 12 : 16;
    },
  },
  watch: {
    title() {
      this.splitScopedLabelIndex = this.title.lastIndexOf('::');
    },
  },
};
</script>

<template>
  <span
    ref="labelTitle"
    :class="cssClasses"
    :style="boxShadow"
    class="gl-label"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <gl-link :href="target" class="gl-label-link">
      <span class="gl-label-text-container gl-display-flex">
        <span class="gl-label-text" :class="titleColorClass" :style="{ backgroundColor }">
          {{ scopedKey }}
        </span>
        <span
          v-if="scoped && scopedValue"
          class="gl-label-text"
          :class="scopedRightLabelTextColor"
          :style="{
            color: scopedValueColor,
          }"
        >
          {{ scopedValue }}
        </span>
      </span>
      <span
        v-if="!viewOnly"
        :style="closeButtonContainerStyle"
        data-testid="close-button"
        @click="$emit('close', $event)"
      >
        <gl-icon
          class="gl-label-close"
          name="close"
          :size="closeIconSize"
          :class="[closeButtonClass, titleColorClass]"
          :style="closeButtonStyle"
          @mouseover="isCloseHover = true"
          @mouseleave="isCloseHover = false"
        />
      </span>
    </gl-link>
    <gl-tooltip
      v-if="description"
      :target="() => $refs.labelTitle"
      :placement="tooltipPlacement"
      boundary="viewport"
    >
      <span v-if="scoped" class="gl-label-tooltip-title">Scoped label</span>
      {{ description }}
    </gl-tooltip>
  </span>
</template>
