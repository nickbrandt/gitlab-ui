import FormRadioGroupOptionsArray from './form_radio_group.options_array.example.vue';
import FormRadioGroupSlots from './form_radio_group.slots.example.vue';

export default [
  {
    name: 'Radio Group',
    items: [
      {
        id: 'form-radio-group-slots',
        name: 'Form Radio Group using Slots',
        component: FormRadioGroupSlots,
      },
      {
        id: 'form-radio-group-options-array',
        name: 'Form Radio Group using Options Array',
        component: FormRadioGroupOptionsArray,
      },
    ],
  },
];
