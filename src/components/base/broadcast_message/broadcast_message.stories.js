import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/vue';
import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './broadcast_message.md';
import { GlBroadcastMessage } from '../../../../index';
import { colorThemes } from '../../../utils/constants';

const components = {
  GlBroadcastMessage,
};

const navbar = `
<template v-if="showNavbar">
  <div class="gl-h-8 gl-display-flex gl-text-white gl-justify-content-center gl-align-items-center gl-font-base" :class="navbarClass">
    Navbar
  </div>
</template>
`;

const getThemedBroadcastMessage = theme => `
<gl-broadcast-message
  :icon-name="iconName"
  :dismiss-label="dismissLabel"
  theme="${theme}">
  {{ text }}
</gl-broadcast-message>
`;

const listThemedBroadcastMessages = () =>
  Object.keys(colorThemes).reduce((res, theme) => res + getThemedBroadcastMessage(theme), '');

const generateDefaultProps = () => ({
  text: {
    default: text(
      'Text',
      'Tuesday June 12th, at 14:30 UTC we will perform database maintenance that will require up to 1 minute of downtime.'
    ),
  },
  iconName: {
    default: select('Icon name', iconSpriteInfo.icons, GlBroadcastMessage.props.iconName.default),
  },
  dismissLabel: {
    default: text('Dismiss button label', GlBroadcastMessage.props.dismissLabel.default),
  },
});

const generateThemeProps = () => ({
  theme: {
    default: select('Theme', Object.keys(colorThemes), GlBroadcastMessage.props.theme.default),
  },
  showNavbar: {
    default: boolean('Show a fake navbar?', false),
  },
});

const generateComputedProps = () => ({
  navbarClass() {
    return `gl-bg-${colorThemes[this.theme]}`;
  },
});

documentedStoriesOf('base|broadcast message', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: { ...generateDefaultProps(), ...generateThemeProps() },
    computed: generateComputedProps(),
    template: `
    <div>
      <gl-broadcast-message
        :icon-name="iconName"
        :dismiss-label="dismissLabel"
        :theme="theme">
        {{ text }}
      </gl-broadcast-message>
      ${navbar}
    </div>
    `,
  }))
  .add('stacked', () => ({
    components,
    props: { ...generateDefaultProps(), ...generateThemeProps() },
    computed: generateComputedProps(),
    template: `
    <div>
      <gl-broadcast-message
        :icon-name="iconName"
        :dismiss-label="dismissLabel"
        :theme="theme">
        {{ text }}
      </gl-broadcast-message>
      <gl-broadcast-message
        :icon-name="iconName"
        :dismiss-label="dismissLabel"
        :theme="theme">
        {{ text }}
      </gl-broadcast-message>
      ${navbar}
    </div>
    `,
  }))
  .add('themes', () => ({
    components,
    props: generateDefaultProps(),
    computed: generateComputedProps(),
    text:
      'Tuesday June 12th, at 14:30 UTC we will perform database maintenance that will require up to 1 minute of downtime.',
    template: `
    <div>
      ${listThemedBroadcastMessages()}
    </div>
    `,
  }));
