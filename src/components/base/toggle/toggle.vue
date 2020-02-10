<script>
import GlIcon from '../icon/icon.vue';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';

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
    ariaDescribedby: {
      type: String,
      required: false,
      default: undefined,
    },
    labelPosition: {
      type: String,
      required: false,
      default: 'hidden',
      validator(position) {
        return ['hidden', 'top', 'right'].includes(position);
      },
    },
  },

  computed: {
    labelText() {
      return this.value ? this.labelOn : this.labelOff;
    },
    ariaLabel() {
      return this.labelPosition === 'hidden' ? this.labelText : undefined;
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
  <label class="gl-toggle-wrapper" :class="{ 'gl-toggle-label-inline': labelPosition === 'right' }">
    <span v-if="labelPosition !== 'hidden'" class="gl-toggle-label">
      <slot v-if="value" name="labelOn">{{ labelText }}</slot>
      <slot v-else name="labelOff">{{ labelText }}</slot>
    </span>
    <input v-if="name" :name="name" :value="value" type="hidden" />
    <button
      :aria-label="ariaLabel"
      :aria-describedby="ariaDescribedby"
      :class="{
        'gl-toggle': true,
        'is-checked': value,
        'is-disabled': disabled,
      }"
      type="button"
      @click="toggleFeature"
    >
      <gl-loading-icon v-if="isLoading" color="light" class="toggle-loading" />
      <span v-else :class="{ 'toggle-icon': true, disabled: disabled }">
        <gl-icon :name="icon" :size="16" />
      </span>
    </button>
  </label>
</template>
