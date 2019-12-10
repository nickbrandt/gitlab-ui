/* Basic */
import ButtonBasicExample from './basic/new_button.basic.example.vue';
import ButtonDisabledExample from './basic/new_button.disabled.example.vue';
import ButtonLinkExample from './basic/new_button.link.example.vue';
import ButtonSelectedExample from './basic/new_button.selected.example.vue';

/* Categories */
import ButtonTertiaryExample from './categories/new_button.tertiary.example.vue';
import ButtonPrimaryExample from './categories/new_button.primary.example.vue';
import ButtonSecondaryExample from './categories/new_button.secondary.example.vue';

/* Variants */
import ButtonDangerExample from './variants/new_button.danger.example.vue';
import ButtonDashedExample from './variants/new_button.dashed.example.vue';
import ButtonInfoExample from './variants/new_button.info.example.vue';
import ButtonSuccessExample from './variants/new_button.success.example.vue';
import ButtonVariantsExample from './variants/new_button.variants.example.vue';
import ButtonWarningExample from './variants/new_button.warning.example.vue';

/* Combinations */
import ButtonEllipsisExample from './combinations/new_button.ellipsis.example.vue';
import ButtonEmojiExample from './combinations/new_button.emoji.example.vue';
import ButtonIconExample from './combinations/new_button.icon.example.vue';
import ButtonIconAndTextExample from './combinations/new_button.icon_and_text.example.vue';
import ButtonLabelExample from './combinations/new_button.label.example.vue';

/* Sizing */
import ButtonFullWidthExample from './sizing/new_button.full_width.example.vue';
import ButtonMediumExample from './sizing/new_button.medium.example.vue';
import ButtonSizesExample from './sizing/new_button.sizes.example.vue';
import ButtonSmallExample from './sizing/new_button.small.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'new-button-basic',
        name: 'Basic',
        description: 'Basic Button',
        component: ButtonBasicExample,
      },
      {
        id: 'new-button-selected',
        name: 'Selected',
        description: 'Selected button',
        component: ButtonSelectedExample,
      },
      {
        id: 'new-button-disabled',
        name: 'Disabled',
        description: 'Disabled button',
        component: ButtonDisabledExample,
      },
      {
        id: 'new-button-link',
        name: 'Button Link',
        description: 'Button with a link',
        component: ButtonLinkExample,
      },
    ],
  },
  {
    name: 'Categories',
    items: [
      {
        id: 'new-button-primary',
        name: 'Primary Category',
        description: 'Primary category button',
        component: ButtonPrimaryExample,
      },
      {
        id: 'new-button-secondary',
        name: 'Secondary Category',
        description: 'Secondary category button',
        component: ButtonSecondaryExample,
      },
      {
        id: 'new-button-tertiary',
        name: 'Tertiary Category',
        description: 'Tertiary category button',
        component: ButtonTertiaryExample,
      },
    ],
  },
  {
    name: 'Variants',
    items: [
      {
        id: 'new-button-variants',
        name: 'All Button Variants',
        description: 'All different button variants',
        component: ButtonVariantsExample,
      },
      {
        id: 'new-button-info',
        name: 'Info Button Variant',
        description: 'Info button variant',
        component: ButtonInfoExample,
      },
      {
        id: 'new-button-success',
        name: 'Success Button Variant',
        description: 'Success button variant',
        component: ButtonSuccessExample,
      },
      {
        id: 'new-button-warning',
        name: 'Warning Button Variant',
        description: 'Warning button variant',
        component: ButtonWarningExample,
      },
      {
        id: 'new-button-danger',
        name: 'Danger Button Variant',
        description: 'Danger button variant',
        component: ButtonDangerExample,
      },
      {
        id: 'new-button-dashed',
        name: 'Dashed Button Variant',
        description: 'Dashed button variant',
        component: ButtonDashedExample,
      },
    ],
  },
  {
    name: 'Combinations',
    items: [
      {
        id: 'new-button-emoji',
        name: 'Emoji button',
        description: 'Button with an emoji and text inside',
        component: ButtonEmojiExample,
      },
      {
        id: 'new-button-icon',
        name: 'Icon button',
        description: 'Button with only an icon inside',
        component: ButtonIconExample,
      },
      {
        id: 'new-button-icon-and-text',
        name: 'Icon and text button',
        description: 'Button with an icon and text inside',
        component: ButtonIconAndTextExample,
      },
      {
        id: 'new-button-ellipsis',
        name: 'Ellipsis button',
        description: 'Button with an ellipsis inside',
        component: ButtonEllipsisExample,
      },
      {
        id: 'new-button-label',
        name: 'Label button',
        description: 'Button used as a label - normally in a button group',
        component: ButtonLabelExample,
      },
    ],
  },
  {
    name: 'Sizing',
    items: [
      {
        id: 'new-button-sizes',
        name: 'Button Sizes',
        description: 'All button sizes',
        component: ButtonSizesExample,
      },
      {
        id: 'new-button-medium',
        name: 'Medium Button Size',
        description: 'Medium button size',
        component: ButtonMediumExample,
      },
      {
        id: 'new-button-small',
        name: 'Small Button Size',
        description: 'Small button size',
        component: ButtonSmallExample,
      },
      {
        id: 'new-button-full-width',
        name: 'Full Width Button Size',
        description: 'Full width button size',
        component: ButtonFullWidthExample,
      },
    ],
  },
];
