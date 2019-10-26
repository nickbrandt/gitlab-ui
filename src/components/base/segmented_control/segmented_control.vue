<script>
import BFormRadioGroup from 'bootstrap-vue/src/components/form-radio/form-radio-group';

const genericErrorMessage = 'Segmented button should always have valid option selected';

export default {
  components: {
    BFormRadioGroup,
  },
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'input',
  },
  props: {
    checked: {
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.checkValue(this.checked);
  },
  watch: {
    checked: {
      handler(newValue, oldValue) {
        this.checkValue(newValue, oldValue);
      },
    },

    options: {
      handler() {
        this.checkValue(this.checked);
      },
    },
  },
  computed: {
    enabledOptions() {
      return this.options.filter(option => !option.disabled);
    },
  },
  methods: {
    checkValue(newValue, oldValue = null) {
      if (!this.enabledOptions.some(({ value }) => value === newValue)) {
        // eslint-disable-next-line no-console
        console.warn(genericErrorMessage);
        if (this.enabledOptions.length) {
          this.$emit('input', oldValue || this.enabledOptions[0].value);
        }
      }
    },
  },
};
</script>
<template>
  <b-form-radio-group
    buttons
    button-variant="gl-segmented-button"
    class="gl-segmented-control"
    v-bind="{ ...$attrs, options, checked }"
    v-on="$listeners"
  />
</template>
