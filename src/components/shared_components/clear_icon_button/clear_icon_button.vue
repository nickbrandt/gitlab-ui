<script>
import GlIcon from '../../base/icon/icon.vue';
import GlTooltip from '../../../directives/tooltip';

export default {
  components: {
    GlIcon,
  },
  directives: {
    GlTooltip,
  },
  props: {
    buttonClass: {
      type: String,
      required: false,
      default: 'gl-clear-icon-button',
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
    tooltipContainer: {
      required: false,
      default: false,
      validator: value =>
        value === false || typeof value === 'string' || value instanceof HTMLElement,
    },
  },
  computed: {
    hasValue() {
      return Boolean(this.value && this.value.length);
    },
  },
  methods: {
    buttonClicked() {
      this.$emit('button-clicked');
    }
  }
};
</script>

<template>
  <button
    v-if="hasValue"
    :class="buttonClass"
    @click="buttonClicked"
  >
    <gl-icon name="clear" />
  </button>
</template>
