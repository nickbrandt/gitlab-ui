import ButtonBasicExample from './new_button.basic.example.vue';
import ButtonDisabledExample from './new_button.disabled.example.vue';
import ButtonSelectedExample from './new_button.selected.example.vue';
import ButtonLinkExample from './new_button.link.example.vue';
import ButtonVariantsExample from './new_button.variants.example.vue';
import ButtonSizesExample from './new_button.sizes.example.vue';

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
    name: 'Styling',
    items: [
      {
        id: 'new-button-variants',
        name: 'Variants',
        description: 'Different button variants',
        component: ButtonVariantsExample,
      },
      {
        id: 'new-button-sizes',
        name: 'Button Sizes',
        description: 'Different button sizes',
        component: ButtonSizesExample,
      },
    ],
  },
];
