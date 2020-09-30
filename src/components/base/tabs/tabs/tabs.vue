<script>
import { BTabs } from 'bootstrap-vue';
import { glThemes } from '../../../../utils/constants';

export default {
  components: {
    BTabs,
  },
  inheritAttrs: false,
  props: {
    theme: {
      type: String,
      required: false,
      default: 'indigo',
      validator: theme => glThemes.includes(theme),
    },
    contentClass: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    activeItemBorderClass() {
      return `gl-tab-nav-item-active-${this.theme}`;
    },
  },
};
</script>

<template>
  <b-tabs
    :no-nav-style="true"
    :no-fade="true"
    :no-key-nav="true"
    :active-nav-item-class="`gl-tab-nav-item-active ${activeItemBorderClass}`"
    :content-class="[contentClass, 'gl-tab-content']"
    nav-class="gl-tabs-nav"
    class="gl-tabs"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot"></slot>
  </b-tabs>
</template>
