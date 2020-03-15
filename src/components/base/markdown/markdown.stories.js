import { withKnobs, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './markdown.md';
import { GlMarkdown } from '../../../../index';

const components = {
  GlMarkdown,
};

function generateProps({ markdown = '' } = {}) {
  return {
    markdown: {
      type: String,
      default: text('markdown', markdown),
    },
  };
}

documentedStoriesOf('base|markdown', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-markdown />
    `,
  }));
