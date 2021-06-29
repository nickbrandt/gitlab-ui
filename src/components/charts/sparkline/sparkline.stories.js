import { GlSparklineChart } from '../../../../charts';
import { sparkline } from '../../../utils/charts/theme';
import readme from './sparkline.md';

const chartData = [
  ['Mon', 10],
  ['Tue', 15],
  ['Wed', 9],
  ['Thu', 22],
  ['Fri', 29],
  ['Sat', 20],
  ['Sun', 18],
];

const generateProps = ({
  data = chartData,
  variant = sparkline.defaultVariant,
  height = 50,
  tooltipLabel = 'tooltipLabel',
  showLastYValue = true,
} = {}) => ({
  data,
  variant,
  height,
  tooltipLabel,
  showLastYValue,
});

const Template = (args) => ({
  components: { GlSparklineChart },
  props: Object.keys(args),
  template: `
    <div>
      <gl-sparkline-chart
        :data="data"
        :variant="variant"
        :height="height"
        :tooltip-label="tooltipLabel"
        :show-last-y-value="showLastYValue"
      />
    </div>`,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'charts/sparkline-chart',
  component: GlSparklineChart,
  parameters: {
    knobs: { disabled: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: Object.keys(sparkline.variants),
      },
    },
  },
};
