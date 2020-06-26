<script>
import GlClearIconButton from '../../shared_components/clear_icon_button/clear_icon_button.vue';
import GlIcon from '../icon/icon.vue';
import GlFormInput from '../form/form_input/form_input.vue';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';

export default {
  components: {
    GlClearIconButton,
    GlIcon,
    GlFormInput,
    GlLoadingIcon,
  },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    clearButtonTitle: {
      type: String,
      required: false,
      default: 'Clear',
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    tooltipContainer: {
      required: false,
      default: false,
      validator: value =>
        value === false || typeof value === 'string' || value instanceof HTMLElement,
    },
  },
  computed: {
    inputAttributes() {
      const attributes = {
        type: 'text',
        placeholder: 'Search',
        ...this.$attrs,
      };

      if (!attributes['aria-label']) {
        attributes['aria-label'] = attributes.placeholder;
      }

      return attributes;
    },
    hasValue() {
      return Boolean(this.localValue.length);
    },
    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    clearInput() {
      this.localValue = '';
      this.focusInput();
    },
    focusInput() {
      this.$refs.input.$el.focus();
    },
  },
};
</script>

<template>
  <div class="gl-search-box-by-type">
    <gl-icon name="search" class="gl-search-box-by-type-search-icon" />
    <gl-form-input
      ref="input"
      v-model="localValue"
      class="gl-search-box-by-type-input"
      v-bind="inputAttributes"
      v-on="$listeners"
    />
    <div class="gl-search-box-by-type-right-icons">
      <gl-loading-icon v-if="isLoading" class="gl-search-box-by-type-loading-icon" />

      <gl-clear-icon-button
        v-show="hasValue"
        :title="clearButtonTitle"
        :tooltip-container="tooltipContainer"
        class="gl-search-box-by-type-clear gl-clear-icon-button"
        @click="clearInput"
      />
    </div>
  </div>
</template>
