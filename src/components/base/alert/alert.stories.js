import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../../../utils/documented_stories';
import { alertVariantOptions } from '../../../utils/constants';
import readme from './alert.md';
import { GlAlert } from '../../../../index';

const components = {
  GlAlert,
};

const template = `
  <gl-alert
    :title="title"
    :dismissible="dismissible"
    :dismiss-label="dismissLabel"
    :variant="variant"
    :primary-button-text="primaryButtonText"
    :secondary-button-text="secondaryButtonText"
    :primary-button-link="primaryButtonLink"
    :secondary-button-link="secondaryButtonLink"
  >{{ message }}</gl-alert>`;

const defaultValue = prop => GlAlert.props[prop].default;

function generateProps({
  title = defaultValue('title'),
  variant = defaultValue('variant'),
  dismissible = defaultValue('dismissible'),
  dismissLabel = defaultValue('dismissLabel'),
  primaryButtonText = defaultValue('primaryButtonText'),
  primaryButtonLink = defaultValue('primaryButtonLink'),
  secondaryButtonText = defaultValue('secondaryButtonText'),
  secondaryButtonLink = defaultValue('secondaryButtonLink'),
} = {}) {
  return {
    title: {
      type: String,
      default: text('title', title),
    },
    message: {
      type: String,
      default: text('message', 'Lorem ipsum dolor sit amet'),
    },
    variant: {
      type: String,
      default: select('variant', alertVariantOptions, variant),
    },
    dismissible: {
      type: Boolean,
      default: boolean('dismissible', dismissible),
    },
    dismissLabel: {
      type: String,
      default: text('dismiss label', dismissLabel),
    },
    primaryButtonText: {
      type: String,
      default: text('primary button text', primaryButtonText),
    },
    primaryButtonLink: {
      type: String,
      default: text('primary button link', primaryButtonLink),
    },
    secondaryButtonText: {
      type: String,
      default: text('secondary button text', secondaryButtonText),
    },
    secondaryButtonLink: {
      type: String,
      default: text('secondary button link', secondaryButtonLink),
    },
  };
}

documentedStoriesOf('base|alert', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps(),
    template,
  }))
  .add('titled warning', () => ({
    components,
    props: generateProps({
      title: 'A warning',
      variant: alertVariantOptions.warning,
    }),
    template,
  }))
  .add('undismissible danger with actions', () => ({
    components,
    props: generateProps({
      variant: alertVariantOptions.danger,
      dismissible: false,
      primaryButtonText: 'Primary action',
      secondaryButtonText: 'Secondary action',
      secondaryButtonLink: '#',
    }),
    template,
  }));
