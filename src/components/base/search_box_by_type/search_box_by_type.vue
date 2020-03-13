<script>
import ClearIconButton from '../../shared_components/clear_icon_button/clear_icon_button.vue';
import GlFormInput from '../form/form_input/form_input.vue';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';

export default {
  components: {
    ClearIconButton,
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
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    tooltipContainer: {
      required: false,
      default: false,
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

      <clear-icon-button
        v-gl-tooltip.hover="{ container: tooltipContainer }"
        @button-clicked="clearInput"
        :value="localValue"
        aria-hidden="true"
        buttonClass="gl-search-box-by-type-clear gl-clear-icon-button"
        name="clear"
        title="Clear"
      />
    </div>
  </div>
</template>
