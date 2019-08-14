<script>
import BFormInput from 'bootstrap-vue/src/components/form-input/form-input';

export default {
  components: {
    BFormInput,
  },
  // Promoting this component to functional breaks our tests
  // See https://github.com/vuejs/vue-test-utils/issues/1292
  // functional: true,
  inheritAttrs: false,
  render(createElement) {
    const attrs = { ...this.$attrs };
    if (!attrs['aria-label'] && attrs.placeholder) {
      attrs['aria-label'] = attrs.placeholder;
    }
    return createElement(BFormInput, { attrs, on: this.$listeners });
  },
};
</script>
