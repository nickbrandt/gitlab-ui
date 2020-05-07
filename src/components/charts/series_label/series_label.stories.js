import { withKnobs, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlChartSeriesLabel } from '../../../../charts';
import readme from './series_label.md';
import { colorPaletteDefault } from '../../../utils/charts/theme';

const components = {
  GlChartSeriesLabel,
};

const generateProps = ({ color = colorPaletteDefault[0], type = 'solid' } = {}) => ({
  color: {
    default: text('Color', color),
  },
  type: {
    default: text('Series Type', type),
  },
});

const template = `<gl-chart-series-label
    :color="color"
    :type="type"
  >
    Series Name
  </gl-chart-series-label>`;

documentedStoriesOf('charts|chart-series-label', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps(),
    template,
  }))
  .add('dashed', () => ({
    components,
    props: generateProps({ type: 'dashed' }),
    template,
  }));
