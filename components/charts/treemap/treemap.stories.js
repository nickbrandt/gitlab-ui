import documentedStoriesOf from '../../../utils/documented_stories';
import { GlTreemap } from '../../../charts';
import readme from './treemap.md';

const components = {
  GlTreemap,
};

documentedStoriesOf('charts|treemap', readme).add('default', () => ({
  data() {
    return {};
  },
  components,
  template: `<div>Such template!</div>`,
}));
