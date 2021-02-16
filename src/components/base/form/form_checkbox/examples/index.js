import FormCheckboxChecked from './form_checkbox.checked.example.vue';
import FormCheckboxCheckedDisabled from './form_checkbox.checked_disabled.example.vue';
import FormCheckboxDisabled from './form_checkbox.disabled.example.vue';
import FormCheckboxHelp from './form_checkbox.help.example.vue';
import FormCheckboxIndeterminate from './form_checkbox.indeterminant.example.vue';
import FormCheckboxUnchecked from './form_checkbox.unchecked.example.vue';
import FormCheckboxValues from './form_checkbox.values.example.vue';
import FormCheckboxGroupOptionsArray from './form_checkbox_group.options_array.example.vue';
import FormCheckboxGroupSlots from './form_checkbox_group.slots.example.vue';

export default [
  {
    name: 'Checkbox',
    items: [
      {
        id: 'form-checkbox-checked',
        name: 'Checked Form Checkbox',
        component: FormCheckboxChecked,
      },
      {
        id: 'form-checkbox-unchecked',
        name: 'Unchecked Form Checkbox',
        component: FormCheckboxUnchecked,
      },
      {
        id: 'form-checkbox-disabled',
        name: 'Disabled Form Checkbox',
        component: FormCheckboxDisabled,
      },
      {
        id: 'form-checkbox-model',
        name: 'Checked and Disabled Form Checkbox',
        component: FormCheckboxCheckedDisabled,
      },
      {
        id: 'form-checkbox-values',
        name: 'Custom Values for Form Checkbox',
        component: FormCheckboxValues,
      },
      {
        id: 'form-checkbox-indeterminate',
        name: 'Indeterminate State of Form Checkbox',
        component: FormCheckboxIndeterminate,
      },
      {
        id: 'form-checkbox-help',
        name: 'Form Checkbox with Help Text',
        component: FormCheckboxHelp,
      },
    ],
  },
  {
    name: 'Checkbox Group',
    items: [
      {
        id: 'form-checkbox-group-slots',
        name: 'Form Checkbox Group using Slots',
        component: FormCheckboxGroupSlots,
      },
      {
        id: 'form-checkbox-group-options-array',
        name: 'Form Checkbox Group using Options Array',
        component: FormCheckboxGroupOptionsArray,
      },
    ],
  },
];
