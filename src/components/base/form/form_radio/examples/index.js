import FormRadioBasic from './form_radio.basic.example.vue';
import FormRadioCheckedDisabled from './form_radio.checked_disabled.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'form-radio-basic',
        name: 'Basic',
        description: 'Basic GlFormRadio',
        component: FormRadioBasic,
      },
      {
        id: 'form-radio-checked-disabled',
        name: 'Checked and disabled radio',
        description: 'Checked and disabled GlFormRadio',
        component: FormRadioCheckedDisabled,
      },
    ],
  },
];
