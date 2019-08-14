import documentedStoriesOf from '../../../../utils/documented_stories';
import readme from './card.md';

import { GlCard } from '../../../../index';

const components = {
  GlCard,
};

documentedStoriesOf('base|card', readme).add('default', () => ({
  props: {},
  components,
  template: '<ul class="list-unstyled"><gl-card /></ul>',
}));
