import { array, text, withKnobs } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../../documentation/documented_stories';
import readme from './intersperse.md';

import { GlIntersperse } from '../../../../index';

const template = `
  <div>
    <gl-intersperse :separator="separator" :lastSeparator="lastSeparator">
      <span v-for="item in items">{{ item }}</span>
    </gl-intersperse>
  </div>
  `;

function generateProps({
  separator = ', ',
  lastSeparator = '',
  items = ['Foo', 'Bar', 'Baz', 'Qaz'],
} = {}) {
  return {
    items: {
      default: array('items', items),
    },
    separator: {
      default: text('separator', separator),
    },
    lastSeparator: {
      default: text('lastSeparator', lastSeparator),
    },
  };
}

documentedStoriesOf('base|intersperse', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components: {
      GlIntersperse,
    },
    template,
  }))
  .add('custom seperator', () => ({
    props: generateProps({ separator: '-' }),
    components: {
      GlIntersperse,
    },
    template,
  }))
  .add('custom last separator', () => ({
    props: generateProps({ lastSeparator: ' and ' }),
    components: {
      GlIntersperse,
    },
    template,
  }));
