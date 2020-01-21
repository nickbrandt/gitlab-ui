import { withKnobs, select } from '@storybook/addon-knobs';
import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './icon.md';
import { GlIcon } from '../../../../index';
import { iconSizeOptions } from '../../../utils/constants';

const components = {
  GlIcon,
};

documentedStoriesOf('base|icon', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {
      name: {
        type: String,
        default: select('name', iconSpriteInfo.icons, 'check-circle'),
      },
      size: {
        type: Number,
        default: select('size', iconSizeOptions, 32),
      },
    },
    components,
    template: `
      <gl-icon
        :name="name"
        :size="size"
      />`,
  }));
