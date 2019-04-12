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
  <b-form-select v-bind="$attrs" v-on="$listeners">
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot"></slot>
  </b-form-select>
</template>
<style scoped>
/*
This is a temporary measure to ensure custom select styles are not affected by our
lack of an autoprefixer tool for compiling bootstrap.

TODO: Remove once bootstrap is included in gitlab-ui or we include an autoprefixer
on gitlab-ce/ee
*/
.custom-select {
  -webkit-appearance: none;
}
</style>
