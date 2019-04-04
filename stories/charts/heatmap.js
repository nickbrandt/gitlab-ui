import { withKnobs } from '@storybook/addon-knobs';
import documentedStoriesOf from '../utils/documented_stories';
import { GlHeatmap } from '../../charts';
import readme from '../../components/charts/area/area.md';

const components = {
  GlHeatmap,
};

function generateData() {
  let data = [[5, 0, 5], [2, 5, 1], [3, 2, 0], [5, 3, 4], [0, 4, 10], [0, 5, 4], [0, 6, 6]];
  data = data.map(item => [item[1], item[0], item[2] || '-']);
  return data;
}

documentedStoriesOf('charts|heatmap', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    data() {
      return {
        data: generateData(),
        xAxisLabels: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
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
