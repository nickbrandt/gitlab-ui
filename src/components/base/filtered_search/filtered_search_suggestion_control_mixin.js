import KeyCodes from 'bootstrap-vue/src/utils/key-codes';
import { TERM_TOKEN_TYPE } from './filtered_search_utils';

function splitOnQuotes(str) {
  const queue = str.split(' ');
  const result = [];
  let waitingForMatchingQuote = false;
  let quoteContent = '';

  while (queue.length) {
    const part = queue.shift();
    const quoteIndex = part.indexOf('"');
    if (quoteIndex === -1) {
      if (waitingForMatchingQuote) {
        quoteContent += ` ${part}`;
      } else {
        result.push(part);
      }
    } else {
      const [firstPart, secondPart] = part.split('"', 2);

      if (waitingForMatchingQuote) {
        waitingForMatchingQuote = false;
        quoteContent += ` ${firstPart}"`;
        result.push(quoteContent);
        quoteContent = '';
        if (secondPart.length) {
          queue.unshift(secondPart);
        }
      } else {
        waitingForMatchingQuote = true;
        if (firstPart.length) {
          result.push(firstPart);
        }
        quoteContent = `"${secondPart}`;
      }
    }
  }
  return result;
}

export default {
  inject: ['portalName', 'alignSuggestions'],
  methods: {
    hasValue() {
      return this.value.trim().length > 0;
    },

    getSuggestionsContainer() {
      throw new Error(
        'getSuggestionsContainer is not implemented. Please return ref to gl-filtered-search-suggestion-list here'
      );
    },

    getInputContainer() {
      throw new Error(
        'getInputContainer is not implemented. Please return ref to active element of token here'
      );
    },

    destroyToken() {
      if (!this.hasValue()) {
        this.$emit('destroy');
      }
    },

    applySuggestion() {
      throw new Error('applySuggestion not implemented in this component');
    },

    handleInput(evt) {
      const suggestions = this.getSuggestionsContainer();
      const handlers = {
        [KeyCodes.ENTER]: () => this.$emit('submit'),
      };

      const suggestionsHandlers = {
        [KeyCodes.ENTER]: () => {
          const suggestionValue = suggestions.getValue();
          if (suggestionValue) {
            this.applySuggestion(suggestionValue);
          } else {
            this.$emit('submit');
          }
        },
        [KeyCodes.DOWN]: () => suggestions.nextItem(),
        [KeyCodes.UP]: () => suggestions.prevItem(),
      };

      if (suggestions) {
        Object.assign(handlers, suggestionsHandlers);
      }

      const key = evt.keyCode;

      if (Object.keys(handlers).includes(key.toString())) {
        evt.preventDefault();
        handlers[key]();
        return true;
      }

      if (key === KeyCodes.BACKSPACE && !this.hasValue()) {
        evt.preventDefault();
        this.destroyToken();
        return true;
      }

      return false;
    },

    deactivate($evt) {
      const suggestions = this.getSuggestionsContainer();

      if (this.active && (!suggestions || !suggestions.$el.contains($evt.relatedTarget))) {
        this.$emit('deactivate');
      }
    },
  },
  watch: {
    active: {
      handler(newValue) {
        if (newValue) {
          this.$nextTick(() => {
            const input = this.getInputContainer();
            input.focus();
            input.scrollIntoView({ block: 'nearest', inline: 'end' });
            this.alignSuggestions(input);
          });
        }
      },
      immediate: true,
    },
    value: {
      handler(newValue) {
        const hasUnclosedQuote = newValue.split('"').length % 2 === 0;
        if (newValue.indexOf(' ') === -1 || hasUnclosedQuote) {
          return;
        }

        const [firstWord, ...otherWords] = splitOnQuotes(newValue).filter(
          (w, idx, arr) => Boolean(w) || idx === arr.length - 1
        );
        this.$emit('input', firstWord);

        if (otherWords.length) {
          this.$emit(
            'create',
            otherWords.map(w => ({
              type: TERM_TOKEN_TYPE,
              value: w,
            }))
          );
        }
      },
    },
  },
};
