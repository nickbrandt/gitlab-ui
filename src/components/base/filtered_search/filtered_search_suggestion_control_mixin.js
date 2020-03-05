import { TERM_TOKEN_TYPE } from './filtered_search_utils';

export default {
  inject: ['portalName', 'alignSuggestions'],
  methods: {
    hasValue() {
      return this.value.data.trim().length > 0;
    },

    shouldHandleSpacesInData() {
      return true;
    },

    getSuggestionsContainer() {
      throw new Error(
        'getSuggestionsContainer is not implemented. Please return ref to gl-filtered-search-suggestion-list here'
      );
    },

    getActiveInput() {
      throw new Error(
        'getInputContainer is not implemented. Please return ref to active element of token here'
      );
    },

    destroyToken() {
      this.$emit('destroy');
    },

    applySuggestion() {
      throw new Error('applySuggestion not implemented in this component');
    },

    focusActiveInput() {
      this.$nextTick(() => {
        const input = this.getActiveInput();
        if (!input) {
          return;
        }
        input.focus();
        input.scrollIntoView({ block: 'nearest', inline: 'end' });
        this.alignSuggestions(input);
      });
    },

    applyCurrentSuggestion() {
      const suggestions = this.getSuggestionsContainer();
      const suggestionValue = suggestions.getValue();
      if (suggestionValue !== undefined) {
        this.applySuggestion(suggestionValue);
        return true;
      }

      return false;
    },

    handleInput(evt) {
      const suggestions = this.getSuggestionsContainer();
      const handlers = {
        Enter: () => this.$emit('submit'),
      };

      const suggestionsHandlers = {
        Enter: () => {
          if (this.applyCurrentSuggestion()) {
            return;
          }

          this.$emit('submit');
        },
        ArrowDown: () => suggestions.nextItem(),
        Down: () => suggestions.nextItem(),
        ArrowUp: () => suggestions.prevItem(),
        Up: () => suggestions.prevItem(),
      };

      if (suggestions) {
        Object.assign(handlers, suggestionsHandlers);
      }

      const { key } = evt;

      if (Object.keys(handlers).includes(key.toString())) {
        evt.preventDefault();
        handlers[key]();
        return true;
      }

      if (key === 'Backspace') {
        if (!this.hasValue()) {
          evt.preventDefault();
          this.destroyToken();
        }

        return true;
      }

      return false;
    },

    deactivate($evt) {
      const suggestions = this.getSuggestionsContainer();

      if (this.active && (!suggestions || !suggestions.$el.contains($evt.relatedTarget))) {
        this.$nextTick(() => {
          if (this.getActiveInput() === $evt.target) {
            this.$emit('deactivate');
          }
        });
      }
    },
  },
  watch: {
    value: {
      deep: true,
      handler(v) {
        this.$emit('input', v);
      },
    },
    active: {
      handler(newValue) {
        if (newValue) {
          this.focusActiveInput();
        }
      },
      immediate: true,
    },
    'value.data': {
      handler(newValue) {
        if (!this.shouldHandleSpacesInData()) {
          return;
        }

        const hasUnclosedQuote = newValue.split('"').length % 2 === 0;
        if (newValue.indexOf(' ') === -1 || hasUnclosedQuote) {
          return;
        }

        const [firstWord, ...otherWords] = splitOnQuotes(newValue).filter(
          (w, idx, arr) => Boolean(w) || idx === arr.length - 1
        );
        this.$emit('input', { ...this.value, data: firstWord });

        if (otherWords.length) {
          this.$emit(
            'create',
            otherWords.map(w => ({
              type: TERM_TOKEN_TYPE,
              value: { data: w },
            }))
          );
        }
      },
    },
  },
};
