<script>
import { BTab } from 'bootstrap-vue';
import { isArray, isPlainObject } from 'lodash';

import { DEFAULT_TAB_TITLE_LINK_CLASS } from '../constants';

export default {
  components: {
    BTab,
  },
  inheritAttrs: false,
  props: {
    titleLinkClass: {
      type: [String, Array, Object],
      required: false,
      default: '',
    },
    queryParamValue: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    linkClass() {
      const { titleLinkClass } = this;

      if (isArray(titleLinkClass)) {
        return [...titleLinkClass, DEFAULT_TAB_TITLE_LINK_CLASS];
      }
      if (isPlainObject(titleLinkClass)) {
        return { ...titleLinkClass, [DEFAULT_TAB_TITLE_LINK_CLASS]: true };
      }
      return `${titleLinkClass} ${DEFAULT_TAB_TITLE_LINK_CLASS}`.trim();
    },
  },
};
</script>
<template>
  <b-tab
    :title-link-class="linkClass"
    :query-param-value="queryParamValue"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot"></slot>
    </template>
  </b-tab>
</template>
