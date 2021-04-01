import { withKnobs, text, select } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlLink } from '../../../../index';
import { targetOptions } from '../../../utils/constants';
import readme from './link.md';

const generateProps = ({ 
  href = '#'
} = {}) => ({
  href,
  target
});

export const Default = () => ({
  components: { GlLink },
  template: `
    <gl-link
      :href="href"
      :target="target"
    >
        This is a link
    </gl-link>`,
});

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
};
