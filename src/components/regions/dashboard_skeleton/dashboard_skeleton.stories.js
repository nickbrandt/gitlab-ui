import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlDashboardSkeleton } from '../../../../index';
import readme from './dashboard_skeleton.md';

const components = {
  GlDashboardSkeleton,
};

const template = `
  <gl-dashboard-skeleton />
`;

documentedStoriesOf('regions/dashboard-skeleton', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template,
  }));
