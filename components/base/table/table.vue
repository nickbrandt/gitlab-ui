<script>
import BTable from 'bootstrap-vue/es/components/table/table';

export default {
  components: {
    BTable,
  },
};
</script>
<template>
  <b-table v-bind="$attrs" v-on="$listeners"/>
</template>
