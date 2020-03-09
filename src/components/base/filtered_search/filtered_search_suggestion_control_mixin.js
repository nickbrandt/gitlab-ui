import KeyCodes from 'bootstrap-vue/src/utils/key-codes';
import { splitOnQuotes } from './filtered_search_utils';

export default {
  inject: ['portalName', 'alignSuggestions'],
  methods: {
    hasValue() {
      return this.value.data.trim().length > 0;
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
    'value.data': {
      handler(newValue) {
        if (typeof newValue !== 'string') {
          return;
        }

        const hasUnclosedQuote = newValue.split('"').length % 2 === 0;
        if (newValue.indexOf(' ') === -1 || hasUnclosedQuote) {
          return;
        }

        const [firstWord, ...otherWords] = splitOnQuotes(newValue).filter(
          (w, idx, arr) => Boolean(w) || idx === arr.length - 1
        );
        this.$emit('input', { data: firstWord });

        if (otherWords.length) {
          this.$emit('split', otherWords);
        }
      },
    },
  },
};
