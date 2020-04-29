<script>
import { BTable } from 'bootstrap-vue';

export default {
  components: {
    BTable,
  },
  inheritAttrs: false,
  data() {
    return {
      sortBy: '',
      isDescending: false,
    };
  },
  computed: {
    direction() {
      return this.isDescending ? 'DESC' : 'ASC';
    },
  },
  methods: {
    sortingChanged() {
      this.$emit('fetch-sorted-data', { columnKey: this.sortBy, direction: this.direction });
    },
  },
};
</script>

<template>
  <b-table
    class="gl-table"
    v-bind="$attrs"
    :sort-by.sync="sortBy"
    :sort-desc.sync="isDescending"
    :no-local-sorting="true"
    @sort-changed="sortingChanged"
    v-on="$listeners"
  >
    <!-- This allows us to pass all slots and scoped slots to the bootstrap vue table's slots -->
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot"></slot>
    <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </b-table>
</template>
