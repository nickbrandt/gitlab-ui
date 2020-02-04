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
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot"></slot>
  </b-carousel-slide>
</template>
