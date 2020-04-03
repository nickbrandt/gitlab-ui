import { withKnobs, date, number, boolean } from '@storybook/addon-knobs/dist/deprecated';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './daterange_picker.md';
import GlDaterangePicker from './daterange_picker.vue';

const currentYear = new Date().getFullYear();

const defaultStartDate = new Date(currentYear, 7, 27);
const defaultEndDate = new Date(currentYear, 7, 28);
const defaultMinDate = new Date(currentYear, 0, 1);
const defaultMaxDate = new Date(currentYear, 11, 31);

function dateTypeKnob(name, defaultValue) {
  return new Date(date(name, defaultValue));
}

function generateProps() {
  return {
    defaultMinDate: {
      type: Date,
      default: dateTypeKnob('defaultMinDate', defaultMinDate),
    },
    defaultMaxDate: {
      type: Date,
      default: dateTypeKnob('defaultMaxDate', defaultMaxDate),
    },
    defaultStartDate: {
      type: Date,
      default: dateTypeKnob('startDate', defaultStartDate),
    },
    defaultEndDate: {
      type: Date,
      default: dateTypeKnob('endDate', defaultEndDate),
    },
    maxDateRange: {
      type: Number,
      default: number('maxDateRange', 0),
    },
    sameDaySelection: {
      type: Boolean,
      default: boolean('sameDaySelection', false),
    },
  };
}

documentedStoriesOf('base|daterange-picker', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components: {
      GlDaterangePicker,
    },
    data() {
      return {
        value: {
          startDate: defaultStartDate,
          endDate: defaultEndDate,
        },
      };
    },
    template: `
      <gl-daterange-picker class="d-flex" :default-min-date="defaultMinDate" :default-max-date="defaultMaxDate" :default-start-date="defaultStartDate" :default-end-date="defaultEndDate" :max-date-range="maxDateRange" :same-day-selection="sameDaySelection" v-model="value"/>
    `,
  }));
