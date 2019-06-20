import { withKnobs, text } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './hello.md';
import { GlHello } from '../../../index';

function generateProps({ name = 'GitLab' } = {}) {
  return {
    name: {
      type: String,
      default: text('name', name),
    },
  };
}

documentedStoriesOf('base|hello', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components: {
      GlHello,
    },
    template: ` <gl-hello :name="name" />`,
  }));
