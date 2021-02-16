<script>
import { intersperse } from '../../../utils/data_utils';
import { splitAfterSymbols } from '../../../utils/string_utils';

export default {
  functional: true,
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
  render(createElement, { props }) {
    const { symbols, text } = props;
    const textParts = splitAfterSymbols(symbols, text);
    const content = intersperse(() => createElement('wbr'), textParts);

    return createElement('span', { class: 'text-break' }, content);
  },
};
</script>
