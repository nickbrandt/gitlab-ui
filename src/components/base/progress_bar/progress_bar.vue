<script>
import BProgress from 'bootstrap-vue/src/components/progress/progress';

export default {
  components: {
    BProgress,
  },
};
</script>

<template>
  <b-progress v-bind="$attrs" />
</template>
