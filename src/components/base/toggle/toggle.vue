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
    label: {
      type: String,
      required: false,
      default: undefined,
    },
    help: {
      type: String,
      required: false,
      default: undefined,
    },
    ariaDescribedby: {
      type: String,
      required: false,
      default: undefined,
    },
    labelPosition: {
      type: String,
      required: false,
      default: 'top',
      validator(position) {
        return ['hidden', 'top', 'left'].includes(position);
      },
    },
  },

  computed: {
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
  <div
    class="gl-toggle-wrapper"
    :class="{ 'gl-toggle-label-inline': labelPosition === 'left', 'is-disabled': disabled }"
  >
    <span v-if="label" class="gl-toggle-label">
      <slot name="label">{{ label }}</slot>
    </span>
    <input v-if="name" :name="name" :value="value" type="hidden" />
    <button
      :aria-label="label"
      :aria-describedby="help"
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
    <span v-if="help" :class="{ 'gl-help-label': true, 'gl-w-full': labelPosition === 'left' }">
      <slot name="help">{{ help }}</slot>
    </span>
  </div>
</template>
