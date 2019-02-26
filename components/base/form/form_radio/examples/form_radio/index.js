import FormRadioGroupBasicExample from './form_radio_group.basic.example.vue';
import FormRadioGroupButtonExample from './form_radio_group.button.example.vue';
import FormRadioGroupSubcomponents from './form_radio_group.subcomponents.example.vue';
import FormRadioGroupOptionsSubcomponents from './form_radio_group.options-and-subcomponents.example.vue';
import FormRadioGroupStackedExample from './form_radio_group.stacked.example.vue';

export default [
  {
    name: 'Basic',
    items: [
      {
        id: 'form-radio-group',
        name: 'Options',
        component: FormRadioGroupBasicExample,
      },
      {
        id: 'form-radio-group-subcomponents',
        name: 'Subcomponents',
        component: FormRadioGroupSubcomponents,
      },
      {
        id: 'form-radio-group-options-and-subcomponents',
        name: 'Options and subcomponents',
        component: FormRadioGroupOptionsSubcomponents,
      },
    ],
  },
  {
    name: 'Styling',
    items: [
      {
        id: 'form-radio-group-buttons',
        name: 'Buttons',
        component: FormRadioGroupButtonExample,
      },
      {
        id: 'form-radio-group-stacked',
        name: 'Stacked',
        component: FormRadioGroupStackedExample,
      },
    ],
  },
];
