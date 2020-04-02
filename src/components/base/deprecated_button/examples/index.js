import DeprecatedButtonBasicExample from './deprecated_button.basic.example.vue';
import DeprecatedButtonLinkExample from './deprecated_button.link.example.vue';
import DeprecatedButtonVariantsExample from './deprecated_button.variants.example.vue';
import DeprecatedButtonSizesExample from './deprecated_button.sizes.example.vue';
import DeprecatedButtonDisabledExample from './deprecated_button.disabled.example.vue';
import DeprecatedButtonLoadingExample from './deprecated_button.loading.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'deprecated-button-basic',
        name: 'Basic',
        description: 'Basic Button',
        component: DeprecatedButtonBasicExample,
      },
      {
        id: 'deprecated-button-link',
        name: 'Button Link',
        description: 'Button with a link',
        component: DeprecatedButtonLinkExample,
      },
    ],
  },
  {
    name: 'Styling',
    items: [
      {
        id: 'deprecated-button-variants',
        name: 'Button Variants',
        description: 'Different button variants',
        component: DeprecatedButtonVariantsExample,
      },
      {
        id: 'deprecated-button-sizes',
        name: 'Button Sizes',
        description: 'Different button sizes',
        component: DeprecatedButtonSizesExample,
      },
      {
        id: 'deprecated-button-disabled',
        name: 'Button Disabled',
        description: 'Button that is disabled',
        component: DeprecatedButtonDisabledExample,
      },
      {
        id: 'deprecated-button-loading',
        name: 'Button Loading',
        description: 'Button that is loading',
        component: DeprecatedButtonLoadingExample,
      },
    ],
  },
];
