import { withKnobs } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../utils/documented_stories';
import readme from '../../components/charts/single_stat/single_stat.md';
import { GlSingleStat } from '../../charts';

const components = {
  GlSingleStat,
};

documentedStoriesOf('charts|single-stat', readme)
  .addDecorator(withKnobs)
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
