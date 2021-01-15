import { withKnobs, boolean } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './markdown.md';
import GlMarkdown from './markdown.vue';
import markdownTypescaleDemoContent from './markdown_typescale_demo.html';

const components = {
  GlMarkdown,
};

documentedStoriesOf('base/markdown', readme)
  .addDecorator(withKnobs)
  .add(
    'typescale',
    () => ({
      components,
      props: {
        compact: {
          type: Boolean,
          default: boolean('compact', false),
        },
      },
      template: `
      <gl-markdown :compact="compact">${markdownTypescaleDemoContent}</gl-markdown>
    `,
    }),
    {
      viewport: { defaultViewport: 'breakpointExtraLarge' },
    }
  );
