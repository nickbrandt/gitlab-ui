import documentedStoriesOf from '../utils/documented_stories';
import { GlFrequencyChart } from '../../index';
import readme from '../../components/charts/frequency/frequency.md';

const components = {
  GlFrequencyChart,
};

const today = new Date();
const timeIncrement = 3600000;
const frequency = Array(24)
  .fill(null)
  .map((_, index) => ({
    date: new Date(today.getTime() - index * timeIncrement),
    value: index,
  }));

documentedStoriesOf('charts|frequency-chart', readme).add('default', () => ({
  props: {},
  components,
  data() {
    return { frequency };
  },
  template: `<gl-frequency-chart
    :chart-data="frequency"
  />`,
}));
