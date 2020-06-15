<script>
import { keyboard } from '../../../utils/constants';
import GlToken from '../token/token.vue';
import { tokensValidator } from './helpers';

const TOKEN_ID_PREFIX = 'token-selector-token-';

export default {
  name: 'GlTokenContainer',
  tokenIdPrefix: TOKEN_ID_PREFIX,
  components: { GlToken },
  props: {
    tokens: {
      type: Array,
      // All tokens need to have an `id` key
      validator: tokensValidator,
      required: true,
    },
    registerFocusOnToken: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      eventListenersAdded: false,
      focusedTokenIndex: null,
    };
  },
  computed: {
    focusedToken() {
      return this.tokens[this.focusedTokenIndex] || null;
    },
  },
  watch: {
    focusedTokenIndex(newValue) {
      if (newValue !== null) {
        if (!this.eventListenersAdded) {
          document.addEventListener('keydown', this.handleKeydown);
          document.addEventListener('click', this.handleClickOutside);

          this.eventListenersAdded = true;
        }
      } else {
        this.removeEventListeners();
      }
    },
    tokens(newValue) {
      // If all tokens have been removed and there is still a registered event listener
      if (!newValue.length && this.eventListenersAdded) {
        this.removeEventListeners();
      }
    },
  },
  created() {
    this.registerFocusOnToken(this.focusOnToken);
  },
  beforeDestroy() {
    this.removeEventListeners();
  },
  methods: {
    handleClose(token) {
      this.$emit('token-remove', token);
      this.focusedTokenIndex = null;
    },
    handleKeydown(event) {
      event.preventDefault();

      switch (event.key) {
        case keyboard.escape:
          this.focusedTokenIndex = null;
          this.$emit('cancel-focus');

          break;
        case keyboard.backspace:
        case keyboard.delete:
          this.$emit('token-remove', this.focusedToken);

          if (this.focusedTokenIndex > 0) {
            this.focusPrevToken();
          }

          break;
        case keyboard.left: // IE/Edge specific value
        case keyboard.arrowLeft:
          if (this.focusedTokenIndex === 0) {
            this.focusLastToken();
          } else {
            this.focusPrevToken();
          }

          break;
        case keyboard.right: // IE/Edge specific value
        case keyboard.arrowRight:
          if (this.focusedTokenIndex === this.tokens.length - 1) {
            this.focusFirstToken();
          } else {
            this.focusNextToken();
          }

          break;
        case keyboard.home:
          this.focusFirstToken();

          break;
        case keyboard.end:
          this.focusLastToken();

          break;
        default:
          break;
      }
    },
    handleClickOutside(event) {
      if (!this.$refs.tokenContainer?.contains(event.target)) {
        this.focusedTokenIndex = null;
      }
    },
    removeEventListeners() {
      document.removeEventListener('keydown', this.handleKeydown);
      document.removeEventListener('click', this.handleClickOutside);

      this.eventListenersAdded = false;
    },
    focusLastToken() {
      this.focusedTokenIndex = this.tokens.length - 1;
    },
    focusFirstToken() {
      this.focusedTokenIndex = 0;
    },
    focusNextToken() {
      this.focusedTokenIndex += 1;
    },
    focusPrevToken() {
      this.focusedTokenIndex -= 1;
    },
    focusOnToken(tokenIndex = null) {
      this.focusedTokenIndex = tokenIndex;
    },
    tokenIsFocused(token) {
      if (!this.focusedToken) {
        return false;
      }

      return token.id === this.focusedToken.id;
    },
  },
};
</script>

<template>
  <div
    ref="tokenContainer"
    class="gl-display-flex gl-flex-wrap gl-align-items-center gl-my-n1 gl-mx-n1"
    role="listbox"
    aria-multiselectable="false"
    aria-orientation="horizontal"
    :aria-activedescendant="focusedToken ? $options.tokenIdPrefix + focusedToken.id : null"
  >
    <div
      v-for="token in tokens"
      :id="$options.tokenIdPrefix + token.id"
      :key="token.id"
      class="gl-px-1 gl-py-1"
      role="option"
    >
      <gl-token
        class="gl-cursor-default"
        :class="{ focused: tokenIsFocused(token) }"
        @close="handleClose(token)"
      >
        <slot name="token-content" :token="token">
          {{ token.name }}
        </slot>
      </gl-token>
    </div>
    <div class="gl-px-1 gl-py-1 gl-flex-grow-1">
      <slot name="text-input"></slot>
    </div>
  </div>
</template>
