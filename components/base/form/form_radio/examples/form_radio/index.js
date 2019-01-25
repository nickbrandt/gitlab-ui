import FormRadioBasicExample from './form_radio.basic.example.vue';
import FormRadioButtonExample from './form_radio.button.example.vue';
import FormRadioSubcomponents from './form_radio.subcomponents.example.vue';

export default [
  {
    name: 'Form Radio',
    items: [
      {
        id: 'form-radio',
        name: 'Form radio group with code',
        component: FormRadioBasicExample,
      },
      {
        id: 'form-radio-buttons',
        name: 'Form radio group with buttons',
        component: FormRadioButtonExample,
      },
      {
        id: 'form-radio-subcomponents',
        name: 'Form radio with subcomponents',
        component: FormRadioSubcomponents,
      },
    ],
  },
];
