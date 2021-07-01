<script>
import { BTable } from 'bootstrap-vue';

export default {
  components: {
    BTable,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-table class="gl-table" v-bind="$attrs" v-on="$listeners">
    <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </b-table>
</template>
