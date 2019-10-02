import ToggleDefaultExample from './toggle.default.example.vue';
import ToggleDisabledExample from './toggle.disabled.example.vue';
import ToggleLoadingExample from './toggle.loading.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'toggle-default',
        name: 'Default',
        description: 'Default Toggle',
        component: ToggleDefaultExample,
      },
      {
        id: 'toggle-disabled',
        name: 'Disabled',
        description: 'Disabled Toggle',
        component: ToggleDisabledExample,
      },
      {
        id: 'toggle-loading',
        name: 'Loading',
        description: 'Loading Toggle',
        component: ToggleLoadingExample,
      },
    ],
  },
];
