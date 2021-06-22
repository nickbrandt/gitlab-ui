<script>
import { BCarouselSlide } from 'bootstrap-vue';

export default {
  components: {
    BCarouselSlide,
  },
};
</script>
<template>
  <b-carousel-slide v-bind="$attrs" v-on="$listeners">
    <template v-for="(_, slot) of $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </b-carousel-slide>
</template>
