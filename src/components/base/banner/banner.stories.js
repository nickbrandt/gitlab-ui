import { text, select, withKnobs } from '@storybook/addon-knobs/vue';
import serviceDeskCalloutSvg from '@gitlab/svgs/dist/illustrations/service_desk_callout.svg';
import clusterPopoverSvg from '@gitlab/svgs/dist/illustrations/cluster_popover.svg';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { bannerVariants } from '../../../utils/constants';
import { GlBanner, GlLink } from '../../../../index';

const components = {
  GlBanner,
  GlLink,
};

const getProps = () => ({
  title: {
    default: text('Title', 'Upgrade your plan to activate Service Desk'),
  },
  buttonText: {
    default: text('Button Text', 'Upgrade your plan'),
  },
  buttonLink: {
    default: text('Button Link', 'https://gitlab.com'),
  },
  svgPath: {
    default: text('SVG Path', serviceDeskCalloutSvg),
  },
  variant: {
    default: select('Variant', bannerVariants, bannerVariants[0]),
  },
});

documentedStoriesOf('base/banner', '')
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: getProps(),
    template: `
      <gl-banner
        :title="title"
        :button-text="buttonText"
        :button-link="buttonLink"
        :svg-path="svgPath"
        :variant="variant"
      >
        <p>GitLab Service Desk is a simple way to allow people to create issues in your GitLab instance without needing their own user account. It provides a unique email address for end users to create issues in a project, and replies can be sent either though the GitLab interface or by email. End users will only see the thread though email.</p>
      </gl-banner>
    `,
  }))
  .add('no image', () => ({
    components,
    props: getProps(),
    template: `
      <gl-banner
        title="Improve Merge Requests with squash commit and GitLab Enterprise Edition"
        button-text="Start GitLab Enterprise Edition trial"
        :button-link="buttonLink"
      >
        <p>Squashing lets you tidy up the commit history of a branch when accepting a merge request. It applies all of the changes in a merge request as a single commit, and then merges that commit using the merge method set out by the project.</p>
      </gl-banner>
    `,
  }))
  .add('introduction', () => ({
    components,
    props: getProps(),
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
      </gl-banner>
    `,
  }));
