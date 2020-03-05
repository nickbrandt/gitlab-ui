<script>
import { BPopover } from 'bootstrap-vue';

export default {
  components: {
    BPopover,
  },
  inheritAttrs: false,
  props: {
    cssClasses: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  computed: {
    customClass() {
      return ['gl-popover', ...this.cssClasses].join(' ');
    },
  },
};
</script>

<template>
  <b-popover ref="bPopover" :custom-class="customClass" v-bind="$attrs" v-on="$listeners">
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot"></slot>
    </template>
  </b-popover>
</template>
