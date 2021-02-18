import ButtonGroupBasicExample from './button_group.basic.example.vue';
import ButtonGroupBasicDropdown from './button_group.dropdown.example.vue';
import ButtonGroupSizesExample from './button_group.sizes.example.vue';
import ButtonGroupVariantsExample from './button_group.variants.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'button-group-basic',
        name: 'Basic',
        description: 'Basic Group Button',
        component: ButtonGroupBasicExample,
      },
      {
        id: 'button-group-with-dropdown',
        name: 'Basic with Dropdown',
        description: 'Basic Group Button with Dropdowns',
        component: ButtonGroupBasicDropdown,
      },
    ],
  },
  {
    name: 'Styling',
    items: [
      {
        id: 'button-group-variants',
        name: 'Variants',
        description: 'Different button variants',
        component: ButtonGroupVariantsExample,
      },
      {
        id: 'button-group-sizes',
        name: 'Button Sizes',
        description: 'Button group sizes can be handled on the group',
        component: ButtonGroupSizesExample,
      },
    ],
  },
];
