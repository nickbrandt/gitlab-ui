<script>
import BFormSelect from 'bootstrap-vue/src/components/form-select/form-select';

export default {
  components: {
    BFormSelect,
  },
  inheritAttrs: false,
};
</script>
<template>
  <b-form-select class="gl-form-select" v-bind="$attrs" v-on="$listeners">
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot"></slot>
  </b-form-select>
</template>
