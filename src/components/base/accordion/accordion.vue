<script>
import { uniqueId } from 'lodash';

export default {
  name: 'GlAccordion',
  provide() {
    return {
      defaultHeaderLevel: this.headerLevel,
      accordionSetId: this.autoCollapse && uniqueId('accordion-set-'),
    };
  },
  props: {
    autoCollapse: {
      type: Boolean,
      required: false,
      default: false,
    },
    headerLevel: {
      type: Number,
      required: true,
      validator(value) {
        return value > 0 && value <= 6;
      },
    },
  },
};
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
