import DatepickerBasicExample from './datepicker.basic.example.vue';
import DatepickerCustomInputExample from './datepicker.custom_input.example.vue';
import DatepickerOpenOnFocusExample from './datepicker.open_on_focus.example.vue';
import DatepickerWithClearButtonExample from './datepicker.with_clear_button.example.vue';
import DatepickerDisabledExample from './datepicker.disabled.example.vue';

export default [
  {
    name: 'Datepicker',
    items: [
      {
        id: 'basic-date-picker',
        name: 'Basic date picker',
        component: DatepickerBasicExample,
      },
      {
        id: 'custom-input-date-picker',
        name: 'With custom input',
        component: DatepickerCustomInputExample,
      },
      {
        id: 'open-on-focus-date-picker',
        name: 'Open on focus',
        component: DatepickerOpenOnFocusExample,
      },
      {
        id: 'with-clear-button-date-picker',
        name: 'With clear button',
        component: DatepickerWithClearButtonExample,
      },
      {
        id: 'disabled-date-picker',
        name: 'Disabled',
        component: DatepickerDisabledExample,
      },
    ],
  },
];
