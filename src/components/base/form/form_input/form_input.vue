<script>
import { BFormInput } from 'bootstrap-vue';
import { formInputSizes } from '../../../../utils/constants';

const model = {
  prop: 'value',
  event: 'input',
};

export default {
  components: {
    BFormInput,
  },
  inheritAttrs: false,
  model,
  props: {
    size: {
      type: String,
      required: false,
      default: null,
      validator: value => Object.values(formInputSizes).includes(value),
    },
  },
  computed: {
    cssClasses() {
      return {
        [`gl-form-input-${this.size}`]: this.size !== null,
      };
    },
    listeners() {
      return {
        ...this.$listeners,
        // Swap purpose of input and update events from underlying BFormInput.
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
  <b-form-input class="gl-form-input" :class="cssClasses" v-bind="$attrs" v-on="listeners" />
</template>
