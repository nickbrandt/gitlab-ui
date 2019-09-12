import ModalBasicExample from './modal.basic.example.vue';
import ModalFocusedExample from './modal.focused.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'modal-basic',
        name: 'Basic',
        description: 'Basic Modal',
        component: ModalBasicExample,
      },
    ],
  },
  {
    name: 'Focused',
    items: [
      {
        id: 'modal-focused',
        name: 'Focused',
        description: 'Focused Modal',
        component: ModalFocusedExample,
      },
    ],
  },
];
