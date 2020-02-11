import FormExample from './form.basic.example.vue';
import InlineFormExample from './form.inline.example.vue';
import EditFormExample from './form.edit.example.vue';
import NoValidateFormExample from './form.novalidate.example.vue';

export default [
  {
    name: 'Form',
    items: [
      {
        id: 'form-basic',
        name: 'default state',
        component: FormExample,
      },
      {
        id: 'form-inline',
        name: 'inline form',
        component: InlineFormExample,
      },
      {
        id: 'form-edit',
        name: 'Form with existing data',
        component: EditFormExample,
      },
      {
        id: 'form-novalidate',
        name: 'Form with HTML validation disabled',
        component: NoValidateFormExample,
      },
    ],
  },
];
