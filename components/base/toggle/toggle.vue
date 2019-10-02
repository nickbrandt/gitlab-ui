<script>
import { getSvgIconPathContent } from '../../../utils/svg_utils';
import { GlLoadingIcon } from '../../../index';

export default {
  components: {
    GlLoadingIcon,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    name: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: Boolean,
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    labelOn: {
      type: String,
      required: false,
      default: 'Toggle Status: ON',
    },
    labelOff: {
      type: String,
      required: false,
      default: 'Toggle Status: OFF',
    },
  },

  computed: {
    ariaLabel() {
      return this.value ? this.labelOn : this.labelOff;
    },
    icon() {
      return this.value ? 'mobile-issue-close' : 'close';
    },
    path() {
      return getSvgIconPathContent(this.icon);
    },
  },

  methods: {
    toggleFeature() {
      if (!this.disabled) this.$emit('change', !this.value);
    },
  },
};
</script>

<template>
  <label class="gl-toggle-wrapper">
    <input v-if="name" :name="name" :value="value" type="hidden" />
    <button
      :aria-label="ariaLabel"
      :class="{
        'gl-toggle': true,
        'is-checked': value,
        'is-disabled': disabled,
      }"
      type="button"
      @click="toggleFeature"
    >
      <gl-loading-icon v-if="isLoading" color="light" class="gl-mt-1" />
      <span v-else :class="{ 'toggle-icon': true, disabled: disabled }">
        <svg
          id="mobile-issue-close"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="s16"
        >
          <path :d="path" />
        </svg>
      </span>
    </button>
  </label>
</template>
