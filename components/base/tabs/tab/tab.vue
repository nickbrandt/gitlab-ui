<script>
import BTab from 'bootstrap-vue/src/components/tabs/tab';

export default {
  components: {
    BTab,
  },
  inheritAttrs: false,
};
</script>
<template>
  <b-tab
    class="gl-tab-content"
    title-link-class="gl-tab-nav-item"
    v-bind="$attrs"
    v-on="$listeners">
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot"></slot>
  </b-tab>
</template>
