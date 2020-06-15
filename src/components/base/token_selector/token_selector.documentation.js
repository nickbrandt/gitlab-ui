import * as description from './token_selector.md';
import examples from './examples';

export default {
  description,
  examples,
  propsInfo: {
    dropdownItems: {
      additionalInfo: 'Items to display in dropdown',
    },
    selectedTokens: {
      additionalInfo:
        'Tokens that are selected. This prop will automatically be added when using `v-model`',
    },
    allowUserDefinedTokens: {
      additionalInfo: 'Should users be allowed to add tokens that are not in `dropdown-items`',
    },
    loading: {
      additionalInfo: 'Dropdown items are loading, can be used when requesting new dropdown items',
    },
    hideDropdownWithNoItems: {
      additionalInfo:
        'Hide the dropdown if `dropdown-items` is empty. Will show `no-results-content` slot if this is `false`',
    },
    containerClass: {
      additionalInfo:
        'CSS classes to add to the main token selector container (`.gl-token-selector`)',
    },
  },
  slots: [
    {
      name: 'no-results-content',
      description:
        'Content to display when `dropdown-items` is empty and `allow-user-defined-tokens` is `false`',
      default: 'No matches found',
      scopedProps: '',
    },
    {
      name: 'user-defined-token-content',
      description: 'Content to display when adding a user defined token',
      default: 'Add "{{ inputText }}"',
      scopedProps: 'inputText (String)',
    },
    {
      name: 'token-content',
      description:
        'Content to pass to the token component slot. Can be used to add an avatar to the token',
      default: '{{ token.name }}',
      scopedProps: 'token (Object)',
    },
    {
      name: 'dropdown-item-content',
      description: 'Dropdown item content',
      default: '{{ dropdownItem.name }}',
      scopedProps: 'dropdownItem (Object)',
    },
    {
      name: 'loading-content',
      description: 'Content to display when `loading` prop is `true`',
      default: 'Searching...',
      scopedProps: '',
    },
  ],
  events: [
    {
      event: 'text-input',
      args: [
        {
          arg: 'inputText',
          description: '(String)',
        },
      ],
      description: 'Fired when user types in the token selector',
    },
    {
      event: 'input',
      args: [
        {
          arg: 'selectedTokens',
          description: '(Array)',
        },
      ],
      description: 'Fired when a token is added or removed',
    },
    {
      event: 'focus',
      args: [
        {
          arg: 'event',
          description: '(FocusEvent)',
        },
      ],
      description: 'Fired when the token selector is focused',
    },
    {
      event: 'blur',
      args: [
        {
          arg: 'event',
          description: '(FocusEvent)',
        },
      ],
      description: 'Fired when the token selector is blurred',
    },
    {
      event: 'token-add',
      args: [
        {
          arg: 'token',
          description: '(Object)',
        },
      ],
      description: 'Fired when a token is added',
    },
    {
      event: 'token-remove',
      args: [
        {
          arg: 'token',
          description: '(Object)',
        },
      ],
      description: 'Fired when a token is removed',
    },
  ],
};
