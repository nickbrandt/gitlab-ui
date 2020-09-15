/* Basic */
import ButtonBasicExample from './basic/button.basic.example.vue';
import ButtonDisabledExample from './basic/button.disabled.example.vue';
import ButtonLinkExample from './basic/button.link.example.vue';
import ButtonSelectedExample from './basic/button.selected.example.vue';

/* Categories */
import ButtonTertiaryExample from './categories/button.tertiary.example.vue';
import ButtonPrimaryExample from './categories/button.primary.example.vue';
import ButtonSecondaryExample from './categories/button.secondary.example.vue';

/* Variants */
import ButtonDangerExample from './variants/button.danger.example.vue';
import ButtonDashedExample from './variants/button.dashed.example.vue';
import ButtonInfoExample from './variants/button.info.example.vue';
import ButtonSuccessExample from './variants/button.success.example.vue';
import ButtonVariantsExample from './variants/button.variants.example.vue';
import ButtonWarningExample from './variants/button.warning.example.vue';

/* Combinations */
import ButtonEllipsisExample from './combinations/button.ellipsis.example.vue';
import ButtonEmojiExample from './combinations/button.emoji.example.vue';
import ButtonIconExample from './combinations/button.icon.example.vue';
import ButtonIconAndTextExample from './combinations/button.icon_and_text.example.vue';
import ButtonLabelExample from './combinations/button.label.example.vue';
import ButtonLoadingExample from './combinations/button.loading.example.vue';

/* Sizing */
import ButtonFullWidthExample from './sizing/button.full_width.example.vue';
import ButtonMediumExample from './sizing/button.medium.example.vue';
import ButtonSizesExample from './sizing/button.sizes.example.vue';
import ButtonSmallExample from './sizing/button.small.example.vue';

/* Dropdowns */
import ButtonDropdownExample from './dropdowns/button.dropdown.example.vue';
import ButtonDropdownSplitExample from './dropdowns/button.dropdown_split.example.vue';
import ButtonDropdownWithIconExample from './dropdowns/button.dropdown_with_icon.example.vue';
import ButtonDropdownWithIconAndTextExample from './dropdowns/button.dropdown_with_icon_and_text.example.vue';
import ButtonDropdownWithIconAndSplitExample from './dropdowns/button.dropdown_with_icon_and_split.example.vue';
import ButtonDropdownFullWidthExample from './dropdowns/button.dropdown_full_width.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'button-basic',
        name: 'Basic',
        description: 'Basic Button',
        component: ButtonBasicExample,
      },
      {
        id: 'button-selected',
        name: 'Selected',
        description: 'Selected button',
        component: ButtonSelectedExample,
      },
      {
        id: 'button-disabled',
        name: 'Disabled',
        description: 'Disabled button',
        component: ButtonDisabledExample,
      },
      {
        id: 'button-link',
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
        id: 'button-primary',
        name: 'Primary Category',
        description: 'Primary category button',
        component: ButtonPrimaryExample,
      },
      {
        id: 'button-secondary',
        name: 'Secondary Category',
        description: 'Secondary category button',
        component: ButtonSecondaryExample,
      },
      {
        id: 'button-tertiary',
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
        id: 'button-variants',
        name: 'All Button Variants',
        description: 'All different button variants',
        component: ButtonVariantsExample,
      },
      {
        id: 'button-info',
        name: 'Info Button Variant',
        description: 'Info button variant',
        component: ButtonInfoExample,
      },
      {
        id: 'button-success',
        name: 'Success Button Variant',
        description: 'Success button variant',
        component: ButtonSuccessExample,
      },
      {
        id: 'button-warning',
        name: 'Warning Button Variant',
        description: 'Warning button variant',
        component: ButtonWarningExample,
      },
      {
        id: 'button-danger',
        name: 'Danger Button Variant',
        description: 'Danger button variant',
        component: ButtonDangerExample,
      },
      {
        id: 'button-dashed',
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
        id: 'button-emoji',
        name: 'Emoji button',
        description: 'Button with an emoji and text inside',
        component: ButtonEmojiExample,
      },
      {
        id: 'button-icon',
        name: 'Icon button',
        description: 'Button with only an icon inside',
        component: ButtonIconExample,
      },
      {
        id: 'button-icon-and-text',
        name: 'Icon and text button',
        description: 'Button with an icon and text inside',
        component: ButtonIconAndTextExample,
      },
      {
        id: 'button-ellipsis',
        name: 'Ellipsis button',
        description: 'Button with an ellipsis inside',
        component: ButtonEllipsisExample,
      },
      {
        id: 'button-label',
        name: 'Label button',
        description: 'Button used as a label - normally in a button group',
        component: ButtonLabelExample,
      },
      {
        id: 'button-loading',
        name: 'Loading button',
        description: 'Button that is showing a loading spinner',
        component: ButtonLoadingExample,
      },
    ],
  },
  {
    name: 'Sizing',
    items: [
      {
        id: 'button-sizes',
        name: 'Button Sizes',
        description: 'All button sizes',
        component: ButtonSizesExample,
      },
      {
        id: 'button-medium',
        name: 'Medium Button Size',
        description: 'Medium button size',
        component: ButtonMediumExample,
      },
      {
        id: 'button-small',
        name: 'Small Button Size',
        description: 'Small button size',
        component: ButtonSmallExample,
      },
      {
        id: 'button-full-width',
        name: 'Full Width Button Size',
        description: 'Full width button size',
        component: ButtonFullWidthExample,
      },
    ],
  },
  {
    name: 'Dropdowns',
    items: [
      {
        id: 'new-dropdown',
        name: 'Default',
        description: 'Dropdown',
        component: ButtonDropdownExample,
      },
      {
        id: 'new-dropdown-split',
        name: 'Split',
        description: 'Split Dropdown',
        component: ButtonDropdownSplitExample,
      },
      {
        id: 'new-dropdown-with-icon',
        name: 'With Icon',
        description: 'Icon Dropdown',
        component: ButtonDropdownWithIconExample,
      },
      {
        id: 'new-dropdown-with-icon-and-text',
        name: 'With Icon and Text',
        description: 'Icon Dropdown with text',
        component: ButtonDropdownWithIconAndTextExample,
      },
      {
        id: 'new-dropdown-with-icon-and-split',
        name: 'With Icon and Split',
        description: 'Icon Dropdown with split',
        component: ButtonDropdownWithIconAndSplitExample,
      },
      {
        id: 'new-dropdown-full-width',
        name: 'Full Width',
        description: 'Full Width Dropdown',
        component: ButtonDropdownFullWidthExample,
      },
    ],
  },
];
