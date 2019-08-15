<script>
import BCFooter from 'bootstrap-vue/src/components/card/card-footer';
export default {
  components: {
    BCFooter,
  },
  inheritAttrs: false,
};
</script>

<template>
    <b-card-footer v-bind="$attrs">
        <slot></slot>
    </b-card-footer>
</template>
