<script>
const sizes = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};
const sizeToStringMap = {
  1: sizes.sm,
  2: sizes.md,
  3: sizes.md,
  4: sizes.lg,
  5: sizes.lg,
};
const colors = {
  orange: 'orange',
  dark: 'dark',
  light: 'light',
};
const defaultSize = sizes.sm;
const defaultColor = colors.orange;

export default {
  props: {
    label: {
      type: String,
      required: false,
      default: 'Loading',
    },
    size: {
      type: [Number, String],
      required: false,
      default: defaultSize,
      validator(value) {
        return (value > 0 && value < 6) || Object.keys(sizes).includes(value);
      },
    },
    color: {
      type: String,
      required: false,
      default: defaultColor,
      validator(value) {
        return Object.keys(colors).includes(value);
      },
    },
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    rootElementType() {
      return this.inline ? 'span' : 'div';
    },
    spinnerColor() {
      return this.color === defaultColor ? 'spinner' : `spinner spinner-${colors[this.color]}`;
    },
    cssClass() {
      return this.size === defaultSize
        ? this.spinnerColor
        : this.spinnerColor + this.spinnerSizeCss;
    },
    sizeToString() {
      return sizeToStringMap[this.size] || defaultSize;
    },
    isSizeString() {
      return Number.isNaN(parseInt(this.size, 10));
    },
    spinnerSizeCss() {
      return this.isSizeString ? ` spinner-${sizes[this.size]} ` : ` spinner-${this.sizeToString}`;
    },
  },
  created() {
    if (!this.isSizeString)
      console.warn("Icon sizes 1 - 5 are deprecated, please use 'sm', 'md' and 'lg' instead."); // eslint-disable-line no-console
  },
};
</script>
<template>
  <component
    :is="rootElementType"
    class="loading-container text-center"
  >
    <span
      :class="cssClass"
      :aria-label="label"
      aria-hidden="true"
    ></span>
  </component>
</template>
