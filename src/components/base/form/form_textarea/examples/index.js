import FormTextAreaBasic from './form_textarea.basic.example.vue';
import FormTextAreaInvalid from './form_textarea.invalid.example.vue';
import FormTextAreaPlaintext from './form_textarea.plaintext.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'form-textarea-basic',
        name: 'Basic',
        description: 'Basic Form Textarea',
        component: FormTextAreaBasic,
      },
      {
        id: 'form-textarea-invalid',
        name: 'Invalid',
        description: 'Invalid Form Textarea',
        component: FormTextAreaInvalid,
      },
      {
        id: 'form-textarea-plaintext',
        name: 'Plaintext',
        description: 'Plaintext Form Textarea',
        component: FormTextAreaPlaintext,
      },
    ],
  },
];
