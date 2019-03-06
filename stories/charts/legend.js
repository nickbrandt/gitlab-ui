import documentedStoriesOf from '../utils/documented_stories';
import { GlChartLegend } from '../../charts';
import readme from '../../components/charts/legend/legend.md';

const components = {
  GlChartLegend,
};
const seriesInfo = [
  {
    type: 'solid',
    name: 'Example Title',
    color: '#1F78D1',
    data: [1, 2, 3, 4, 5],
  },
];

documentedStoriesOf('charts|chart-legend', readme).add('default', () => ({
  props: {},
  components,
  seriesInfo,
  template: `<gl-chart-legend
      :series-info="$options.seriesInfo"
    />`,
}));
