import AlertBasicExample from './alert.basic.example.vue';
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
