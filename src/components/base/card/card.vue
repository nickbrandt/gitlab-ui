<script>
import { BCard } from 'bootstrap-vue';

export default {
  components: {
    BCard,
  },
};
</script>
<template>
  <b-card v-bind="$attrs" v-on="$listeners">
    <template slot="header">
      <slot name="header"></slot>
    </template>
    <slot></slot>
    <template slot="footer">
      <slot name="footer"></slot>
    </template>
  </b-card>
</template>
