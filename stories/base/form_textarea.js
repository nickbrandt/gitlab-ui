import { withKnobs } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../utils/documented_stories';
import readme from '../../components/base/form_textarea/form_textarea.md';
import { GlFormTextarea } from '../../index';

const components = {
  GlFormTextarea,
};

const template = `
  <gl-form-textarea
    :value="value"
    :placeholder="placeholder"
    :size="size"
  />
`;

function generateProps() {
  return {
    value: {
      type: String,
      default: 'hello',
    },
    placeholder: {
      type: String,
      default: 'hello',
    },
    size: {
      type: String,
      default: 140,
    },
  };
}

documentedStoriesOf('base|form-textarea', readme).add('default', () => ({
  components,
  props: generateProps(),
  template,
}));
