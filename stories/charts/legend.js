import documentedStoriesOf from '../utils/documented_stories';
import { GlChartLegend } from '../../charts';
import readme from '../../components/charts/legend/legend.md';
import { colorPalette } from '../../helpers/charts/theme';

const components = {
  GlChartLegend,
};
const seriesInfo = [
  {
    type: 'solid',
    name: 'Example Title',
    color: colorPalette[0],
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
