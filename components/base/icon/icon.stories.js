import { withKnobs, select } from '@storybook/addon-knobs';
import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './icon.md';
import { GlIcon } from '../../../index';

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
        type: String,
        default: select('size', [8, 10, 12, 14, 16, 18, 24, 32, 48, 72], 32),
      },
    },
    components,
    template: `
      <gl-icon
        :name="name"
        :size="size"
      />`,
  }));
