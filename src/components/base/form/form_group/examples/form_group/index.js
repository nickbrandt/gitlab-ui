import FormGroupBasicExample from './form_group.basic.example.vue';
import FormGroupDisabledExample from './form_group.disabled.example.vue';
import FormGroupTextareaExample from './form_group.textarea.example.vue';
import FormGroupValidationExample from './form_group.validation.example.vue';

export default [
  {
    name: 'Form Group',
    items: [
      {
        id: 'form-group',
        name: 'basic example',
        component: FormGroupBasicExample,
      },
      {
        id: 'form-group-validations',
        name: 'with validations',
        component: FormGroupValidationExample,
      },
      {
        id: 'form-group-disabled',
        name: 'disabled',
        component: FormGroupDisabledExample,
      },
      {
        id: 'form-group-textarea',
        name: 'textarea',
        component: FormGroupTextareaExample,
      },
    ],
  },
];
