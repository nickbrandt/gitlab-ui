import { storiesOf } from '@storybook/vue'
import { withKnobs, select, boolean } from '@storybook/addon-knobs/vue'
import { variantOptions } from './utils/constants';

function generateTemplate({ dismissible = false } = {}) {
  return `
  <gl-alert
    :show="show"
    :variant="variant"
    :dismissible="${dismissible}"
    :fade="fade">
      This is my content
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

storiesOf("alert", module)
  .addDecorator(withKnobs)
  .add("default alert", () => ({
    props: generateProps(),
    template: generateTemplate()
  }))
  .add("dismissable alert", () => ({
    props: generateProps(),
    template: generateTemplate({ dismissible: true })
  }));
