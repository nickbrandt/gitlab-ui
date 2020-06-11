import AlertDefaultExample from './alert.default.example.vue';
import AlertActionsExample from './alert.actions.example.vue';
import AlertCustomActionsExample from './alert.custom_actions.example.vue';
import AlertTextLinksExample from './alert.text_links.example.vue';
import AlertTitleExample from './alert.title.example.vue';
import AlertNonDismissibleExample from './alert.non_dismissible.example.vue';
import AlertVariantsExample from './alert.variants.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'alert-default',
        name: 'Default',
        description: 'Default alert',
        component: AlertDefaultExample,
      },
      {
        id: 'alert-actions',
        name: 'Actions',
        description: 'Alert with action buttons',
        component: AlertActionsExample,
      },
      {
        id: 'alert-custom-actions',
        name: 'Custom Actions',
        description: 'Alert with custom actions',
        component: AlertCustomActionsExample,
      },
      {
        id: 'alert-text-links',
        name: 'Text links',
        description: 'Alert with text links',
        component: AlertTextLinksExample,
      },
      {
        id: 'alert-title',
        name: 'Title',
        description: 'Alert with a title',
        component: AlertTitleExample,
      },
      {
        id: 'alert-non-dismissible',
        name: 'Non-dismissible',
        description: 'Alert which is not dismissible',
        component: AlertNonDismissibleExample,
      },
    ],
  },
  {
    name: 'Styling',
    items: [
      {
        id: 'alert-variants',
        name: 'Variants',
        description: 'All alert variants',
        component: AlertVariantsExample,
      },
    ],
  },
];
