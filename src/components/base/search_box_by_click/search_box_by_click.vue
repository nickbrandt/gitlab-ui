<script>
import GlFormInput from '../form/form_input/form_input.vue';
import GlButton from '../button/button.vue';
import GlTooltip from '../../../directives/tooltip';

export default {
  components: {
    GlFormInput,
    GlButton,
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
    isDisabled() {
      return this.$attrs.disabled;
    },
    hasValue() {
      return this.localValue !== '';
    },
    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    isResetButtonVisible() {
      return !this.isDisabled && this.hasValue;
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
    onSearch() {
      this.$emit('submit', this.localValue);
    },
  },
};
</script>

<template>
  <div>
    <div class="position-relative ms-no-clear d-flex flex-fill">
      <gl-form-input
        ref="input"
        v-model="localValue"
        v-bind="inputAttributes"
        :class="{ 'pr-5': !isResetButtonVisible, 'pr-6': isResetButtonVisible }"
        v-on="$listeners"
        @keyup.enter.native="onSearch"
      />
      <div
        class="position-absolute position-top-0 h-100 d-flex align-items-center text-muted position-right-0"
      >
        <i
          v-show="isResetButtonVisible"
          ref="clearInput"
          v-gl-tooltip.hover
          class="fa fa-times fa-lg pl-2 pr-2 cursor-pointer"
          aria-hidden="true"
          title="Clear"
          @click="clearInput"
        ></i>
        <div class="border-left">
          <gl-button class="btn-transparent" aria-label="Search Button" :disabled="isDisabled">
            <i class="fa fa-search" aria-hidden="true" @click="onSearch"></i>
          </gl-button>
        </div>
      </div>
    </div>
  </div>
</template>
