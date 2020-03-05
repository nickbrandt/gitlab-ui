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
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot"></slot>
    </template>
  </b-card>
</template>
