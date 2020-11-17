<script>
import { splitAfterSymbols } from '../../../utils/string_utils';
import { intersperse } from '../../../utils/data_utils';

export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    symbols: {
      type: Array,
      required: false,
      default: () => ['/'],
    },
  },
  render(createElement) {
    const textParts = splitAfterSymbols(this.symbols, this.text);
    const content = intersperse(() => createElement('wbr'), textParts);

    return createElement('span', { class: 'text-break' }, content);
  },
};
</script>
