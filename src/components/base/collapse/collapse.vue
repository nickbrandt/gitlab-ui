<script>
import { BCollapse } from 'bootstrap-vue';

export default {
  components: {
    BCollapse,
  },
  model: {
    prop: 'visible',
    event: 'input',
  },
};
</script>

<template>
  <b-collapse v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </b-collapse>
</template>
