import { withKnobs, text } from '@storybook/addon-knobs/vue';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './sprintf.md';
import { GlSprintf, GlButton } from '../../../../index';

const components = {
  GlSprintf,
  GlButton,
};

function generateProps({ message = 'Written by %{author}' } = {}) {
  const props = {
    message: {
      default: text('Message', message),
    },
  };

  return props;
}

documentedStoriesOf('utilities|sprintf', readme)
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
  }))
  .add('interpolated content', () => ({
    props: generateProps({
      message: 'Click %{linkStart}here%{linkEnd} to reticulate splines.',
    }),
    components,
    template: `
      <div class="gl-font-base">
        <gl-sprintf :message="message">
          <template #link="{ content }">
            <gl-link href="#" target="_blank">{{ content }}</gl-link>
          </template>
        </gl-sprintf>
      </div>
    `,
  }));
