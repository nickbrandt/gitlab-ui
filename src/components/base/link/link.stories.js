import { GlLink } from '../../../../index';
import { targetOptions } from '../../../utils/constants';
import readme from './link.md';

const defaultValue = (prop) => GlLink.props[prop].default;

const generateProps = ({ href = '#', target = defaultValue('target') } = {}) => ({
  href,
  target,
});

const makeStory = (options) => (args, { argTypes }) => ({
  components: {
    GlLink,
  },
  props: Object.keys(argTypes),
  setup() {
    return { ...args };
  },
  ...options,
});

export const DefaultLink = makeStory({
  components: { GlLink },
  template: `
    <gl-link
      :href="href"
      :target="target"
    >
        This is a link
    </gl-link>`,
});
DefaultLink.args = generateProps();

export default {
  title: 'base/link',
  component: GlLink,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    target: {
      control: {
        type: 'select',
        options: targetOptions,
      },
    },
  },
};
