<script>
import { POSITION } from './constants';

export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: false,
      default: POSITION.END,
      validator: (value) => Object.values(POSITION).includes(value),
    },
  },
  data() {
    return {
      POSITION,
    };
  },
  computed: {
    middleIndex() {
      return Math.floor(this.text.length / 2);
    },

    first() {
      return this.text.slice(0, this.middleIndex);
    },
    last() {
      return this.text.slice(this.middleIndex);
    },
  },
};
</script>

<template>
  <!-- START  -->
  <span v-if="position === POSITION.START" class="gl-truncate" :title="text">
    <span class="gl-truncate-start gl-text-overflow-ellipsis!">&lrm;{{ text }}&lrm;</span>
  </span>

  <!-- MIDDLE  -->
  <span v-else-if="position === POSITION.MIDDLE" class="gl-truncate" :title="text">
    <span class="gl-truncate-end">{{ first }}</span
    ><span class="gl-truncate-start">&lrm;{{ last }}&lrm;</span>
  </span>

  <!-- END  -->
  <span v-else class="gl-truncate" :title="text">
    <span class="gl-truncate-end">{{ text }}</span>
  </span>
</template>
