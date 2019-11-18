import { withKnobs, text } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './sprintf.md';
import { GlSprintf, GlNewButton } from '../../../../index';

const components = {
  GlSprintf,
  GlButton: GlNewButton,
};

function generateProps() {
  const props = {
    message: {
      default: text('Message', 'Written by %{author}'),
    },
  };

  return props;
}

documentedStoriesOf('base|sprintf', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <div class="gl-font-base">
        <gl-sprintf :message="message">
          <template #author>
            <span class="gl-font-weight-bold">Author</span>
          </template>
        </gl-sprintf>
      </div>
    `,
  }))
  .add('with a button', () => ({
    props: generateProps(),
    components,
    template: `
      <div class="gl-font-base">
        <gl-sprintf :message="message">
          <template #author>
            <gl-button>Author</gl-button>
          </template>
        </gl-sprintf>
      </div>
    `,
  }));
