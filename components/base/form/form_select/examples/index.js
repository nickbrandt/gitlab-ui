import FormSelectBasicExample from './form_select.basic.example.vue';
import FormSelectManualOptionsExample from './form_select.manual_options.example.vue';
import FormSelectMixedOptionsExample from './form_select.mixed_options.example.vue';
import FormSelectDisabledExample from './form_select.disabled.example.vue';

export default [
  {
    name: 'Form Select',
    items: [
      {
        id: 'form-select-options-array',
        name: 'Form select with options property',
        component: FormSelectBasicExample,
      },
      {
        id: 'form-select-manual-options',
        name: 'Form select with manual options',
        component: FormSelectManualOptionsExample,
      },
      {
        id: 'form-select-mixed-options',
        name: 'Form select with mixed options',
        component: FormSelectMixedOptionsExample,
      },
      {
        id: 'form-select-disabled',
        name: 'Form select disabled',
        component: FormSelectDisabledExample,
      },
    ],
  },
];
