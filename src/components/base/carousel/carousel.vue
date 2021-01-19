<script>
import { BCarousel } from 'bootstrap-vue';

export default {
  components: {
    BCarousel,
  },
};
</script>
<template>
  <b-carousel class="gl-carousel" v-bind="$attrs" v-on="$listeners">
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot"></slot>
  </b-carousel>
</template>
