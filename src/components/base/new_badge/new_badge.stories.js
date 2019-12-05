import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './new_badge.md';
import { GlNewBadge } from '../../../../index';

const components = {
  GlNewBadge,
};

documentedStoriesOf('base|new-badge', readme).add('default', () => ({
  props: {},
  components,
  template: `<div>
    <gl-new-badge>Neutral average</gl-new-badge>
  </div>`,
}));
