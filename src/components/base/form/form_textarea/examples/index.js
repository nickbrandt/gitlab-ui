import FormTextAreaBasic from './form_textarea.basic.example.vue';
import FormTextAreaInvalid from './form_textarea.invalid.example.vue';
import FormTextAreaPlaintext from './form_textarea.plaintext.example.vue';
import FormTextReadOnlytext from './form_textarea.readonly.example.vue';
import FormTextSubmitOnEnter from './form_textarea.submit.example.vue';

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
      {
        id: 'form-textarea-readonly',
        name: 'Read Only',
        description: 'Read Only Form Textarea',
        component: FormTextReadOnlytext,
      },
      {
        id: 'form-textarea-submit-on-enter',
        name: 'Submit On Enter',
        description: 'Submit On Enter Form Textarea',
        component: FormTextSubmitOnEnter,
      },
    ],
  },
];
