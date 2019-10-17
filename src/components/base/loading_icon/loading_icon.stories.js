import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './loading_icon.md';
import { GlLoadingIcon } from '../../../../index';

const components = {
  GlLoadingIcon,
};

const template = `
  <div :class="['p-2', 'rounded', { 'bg-dark' : color === 'light' } ]" >
    <gl-loading-icon
      :label="label"
      :size="size"
      :inline="inline"
      :color="color"
    />
  </div>
`;

function generateProps({ inline } = {}) {
  return {
    label: {
      type: String,
      default: text('aria label'),
    },
    size: {
      type: String,
      default: select(
        'size',
        {
          'sm (16x16)': 'sm',
          'md (24x24)': 'md',
          'lg (32x32)': 'lg',
          'xl (64x64)': 'xl',
        },
        'sm'
      ),
    },
    color: {
      type: String,
      default: select(
        'color',
        {
          orange: 'orange',
          dark: 'dark',
          light: 'light',
        },
        'orange'
      ),
    },
    inline: {
      type: Boolean,
      default: boolean('inline', inline),
    },
  };
}

documentedStoriesOf('base|loading-icon', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template,
  }))
  .add('inline', () => ({
    props: generateProps({
      inline: true,
    }),
    components,
    template,
  }));
