<script>
import GlIcon from '../icon/icon.vue';
import GlFormInput from '../form/form_input/form_input.vue';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';
import GlTooltip from '../../../directives/tooltip';

export default {
  components: {
    GlIcon,
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

      <button
        v-if="hasValue"
        v-gl-tooltip.hover
        title="Clear"
        aria-hidden="true"
        class="gl-search-box-by-type-clear"
        name="clear"
        @click="clearInput"
      >
        <gl-icon name="clear" />
      </button>
    </div>
  </div>
</template>
