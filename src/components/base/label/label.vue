<script>
import GlLink from '../link/link.vue';
import GlTooltip from '../tooltip/tooltip.vue';
import { labelColorOptions } from '../../../utils/constants';
import { colorFromBackground } from '../../../utils/utils';

const titleColorClassMap = {
  [labelColorOptions.dark]: 'gl-label-text-dark',
  [labelColorOptions.light]: 'gl-label-text-light',
};

export default {
  components: {
    GlLink,
    GlTooltip,
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
    scopedLabelsDocumentationLink: {
      type: String,
      required: false,
      default: '#',
    },
  },
  data() {
    return {
      splitScopedLabelIndex: this.title.lastIndexOf('::'),
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
    :class="[titleColorClass, cssClasses]"
    :style="boxShadow"
    class="gl-label"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <gl-link :href="target" class="gl-label-link">
      <span class="gl-label-text" :style="{ backgroundColor }">{{ scopedKey }}</span>
      <span
        v-if="scoped && scopedValue"
        class="gl-label-text"
        :style="{
          color: scopedValueColor,
        }"
      >
        {{ scopedValue }}
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
