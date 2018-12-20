import AlertBasicExample from './alert.basic.example.vue';
import AlertVariantsExample from './alert.variants.example.vue';
import AlertDismissableExample from './alert.dismissible.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'alert-basic',
        name: 'Basic',
        description: 'Basic Alert',
        component: AlertBasicExample,
      },
      {
        id: 'alert-variants',
        name: 'Alert with variants',
        description: 'Alerts and their variants',
        component: AlertVariantsExample,
      },
    ],
  },
  {
    name: 'Dismissable',
    items: [
      {
        id: 'alert-dismissable',
        name: 'Dismissable',
        description: 'Dismissable Alert',
        component: AlertDismissableExample,
      },
    ],
  },
];
