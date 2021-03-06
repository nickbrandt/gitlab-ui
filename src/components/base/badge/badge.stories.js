import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import { GlBadge, GlButton } from '../../../../index';
import { badgeSizeOptions, badgeVariantOptions } from '../../../utils/constants';
import readme from './badge.md';

const template = `
    <gl-badge
      :href="href"
      :variant="variant"
      :size="size"
      :icon="icon"
    >{{ content }}</gl-badge>
  `;

const defaultValue = (prop) => GlBadge.props[prop].default;

const generateProps = ({
  variant = defaultValue('variant'),
  size = defaultValue('size'),
  href = '',
  content = 'TestBadge',
  icon = '',
} = {}) => ({
  variant,
  size,
  href,
  content,
  icon,
});

const Template = (args, { argTypes }) => ({
  components: { GlBadge },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const ActionableWarning = Template.bind({});
ActionableWarning.args = generateProps({
  href: '#foo',
  variant: badgeVariantOptions.warning,
});

export const LargeDanger = Template.bind({});
LargeDanger.args = generateProps({
  size: badgeSizeOptions.lg,
  variant: badgeVariantOptions.danger,
});

export const BadgeIcon = Template.bind({});
BadgeIcon.args = generateProps({
  variant: badgeVariantOptions.success,
  icon: 'calendar',
});

const ButtonBadgeStory = (args, { argTypes }) => ({
  components: { GlBadge, GlButton },
  props: Object.keys(argTypes),
  template: `
    <gl-button category="primary" variant="info">
      To-Do
      <gl-badge class="gl-ml-2">42</gl-badge>
    </gl-button>`,
});

export const ButtonBadge = ButtonBadgeStory.bind({});
ButtonBadge.args = generateProps();
ButtonBadge.parameters = {
  storyshots: { disable: true },
};

export default {
  title: 'base/badge',
  component: GlBadge,
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
        options: badgeVariantOptions,
      },
    },
    size: {
      control: {
        type: 'select',
        options: badgeSizeOptions,
      },
    },
    icon: {
      control: {
        type: 'select',
        options: ['', ...iconSpriteInfo.icons],
      },
    },
  },
};
