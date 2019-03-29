import { withKnobs } from '@storybook/addon-knobs';
import documentedStoriesOf from '../utils/documented_stories';
import { GlHeatmap } from '../../charts';
import readme from '../../components/charts/area/area.md';

const components = {
  GlHeatmap,
};

function generateData() {
  let data = [[8, 0, 5], [2, 5, 1], [3, 2, 0], [5, 3, 0], [0, 4, 10], [0, 5, 4], [0, 6, 6]];
  data = data.map(item => [item[1], item[0], item[2] || '-']);
  return data;
}

documentedStoriesOf('charts|heatmap', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    data() {
      return {
        data: generateData(),
        xAxisLabels: [
          '12a',
          '1a',
          '2a',
          '3a',
          '4a',
          '5a',
          '6a',
          '7a',
          '8a',
          '9a',
          '10a',
          '11a',
          '12p',
          '1p',
          '2p',
          '3p',
          '4p',
          '5p',
          '6p',
          '7p',
          '8p',
          '9p',
          '10p',
          '11p',
        ],
        yAxisLabels: ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'],
      };
    },
    components,
    template: `<gl-heatmap
      title="Errors per hour"
      :data-series="data"
      :x-axis-labels="xAxisLabels"
      :y-axis-labels="yAxisLabels"
    />`,
  }));
