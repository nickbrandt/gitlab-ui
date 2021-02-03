import { withKnobs, text, select } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlTruncate } from '../../../../index';
import { POSITION } from './constants';
import readme from './truncate.md';

const components = {
  GlTruncate,
};

const template = '<gl-truncate :text="text" :position="position" />';

function generateProps({
  longText = 'src/thisIs/AVeryLongFilePath/that/needs/to/be/smartly/truncated/from/the/middle/so/we/dont/lose/important/information/here.vue',
  position = 'middle',
} = {}) {
  return {
    text: {
      type: String,
      default: text('text', longText),
    },
    position: {
      type: String,
      default: select('position', Object.values(POSITION), position),
    },
  };
}

documentedStoriesOf('utilities/truncate', readme)
  .addParameters({ storyshots: false })
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template,
  }));
