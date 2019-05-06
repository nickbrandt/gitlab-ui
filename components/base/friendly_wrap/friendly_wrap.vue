<script>
import escape from 'lodash/escape';
import escapeRegExp from 'lodash/escapeRegExp';

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
  computed: {
    displayText() {
      const symbolsRegex = this.symbols.reduce(
        (acc, symbol, index) => (symbol ? `${acc}${index ? '|' : ''}${escapeRegExp(symbol)}` : acc),
        ''
      );
      return escape(this.text).replace(new RegExp(`(${symbolsRegex})`, 'g'), `$1<wbr>`);
    },
  },
};
</script>

<template>
  <span class="text-break" v-html="displayText"></span>
</template>
