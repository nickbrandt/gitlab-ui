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
  model: {
    prop: 'value',
    event: 'update',
  },
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
      return Boolean(this.value.length);
    },
  },
  methods: {
    clearInput() {
      this.$emit('update', '');
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
    <gl-icon name="search" class="gl-search-box-by-type-icon left" />
    <gl-form-input
      ref="input"
      class="gl-search-box-by-type-input"
      v-bind="inputAttributes"
      :value="value"
      v-on="$listeners"
    />
    <div class="gl-search-box-by-type-right-icons">
      <gl-loading-icon v-if="isLoading" class="gl-search-box-by-type-icon" />

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
