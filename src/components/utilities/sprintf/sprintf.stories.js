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
  .add('sentence with link', () => ({
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
  }))
  .add('basic placeholder', () => ({
    props: generateProps(),
    components,
    data: () => ({ authorName: 'Some author' }),
    template: `
      <div class="gl-font-base">
        <gl-sprintf :message="message">
          <template #author>
            <span class="gl-font-weight-bold">{{ authorName }}</span>
          </template>
        </gl-sprintf>
      </div>
    `,
  }))
  .add('basic button placeholder', () => ({
    props: generateProps(),
    components,
    data: () => ({ authorName: 'Some author' }),
    template: `
      <div class="gl-font-base">
        <gl-sprintf :message="message">
          <template #author>
            <gl-button>{{ authorName }}</gl-button>
          </template>
        </gl-sprintf>
      </div>
    `,
  }));
