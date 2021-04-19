import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlChartSkeleton } from '../../../../index';
import readme from './chart_skeleton.md';

const components = {
  GlChartSkeleton,
};

const template = `
  <gl-chart-skeleton />
`;

documentedStoriesOf('regions/chart-skeleton', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template,
  }));
