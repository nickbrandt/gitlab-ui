<script>
import BCard from 'bootstrap-vue/src/components/card/card';

export default {
  components: {
    BCard,
  },
};
</script>

<template>
  <b-card>
    <slot></slot>
  </b-card>
</template>
