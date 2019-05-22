import { withKnobs, text, color, boolean } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './label.md';
import { GlLabel } from '../../../index';

const components = {
  GlLabel,
};

const defaultTemplate = `
    <gl-label :color="color" :background-color="backgroundColor">{{title}}</gl-label>`;
const tooltipTemplate = `
    <gl-label :color="color" :background-color="backgroundColor" :description="description">{{title}}</gl-label>`;

const targetTemplate = `
    <gl-label :target="target" :color="color" :background-color="backgroundColor" :description="description">{{title}}</gl-label>`;

const scopedTemplate = `
    <gl-label 
      :target="target"
      :color="color" 
      :background-color="backgroundColor"
      :description="description"
      :isScoped="isScoped"
      scoped-labels-documentation-link="https://gitlab.com/help/user/project/labels.md#scoped-labels"
    >{{title}}</gl-label>`;

documentedStoriesOf('base|label', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {
      title: {
        default: text('Label title', 'Hello world'),
      },
      color: {
        default: color('Font color', '#fff'),
      },
      backgroundColor: {
        default: color('Bacground color', '#D9C2EE'),
      },
    },
    components,
    defaultTemplate,
  }))
  .add('description', () => ({
    props: {
      description: {
        default: text('Label description', 'Olla amigos! this is a description'),
      },
      title: {
        default: text('Label title', 'Hello world'),
      },
      color: {
        default: color('Font color', '#fff'),
      },
      backgroundColor: {
        default: color('Bacground color', '#D9C2EE'),
      },
    },
    components,
    tooltipTemplate,
  }))
  .add('target', () => ({
    props: {
      description: {
        default: text('Label description', 'Olla amigos! this is a description'),
      },
      title: {
        default: text('Label title', 'Hello world'),
      },
      color: {
        default: color('Font color', '#fff'),
      },
      backgroundColor: {
        default: color('Bacground color', '#D9C2EE'),
      },
      target: {
        default: text('Link to label target', 'https://gitlab.com/gitlab-org/gitlab-ui'),
      },
    },
    components,
    targetTemplate,
  }))
  .add('scoped', () => ({
    props: {
      description: {
        default: text('Label description', 'Olla amigos! this is a description'),
      },
      title: {
        default: text('Label title', 'Hello world'),
      },
      color: {
        default: color('Font color', '#fff'),
      },
      backgroundColor: {
        default: color('Bacground color', '#D9C2EE'),
      },
      target: {
        default: text('Link to label target', 'https://gitlab.com/gitlab-org/gitlab-ui'),
      },
      isScoped: {
        default: boolean('Scope label type', true),
      },
    },
    components,
    scopedTemplate,
  }));
