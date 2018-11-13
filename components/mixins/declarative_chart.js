import { compileChildren } from '../../helpers/utils';

export default {
  computed: {
    declarations() {
      return compileChildren(this.$slots.default);
    },
  },
};
