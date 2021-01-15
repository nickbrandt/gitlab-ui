import { withKnobs, text, object } from '@storybook/addon-knobs/vue';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './sprintf.md';
import { GlSprintf, GlButton } from '../../../../index';

const components = {
  GlSprintf,
  GlButton,
};

function generateProps({ message = 'Written by %{author}', placeholders } = {}) {
  const props = {
    message: {
      default: text('Message', message),
    },
  };

  if (placeholders) {
    props.placeholders = {
      default: object('Placeholders', placeholders),
    };
  }

  return props;
}

documentedStoriesOf('utilities/sprintf', readme)
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
  .add('sentence with link using custom placeholders', () => ({
    props: generateProps({
      message: 'Click %{my_custom_start}here%{my_custom_end} to reticulate splines.',
      placeholders: { link: ['my_custom_start', 'my_custom_end'] },
    }),
    components,
    template: `
      <div class="gl-font-base">
        <gl-sprintf :message="message" :placeholders="placeholders">
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
