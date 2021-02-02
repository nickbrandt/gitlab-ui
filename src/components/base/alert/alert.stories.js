import { alertVariantOptions } from '../../../utils/constants';
import readme from './alert.md';
import { GlAlert } from '../../../../index';

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
    :contained="contained"
  >{{ message }}</gl-alert>`;

const defaultValue = (prop) => GlAlert.props[prop].default;

function generateProps({
  title = defaultValue('title'),
  variant = defaultValue('variant'),
  dismissible = defaultValue('dismissible'),
  dismissLabel = defaultValue('dismissLabel'),
  primaryButtonText = defaultValue('primaryButtonText'),
  primaryButtonLink = defaultValue('primaryButtonLink'),
  secondaryButtonText = defaultValue('secondaryButtonText'),
  secondaryButtonLink = defaultValue('secondaryButtonLink'),
  contained = defaultValue('contained'),
} = {}) {
  return {
    title,
    message: 'Lorem ipsum dolor sit amet',
    variant,
    dismissible,
    dismissLabel,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    contained,
  };
}

export default {
  title: 'base/Alert',
  component: GlAlert,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: alertVariantOptions,
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { GlAlert },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const TitledWarning = Template.bind({});
TitledWarning.args = generateProps({
  title: 'A warning',
  variant: alertVariantOptions.warning,
});

export const UndismissibleDangerWithActions = Template.bind({});
UndismissibleDangerWithActions.args = generateProps({
  variant: alertVariantOptions.danger,
  dismissible: false,
  primaryButtonText: 'Primary action',
  secondaryButtonText: 'Secondary action',
  secondaryButtonLink: '#',
});

export const Contained = Template.bind({});
Contained.args = generateProps({
  contained: true,
});
