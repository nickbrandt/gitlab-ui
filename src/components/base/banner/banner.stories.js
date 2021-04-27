import clusterPopoverSvg from '@gitlab/svgs/dist/illustrations/cluster_popover.svg';
import serviceDeskCalloutSvg from '@gitlab/svgs/dist/illustrations/service_desk_callout.svg';
import { GlBanner, GlLink, GlButton } from '../../../../index';
import { bannerVariants } from '../../../utils/constants';
import readme from './banner.md';

const generateProps = ({
  title = 'Upgrade your plan to activate Service Desk',
  buttonText = 'Upgrade your plan',
  buttonLink = 'https://gitlab.com',
  svgPath = serviceDeskCalloutSvg,
  variant = GlBanner.props.variant.default,
} = {}) => ({
  title,
  buttonText,
  buttonLink,
  svgPath,
  variant,
});

const DefaultStory = (args, { argTypes }) => ({
  components: {
    GlBanner,
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
      <p>GitLab Service Desk is a simple way to allow people to create issues in your GitLab instance without needing their own user account. It provides a unique email address for end users to create issues in a project, and replies can be sent either though the GitLab interface or by email. End users will only see the thread though email.</p>
    </gl-banner>`,
});

const Default = DefaultStory.bind({});
Default.args = generateProps();

const NoImageStory = (args, { argTypes }) => ({
  components: {
    GlBanner,
    GlLink,
  },
  props: Object.keys(argTypes),
  template: `
      <gl-banner
        title="Auto DevOps (Beta)"
        button-text="Upgrade your plan"
        :button-link="buttonLink"
        svg-path="${clusterPopoverSvg}"
        variant="${bannerVariants[1]}"
      >
       <p>Auto DevOps can be enabled for this project. It will automatically build, test, and deploy your application based on a predefined CI/CD configuration.</p>
       <p>Learn more in the <gl-link href="#">Auto DevOps documentation</gl-link>.</p>
      </gl-banner>`,
});
const NoImage = NoImageStory.bind({});
NoImage.args = generateProps();
NoImage.parameters = {
  storyshots: { disable: true },
};

const IntroductionStory = (args, { argTypes }) => ({
  components: {
    GlBanner,
    GlLink,
  },
  props: Object.keys(argTypes),
  template: `
      <gl-banner
          title="Auto DevOps (Beta)"
          button-text="Upgrade your plan"
          :button-link="buttonLink"
          svg-path="${clusterPopoverSvg}"
          variant="${bannerVariants[1]}"
      >
      <p>Auto DevOps can be enabled for this project. It will automatically build, test, and deploy your application based on a predefined CI/CD configuration.</p>
      <p>Learn more in the <gl-link href="#">Auto DevOps documentation</gl-link>.</p>
      </gl-banner>`,
});
const Introduction = IntroductionStory.bind({});
Introduction.args = generateProps();
Introduction.parameters = {
  storyshots: { disable: true },
};

const WithActionsStory = (args, { argTypes }) => ({
  components: {
    GlBanner,
    GlButton,
  },
  props: Object.keys(argTypes),
  template: `
      <gl-banner
          title="Button with actions banner"
          button-text="Primary Button"
          :button-link="buttonLink"
      >
      <p>There should be a primary button and a link button below this text.</p>
      <template #actions>
        <gl-button class="gl-ml-3" variant="link">Ask again later</gl-button>
      </template>
      </gl-banner>`,
});
const WithActions = WithActionsStory.bind({});
WithActions.args = generateProps();
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
  },
};
