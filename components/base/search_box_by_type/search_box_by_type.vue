<script>
import GlFormInput from '../form/form_input/form_input.vue';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';
import GlTooltip from '../../../directives/tooltip';

export default {
  iconWrapperClasses: 'position-absolute position-top-0 h-100 d-flex align-items-center text-muted',
  components: {
    GlFormInput,
    GlLoadingIcon,
  },
  directives: {
    GlTooltip,
  },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      content: this.value,
    };
  },
  computed: {
    inputAttributes() {
      const attributes = Object.assign(
        {
          type: 'text',
          placeholder: 'Search',
        },
        this.$attrs
      );

      if (!attributes['aria-label']) {
        attributes['aria-label'] = attributes.placeholder;
      }

      return attributes;
    },
    hasValue() {
      return this.content !== '';
    },
    hasRightIcon() {
      return this.isResetButtonVisible || this.isLoading;
    },
    isResetButtonVisible() {
      return !this.$attrs.disabled && this.hasValue;
    },
  },
  methods: {
    clearInput() {
      this.$refs.input.$emit('input', '');
      this.focusInput();
    },
    focusInput() {
      this.$refs.input.$el.focus();
    },
    onChange() {
      this.$emit('change', this.content);
    },
    onInput() {
      this.$emit('input', this.content);
    },
  },
};
</script>

<template>
  <div class="position-relative ms-no-clear gl-search-box">
    <gl-icon name="search" />
    <gl-form-input
      ref="input"
      v-model="content"
      v-bind="inputAttributes"
      :value="content"
      class="pl-5"
      :class="{ 'pr-5': isResetButtonVisible }"
      v-on="$listeners"
      @change="onChange"
      @input="onInput"
    />
    <div :class="$options.iconWrapperClasses" class="pl-2 pr-2 position-left-0" @click="focusInput">
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
    <div
      v-show="hasRightIcon"
      :class="$options.iconWrapperClasses"
      class="pr-2 pl-2 position-right-0"
    >
      <gl-loading-icon v-show="isLoading" :inline="true" />
      <i
        v-show="isResetButtonVisible"
        v-gl-tooltip.hover
        class="fa fa-times fa-lg cursor-pointer"
        aria-hidden="true"
        title="Clear"
        @click="clearInput"
      ></i>
    </div>
  </div>
</template>
