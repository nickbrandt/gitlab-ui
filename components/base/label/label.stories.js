import { withKnobs, text, color, boolean } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './label.md';
import { GlLabel } from '../../../index';

const components = {
  GlLabel,
};

const generateProps = ({ hasTarget = false, hasDesc = false, isScoped = false } = {}) => {
  const props = {
    color: {
      default: color('Font color', '#fff'),
    },
    backgroundColor: {
      default: color('Bacground color', '#D9C2EE'),
    },
  };

  if (hasDesc) {
    props.description = {
      default: text('Label description', 'Olla amigos! this is a description'),
    };
  }

  if (hasTarget) {
    props.target = {
      default: text('Link to label target', 'https://gitlab.com/gitlab-org/gitlab-ui'),
    };
  }

  if (isScoped) {
    props.isScoped = {
      default: boolean('Scope label type', true),
    };
  }

  return props;
};

documentedStoriesOf('base|label', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-label
        :color="color"
        :background-color="backgroundColor"
      >
        Basic Label
      </gl-label>`,
  }))
  .add('description', () => ({
    props: generateProps({ hasDesc: true }),
    components,
    template: `
      <gl-label
        :color="color"
        :background-color="backgroundColor"
        :description="description"
      >
        Label with description
      </gl-label>`,
  }))
  .add('target', () => ({
    props: generateProps({
      hasDesc: true,
      hasTarget: true,
    }),
    components,
    template: `
      <gl-label 
        :target="target" 
        :color="color" 
        :background-color="backgroundColor" 
        :description="description"
      >
        Label with target
      </gl-label>`,
  }))
  .add('scoped', () => ({
    props: generateProps({
      hasDesc: true,
      hasTarget: true,
      isScoped: true,
    }),
    components,
    template: `
      <gl-label 
        :target="target"
        :color="color" 
        :background-color="backgroundColor"
        :description="description"
        :is-scoped="isScoped"
        scoped-labels-documentation-link="https://gitlab.com/help/user/project/labels.md#scoped-labels"
      >
        Scoped Label
      </gl-label>`,
  }));
