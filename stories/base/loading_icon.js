import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import documentedStoriesOf from '../utils/documented_stories';
import readme from '../../components/base/loading_icon/loading_icon.md';
import { GlLoadingIcon } from '../../index';

const components = {
  GlLoadingIcon,
};

const template = `
  <gl-loading-icon
    :label="label"
    :size="size"
    :inline="inline"
    :color="color"
  />
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
          sm: 'sm',
          md: 'md',
          lg: 'lg',
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
