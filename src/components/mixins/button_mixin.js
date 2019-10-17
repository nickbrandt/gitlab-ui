import { newButtonSizeOptionsMap } from '../../utils/constants';

export default {
  computed: {
    buttonSize() {
      return newButtonSizeOptionsMap[this.size];
    },
  },
};
