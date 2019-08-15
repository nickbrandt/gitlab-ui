<script>
import BCText from 'bootstrap-vue/src/components/card/card-text';
export default {
  components: {
    BCText,
  },
  inheritAttrs: false,
};
</script>

<template>
    <b-card-text v-bind="$attrs">
        <slot></slot>
    </b-card-text>
</template>
