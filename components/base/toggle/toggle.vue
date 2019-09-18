<script>
import { GlIcon, GlLoadingIcon } from '../../../index';

export default {
  components: {
    GlIcon,
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
        <gl-icon :name="icon" size="16" />
      </span>
    </button>
  </label>
</template>
