import { withKnobs, text } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import { GlChartSeriesLabel } from '../../../charts';
import readme from './series_label.md';
import { colorPalette } from '../../../utils/charts/theme';

const components = {
  GlChartSeriesLabel,
};

const data = ({ color = colorPalette[0], type = 'solid' }) => ({
  color: text('Color', color),
  type: text('Series Type', type),
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
    data,
    template,
  }))
  .add('dashed', () => ({
    components,
    data() {
      return data({ type: 'dashed' });
    },
    template,
  }));
