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
  ...options,
});

export const Default = makeStory({
  components: { GlLink },
  template: `
    <gl-link
      :href="href"
      :target="target"
    >
        This is a link
    </gl-link>`,
});
Default.args = generateProps();

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
