import documentedStoriesOf from '../utils/documented_stories';
import { GlAreaChart } from '../../index';
import readme from '../../components/charts/area/area.md';

const components = {
  GlAreaChart,
};

documentedStoriesOf('area-chart', readme).add('default', () => ({
  props: {},
  components,
  data() {
    return {
      data: {
        Mon: 820,
        Tue: 932,
        Wed: 901,
        Thu: 934,
        Fri: 1290,
        Sat: 1330,
        Sun: 1320,
      },
    };
  },
  template: `<gl-area-chart
      :data="data"
      title="ECharts Take 1"
    >
      <x-axis type="category" />
    </gl-area-chart>`,
}));
