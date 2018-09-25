import { withKnobs, select, boolean } from '@storybook/addon-knobs'
import documentedStoriesOf from "../utils/documented_stories";
import { variantOptions } from '../utils/constants';
import readme from '../../documentation/alert.md';

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
      default: boolean('show', true)
    },
    fade: {
      type: Boolean,
      default: boolean('fade', false)
    }
  };
}

documentedStoriesOf('alert', readme)
  .addDecorator(withKnobs)
  .add('default alert', () => ({
    props: generateProps(),
    template: generateTemplate()
  }))
  .add('dismissable alert', () => ({
    props: generateProps(),
    template: generateTemplate({ dismissible: true })
  }));
