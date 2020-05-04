import { withKnobs, object, select } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { glThemes } from '../../../utils/constants';
import readme from './path.md';
import items from './examples/data';

function generateProps() {
  return {
    theme: {
      default: select('Theme', glThemes, 'indigo'),
    },
    items: {
      default: object('Items', items),
    },
  };
}

documentedStoriesOf('base|path', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    template: `<gl-path :items="items" :theme="theme"/>`,
  }));
