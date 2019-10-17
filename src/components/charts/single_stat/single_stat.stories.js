import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './single_stat.md';
import { GlSingleStat } from '../../../../charts';

const components = {
  GlSingleStat,
};

documentedStoriesOf('charts|single-stat', readme)
  .add('default', () => ({
    components,
    template: `
      <gl-single-stat title="Single stat" value="100%">
      </gl-single-stat>
    `,
  }))
  .add('with icon', () => ({
    components,
    template: `
      <gl-single-stat title="Single stat" value="100%">
        <span slot="icon">:)</span>
      </gl-single-stat>
    `,
  }));
