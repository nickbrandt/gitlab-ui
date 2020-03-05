<script>
import { BFormGroup } from 'bootstrap-vue';

export default {
  components: {
    BFormGroup,
  },
  inheritAttrs: false,
};
</script>
<template>
  <b-form-group v-bind="$attrs" class="gl-form-group" label-class="col-form-label">
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot"></slot>
    </template>
  </b-form-group>
</template>
