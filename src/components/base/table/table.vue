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
    <!-- This allows us to pass all slots and scoped slots to the bootstrap vue table's slots -->
    <template v-for="(_, slot) of $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope"></slot>
    </template>

    <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </b-table>
</template>
