import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import readme from './input_group_text.md';
import GlInputGroupText from './input_group_text.vue';

const components = {
  GlInputGroupText,
};

const defaultProps = {};

function generateProps(props = {}) {
  return {
    ...defaultProps,
    ...props,
  };
}

documentedStoriesOf('base|form/input-group-text', readme).add('default', () => ({
  components,
  props: generateProps(),
  data: () => ({}),
  template: `
      <gl-input-group-text>Some text</gl-input-group-text>
    `,
}));
