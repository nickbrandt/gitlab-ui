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
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot"></slot>
    </template>
  </b-carousel-slide>
</template>
