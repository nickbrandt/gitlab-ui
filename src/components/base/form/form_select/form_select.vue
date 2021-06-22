<script>
import { BFormSelect } from 'bootstrap-vue';

export default {
  components: {
    BFormSelect,
  },
  inheritAttrs: false,
};
</script>
<template>
  <b-form-select class="gl-form-select" v-bind="$attrs" v-on="$listeners">
    <template v-for="(_, slot) of $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </b-form-select>
</template>
