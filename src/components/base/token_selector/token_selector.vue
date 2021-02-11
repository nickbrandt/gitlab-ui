<script>
import { uniqueId } from 'lodash';

import GlTokenContainer from './token_container.vue';
import GlTokenSelectorDropdown from './token_selector_dropdown.vue';
import { tokensValidator } from './helpers';

export default {
  name: 'GlTokenSelector',
  componentId: uniqueId('token-selector'),
  components: { GlTokenContainer, GlTokenSelectorDropdown },
  model: {
    prop: 'selectedTokens',
    event: 'input',
  },
  props: {
    dropdownItems: {
      type: Array,
      // All items need to have an `id` key
      validator: tokensValidator,
      required: false,
      default: () => [],
    },
    allowUserDefinedTokens: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    hideDropdownWithNoItems: {
      type: Boolean,
      required: false,
      default: false,
    },
    containerClass: {
      type: String,
      required: false,
      default: '',
    },
    menuClass: {
      type: [String, Array, Object],
      required: false,
      default: '',
    },
    autocomplete: {
      type: String,
      required: false,
      default: 'off',
    },
    ariaLabelledby: {
      type: String,
      required: false,
      default: null,
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    textInputAttrs: {
      type: Object,
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    // Used for custom `v-model`
    selectedTokens: {
      type: Array,
      // All tokens need to have an `id` key
      validator: tokensValidator,
      required: true,
    },
  },
  data() {
    return {
      inputText: '',
      inputFocused: false,
      dropdownIsOpen: false,
      focusedDropdownItem: null,
      triggerTokenFocusNextBackspace: true,
      rootElClasses: '',
      dropdownEventHandlers: {
        handleUpArrow: () => {},
        handleDownArrow: () => {},
        handleHomeKey: () => {},
        handleEndKey: () => {},
      },
      resetFocusedDropdownItem: () => {},
      focusOnToken: () => {},
    };
  },
  computed: {
    filteredDropdownItems() {
      return this.dropdownItems.filter(
        (dropdownItem) =>
          this.selectedTokens.findIndex((token) => token.id === dropdownItem.id) === -1
      );
    },
    dropdownHasNoItems() {
      return !this.filteredDropdownItems.length;
    },
    userDefinedTokenCanBeAdded() {
      return this.allowUserDefinedTokens && this.dropdownHasNoItems && this.inputText !== '';
    },
    hideDropdown() {
      if (this.userDefinedTokenCanBeAdded) {
        return false;
      }

      if (this.hideDropdownWithNoItems && this.dropdownHasNoItems) {
        return true;
      }

      return false;
    },
    disabledClasses() {
      return this.disabled ? ['disabled'] : ['gl-inset-border-1-gray-400!', 'gl-cursor-text!'];
    },
  },
  watch: {
    inputText(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit('text-input', newValue);

        this.resetFocusedDropdownItem();

        if (newValue !== '') {
          this.triggerTokenFocusNextBackspace = false;
        } else {
          this.triggerTokenFocusNextBackspace = true;
        }

        // Wait a tick so `text-input` event can be used to validate
        // the value and change the `allowUserDefinedTokens` and/or
        // `hideDropdownWithNoItems` props
        this.$nextTick(() => {
          if (this.hideDropdown) {
            this.closeDropdown();
          } else if (newValue !== '') {
            this.openDropdown();
          }
        });
      }
    },
  },
  methods: {
    handleFocus(event) {
      this.$emit('focus', event);

      this.openDropdown();
      this.inputFocused = true;
      this.focusOnToken();

      if (this.inputText === '') {
        this.triggerTokenFocusNextBackspace = true;
      }
    },
    handleBlur(event) {
      this.$emit('blur', event);

      this.inputFocused = false;

      // `event.relatedTarget` returns `null` on Safari because buttons are not focused on click (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus)
      // Workaround is to:
      // 1. Explicitly focus the dropdown menu item button on `mousedown` event. (see './token_selector_dropdown.vue')
      // 2. Use `nextTick` so `blur` event is fired after the `mousedown` event
      this.$nextTick(() => {
        if (!event.relatedTarget?.closest?.('.dropdown-item')) {
          this.closeDropdown();
        }
      });
    },
    handleEnter() {
      if (this.userDefinedTokenCanBeAdded) {
        this.addToken();
      } else if (this.focusedDropdownItem && this.dropdownIsOpen) {
        this.addToken(this.focusedDropdownItem);
      }
    },
    handleEscape() {
      this.inputText = '';
      this.closeDropdown();
    },
    handleBackspace(event) {
      if (this.inputText !== '' || !this.selectedTokens.length) {
        return;
      }

      // Prevent triggering the browser back button
      event.preventDefault();

      if (this.triggerTokenFocusNextBackspace) {
        this.$refs.textInput.blur();
        this.focusOnToken(this.selectedTokens.length - 1);
      } else {
        this.triggerTokenFocusNextBackspace = true;
      }
    },
    handleInputClick() {
      // Open the dropdown if the user clicks an already focused input
      if (this.inputFocused && this.inputText === '' && !this.dropdownIsOpen) {
        this.openDropdown();
      }
    },
    handleContainerClick(event) {
      // Bail if token is clicked
      const { target } = event;
      if (target?.closest('.gl-token') !== null || this.inputFocused) {
        return;
      }

      this.focusTextInput();
    },
    addToken(dropdownItem = null) {
      const token =
        dropdownItem !== null
          ? dropdownItem
          : {
              id: uniqueId('user-defined-token'),
              name: this.inputText,
            };

      this.$emit('input', [...this.selectedTokens, token]);

      this.inputText = '';
      this.closeDropdown();

      this.$emit('token-add', token);
    },
    removeToken(token) {
      this.$emit(
        'input',
        this.selectedTokens.filter((selectedToken) => selectedToken.id !== token.id)
      );
      this.$emit('token-remove', token);
    },
    cancelTokenFocus() {
      this.focusTextInput();
    },
    closeDropdown() {
      this.dropdownIsOpen = false;
      this.resetFocusedDropdownItem();
    },
    openDropdown() {
      if (this.hideDropdown) {
        return;
      }

      this.dropdownIsOpen = true;
    },
    focusTextInput() {
      this.$refs.textInput.focus();
    },

    // Register methods passed as props from child components
    registerDropdownEventHandlers(dropdownEventHandlers) {
      this.dropdownEventHandlers = dropdownEventHandlers;
    },
    registerResetFocusedDropdownItem(resetFocusedDropdownItem) {
      this.resetFocusedDropdownItem = resetFocusedDropdownItem;
    },
    registerFocusOnToken(focusOnToken) {
      this.focusOnToken = focusOnToken;
    },
  },
};
</script>

<template>
  <div>
    <div
      ref="container"
      class="gl-token-selector gl-form-input form-control gl-py-2! gl-px-3!"
      :class="[{ 'gl-token-selector-focus-glow': inputFocused }, disabledClasses, containerClass]"
      :aria-disabled="disabled"
      @click="handleContainerClick"
    >
      <gl-token-container
        :tokens="selectedTokens"
        :register-focus-on-token="registerFocusOnToken"
        :disabled="disabled"
        @token-remove="removeToken"
        @cancel-focus="cancelTokenFocus"
      >
        <template #token-content="{ token }">
          <slot name="token-content" :token="token"></slot>
        </template>
        <template #text-input>
          <!-- Can't use `v-model` due to this bug: -->
          <!-- https://stackoverflow.com/questions/49929703/vue-js-watched-input-not-fired-on-every-keypress -->
          <input
            ref="textInput"
            type="text"
            class="gl-token-selector-input gl-bg-none gl-font-regular gl-font-base gl-line-height-normal gl-px-1 gl-h-auto gl-text-gray-900 gl-border-none gl-outline-none gl-flex-grow-1"
            :class="{ 'gl-cursor-not-allowed': disabled }"
            :value="inputText"
            :autocomplete="autocomplete"
            :aria-labelledby="ariaLabelledby"
            :placeholder="placeholder"
            :disabled="disabled"
            v-bind="textInputAttrs"
            @input="inputText = $event.target.value"
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown.enter="handleEnter"
            @keydown.esc="handleEscape"
            @keydown.delete="handleBackspace"
            @keydown.up.prevent="dropdownEventHandlers.handleUpArrow"
            @keydown.down.prevent="dropdownEventHandlers.handleDownArrow"
            @keydown.home="dropdownEventHandlers.handleHomeKey"
            @keydown.end="dropdownEventHandlers.handleEndKey"
            @keydown.stop="$emit('keydown', $event)"
            @click="handleInputClick"
          />
        </template>
      </gl-token-container>
    </div>
    <gl-token-selector-dropdown
      v-model="focusedDropdownItem"
      :menu-class="menuClass"
      :show="dropdownIsOpen"
      :loading="loading"
      :dropdown-items="filteredDropdownItems"
      :selected-tokens="selectedTokens"
      :input-text="inputText"
      :allow-user-defined-tokens="allowUserDefinedTokens"
      :component-id="$options.componentId"
      :register-dropdown-event-handlers="registerDropdownEventHandlers"
      :register-reset-focused-dropdown-item="registerResetFocusedDropdownItem"
      @dropdown-item-click="addToken"
      @show="openDropdown"
    >
      <template #loading-content>
        <slot name="loading-content"></slot>
      </template>
      <template #user-defined-token-content>
        <slot name="user-defined-token-content" :input-text="inputText"></slot>
      </template>
      <template #no-results-content>
        <slot name="no-results-content"></slot>
      </template>
      <template #dropdown-item-content="{ dropdownItem }">
        <slot name="dropdown-item-content" :dropdown-item="dropdownItem"></slot>
      </template>
      <template #dropdown-footer>
        <slot name="dropdown-footer"></slot>
      </template>
    </gl-token-selector-dropdown>
  </div>
</template>
