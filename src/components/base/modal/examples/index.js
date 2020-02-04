import ModalBasicExample from './modal.basic.example.vue';
import ModalDisabledExample from './modal.disabled.example.vue';
import ModalSizesExample from './modal.sizes.example.vue';

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
    name: 'Disabled',
    items: [
      {
        id: 'modal-disabled',
        name: 'Disabled',
        description: 'Disabled Modal',
        component: ModalDisabledExample,
      },
    ],
  },
  {
    name: 'Sizes',
    items: [
      {
        id: 'modal-sizes',
        name: 'Sizes',
        description: 'Modal Sizes',
        component: ModalSizesExample,
      },
    ],
  },
];
