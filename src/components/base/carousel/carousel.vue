<script>
import { BCarousel } from 'bootstrap-vue';

export default {
  components: {
    BCarousel,
  },
};
</script>
<template>
  <b-carousel v-bind="$attrs" v-on="$listeners">
    <template v-for="(_, slot) of $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </b-carousel>
</template>
