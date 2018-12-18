import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import documentedStoriesOf from '../utils/documented_stories';
import { variantOptions } from '../utils/constants';
import readme from '../../components/base/alert/alert.md';
import { GlAlert } from '../../index';

const components = {
  GlAlert,
};

function generateTemplate({ dismissible = false } = {}) {
  return `
  <gl-alert
    :show="show"
    :variant="variant"
    :dismissible="${dismissible}"
    :fade="fade">
      This is an alert message
  </gl-alert>`;
}

function generateProps({ variant = variantOptions.primary } = {}) {
  return {
    variant: {
      type: String,
      default: select('variant', variantOptions, variant),
    },
    show: {
      type: Boolean,
      default: boolean('show', true),
    },
    fade: {
      type: Boolean,
      default: boolean('fade', false),
    },
  };
}

documentedStoriesOf('base|alert', readme)
  .addDecorator(withKnobs)
  .add('default alert', () => ({
    props: generateProps(),
    components,
    template: generateTemplate(),
  }))
  .add('dismissable alert', () => ({
    props: generateProps(),
    components,
    template: generateTemplate({ dismissible: true }),
  }));
