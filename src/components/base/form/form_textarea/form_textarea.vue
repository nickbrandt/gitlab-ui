<script>
import { BFormTextarea } from 'bootstrap-vue';

const model = {
  prop: 'value',
  event: 'input',
};

export default {
  components: {
    BFormTextarea,
  },
  inheritAttrs: false,
  model,
  props: {
    // This prop is needed to map the v-model correctly
    // https://alligator.io/vuejs/add-v-model-support/
    value: {
      type: String,
      required: false,
      default: '',
    },
    noResize: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        // Swap purpose of input and update events from underlying BFormTextarea.
        // See https://gitlab.com/gitlab-org/gitlab-ui/-/issues/631.
        input: (...args) => {
          this.$emit('update', ...args);
        },
        update: (...args) => {
          this.$emit(model.event, ...args);
        },
      };
    },
  },
};
</script>

<template>
  <b-form-textarea
    class="gl-form-input gl-form-textarea"
    :no-resize="noResize"
    v-bind="$attrs"
    :value="value"
    v-on="listeners"
  />
</template>
