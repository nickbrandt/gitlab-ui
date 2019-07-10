<script>
import BTabs from 'bootstrap-vue/src/components/tabs/tabs';

export default {
  components: {
    BTabs,
  },
  inheritAttrs: false,
};
</script>

<template>
  <b-tabs v-bind="$attrs" v-on="$listeners">
    <slot></slot>
    <template v-slot:tabs><slot name="tabs"></slot></template>
    <template v-slot:empty><slot name="empty"></slot></template>
  </b-tabs>
</template>
