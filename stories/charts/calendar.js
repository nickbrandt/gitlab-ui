import { withKnobs, object } from '@storybook/addon-knobs';
import documentedStoriesOf from '../utils/documented_stories';
import { GlCalendarChart } from '../../index';
import readme from '../../components/charts/calendar/calendar.md';

const components = {
  GlCalendarChart,
};

function generateProps({
  data = [
    ['2018-12-2', 0],
    ['2018-12-1', 5],
    ['2018-1-1', 20],
    ['2018-2-1', 40],
  ],
  option = {
    calendar: {
      range: ['2018-01-28', '2019-01-28'],
    },
  },
} = {}) {
  return {
    data: {
      type: Array,
      default: () => object('Chart Data', data),
    },
    option: {
      type: Object,
      default: () => object('EChart Options', option),
    },
  };
}

documentedStoriesOf('charts|calendar-chart', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `<gl-calendar-chart
      :data="data"
      :option="option"
    />`,
  }));
