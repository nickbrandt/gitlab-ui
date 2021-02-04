<script>
import { BFormGroup } from 'bootstrap-vue';
import { isString, isArray, isPlainObject } from 'lodash';

export default {
  components: {
    BFormGroup,
  },
  inheritAttrs: false,
  props: {
    labelClass: {
      type: [String, Array, Object],
      required: false,
      default: null,
    },
  },
  computed: {
    actualLabelClass() {
      const { labelClass } = this;
      const defaultClass = 'col-form-label';

      if (isString(labelClass)) {
        return `${labelClass} ${defaultClass}`;
      }
      if (isArray(labelClass)) {
        return [...labelClass, defaultClass];
      }
      if (isPlainObject(labelClass)) {
        return { ...labelClass, [defaultClass]: true };
      }
      return defaultClass;
    },
  },
};
</script>
<template>
  <b-form-group v-bind="$attrs" class="gl-form-group" :label-class="actualLabelClass">
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot"></slot>
  </b-form-group>
</template>
