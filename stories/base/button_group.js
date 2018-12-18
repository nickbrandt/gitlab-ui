import { withKnobs } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../utils/documented_stories';
import readme from '../../components/base/button_group/button_group.md';
import { GlButtonGroup } from '../../index';

const components = {
  GlButtonGroup,
};

documentedStoriesOf('base|button group', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template: `
     <gl-button-group>
       <gl-button>Button 1</gl-button>
       <gl-button>Button 2</gl-button>
     </gl-button-group> 
    `,
  }));
