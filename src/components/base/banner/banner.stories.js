import illustrationsSvgs from '@gitlab/svgs/dist/illustrations.json';
import { GlBanner, GlButton } from '../../../../index';
import { bannerVariants } from '../../../utils/constants';
import readme from './banner.md';

const illustrationsUrl = 'https://gitlab.com/gitlab-org/gitlab-svgs/raw/v1.152.0';

const template = `
    <gl-banner
      :title="title"
      :button-text="buttonText"
      :button-link="buttonLink"
      :svg-path="svgPath"
      :variant="variant"
    >
      <p>GitLab Service Desk is a simple way to allow people to create issues in your GitLab instance without needing their own user account. It provides a unique email address for end users to create issues in a project, and replies can be sent either though the GitLab interface or by email. End users will only see the thread though email.</p>
    </gl-banner>
`;

const generateProps = ({
  title = 'Upgrade your plan to activate Service Desk',
  buttonText = 'Upgrade your plan',
  buttonLink = 'https://gitlab.com',
  svgPath = `${illustrationsUrl}/illustrations/service_desk_callout.svg`,
  variant = GlBanner.props.variant.default,
} = {}) => ({
  title,
  buttonText,
  buttonLink,
  svgPath,
  variant,
});

const Template = (args, { argTypes }) => ({
  components: {
    GlBanner,
  },
  props: Object.keys(argTypes),
  template,
});
export const Default = Template.bind({});
Default.args = generateProps();

export const NoImage = Template.bind({});
NoImage.args = generateProps({
  svgPath: null,
});

export const Introduction = Template.bind({});
Introduction.args = generateProps({
  svgPath: `${illustrationsUrl}/illustrations/cluster_popover.svg`,
  variant: bannerVariants[1],
});

const WithActionsStory = (args, { argTypes }) => ({
  components: {
    GlBanner,
    GlButton,
  },
  props: Object.keys(argTypes),
  template: `
    <gl-banner
        :title="title"
        :button-text="buttonText"
        :button-link="buttonLink"
        :svg-path="svgPath"
        :variant="variant"
    >
      <p>There should be a primary button and a link button below this text.</p>
      <template #actions>
        <gl-button class="gl-ml-3" variant="link">Ask again later</gl-button>
      </template>
      </gl-banner>`,
});
export const WithActions = WithActionsStory.bind({});
WithActions.args = generateProps({
  title: 'Button with actions banner',
  buttonText: 'Primary Button',
  svgPath: null,
});
WithActions.parameters = {
  storyshots: { disable: true },
};

export default {
  title: 'base/banner',
  component: GlBanner,
  parameters: {
    knobs: { disabled: true },
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
        options: bannerVariants,
      },
    },
    svgPath: {
      control: {
        type: 'select',
        options: [
          '',
          ...illustrationsSvgs.illustrations.map((i) => `${illustrationsUrl}/${i.name}`),
        ],
        labels: Object.assign(
          {},
          ...illustrationsSvgs.illustrations.map((i) => ({
            [`${illustrationsUrl}/${i.name}`]: i.name.replace('illustrations/', ''),
          }))
        ),
      },
    },
  },
};
