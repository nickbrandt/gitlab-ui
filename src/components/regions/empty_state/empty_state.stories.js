import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './empty_state.md';
import { GlEmptyState } from '../../../../index';

const components = {
  GlEmptyState,
};

const template = `
  <gl-empty-state
    :title="title"
    :svgPath="svgPath"
    :description="description"
    :primaryButtonText="primaryButtonText"
    :secondaryButtonText="secondaryButtonText"
    :compact="compact"
    primaryButtonLink="#"
    secondaryButtonLink="#"
  />
`;

function generateProps({ compact = false } = {}) {
  return {
    title: {
      type: String,
      default: text('title', 'This state is empty'),
    },
    svgPath: {
      type: String,
      default:
        'https://gitlab.com/gitlab-org/gitlab-svgs/raw/master/illustrations/security-dashboard-empty-state.svg',
    },
    description: {
      type: String,
      default: text(
        'description',
        'The title and message should be clear, concise, and explain why the user is seeing this screen.'
      ),
    },
    primaryButtonText: {
      type: String,
      default: text('primary button', 'Something actionable'),
    },
    secondaryButtonText: {
      type: String,
      default: text('secondary button', 'Something else'),
    },
    compact: {
      type: Boolean,
      default: boolean('Compact', compact),
    },
  };
}

documentedStoriesOf('regions|empty-state', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template,
  }))
  .add('single button', () => ({
    props: {
      ...generateProps(),
      secondaryButtonText: {
        type: String,
        default: null,
      },
    },
    components,
    template,
  }))
  .add('no buttons', () => ({
    props: {
      ...generateProps(),
      primaryButtonText: {
        type: String,
        default: null,
      },
    },
    components,
    template,
  }))
  .add('no illustration', () => ({
    props: {
      ...generateProps(),
      svgPath: {
        type: String,
        default: null,
      },
    },
    components,
    template,
  }))
  .add('custom actions', () => ({
    props: {
      ...generateProps(),
    },
    components,
    template: `
      <gl-empty-state
        :title="title"
        :svgPath="svgPath"
        :description="description"
        :primaryButtonText="primaryButtonText"
        :secondaryButtonText="secondaryButtonText"
        primaryButtonLink="#"
        secondaryButtonLink="#"
      >
      <template #actions>
        <gl-deprecated-button
          variant="success"
        >Custom button</gl-deprecated-button>
        <a href="#" @click.prevent>Custom link</a>
      </template>
      </gl-empty-state>
    `,
  }))
  .add('not fullscreen', () => ({
    props: {
      ...generateProps({
        compact: true,
      }),
      title: {
        default: 'This is a compact empty state',
      },
      description: {
        default: 'It could be included in a settings page, or a list view',
      },
    },
    components,
    template,
  }))
  .add('slotted description', () => ({
    props: {
      ...generateProps(),
    },
    components,
    template: `
      <gl-empty-state
        title="Slotted description example"
        svg-path="https://gitlab.com/gitlab-org/gitlab-svgs/raw/master/illustrations/issues.svg"
        primary-button-link="#"
        primary-button-text="Learn more"
      >
        <template #description>
          <p>A slotted description allows you to use more custom HTML such as <a href="#">links</a>.</p>
          <pre>You could also include code snippets</pre>
          <p><strong>Note:</strong> A slotted description will override one provided by a property.</p>
        </template>
      </gl-empty-state>
    `,
  }));
