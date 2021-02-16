import ToastActionExample from './toast.action.example.vue';
import ToastDefaultExample from './toast.default.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'toast-default',
        name: 'Default',
        description: 'Default Toast',
        component: ToastDefaultExample,
      },
      {
        id: 'toast-action',
        name: 'Action',
        description: 'Toast with an Action',
        component: ToastActionExample,
      },
    ],
  },
];
