import { text, withKnobs, select } from '@storybook/addon-knobs';
import Vue from 'vue';
import GlTooltipDirective from '../../../directives/tooltip';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './avatar_labeled.md';
import { avatarSizeOptions, avatarShapeOptions, tooltipPlacements } from '../../../utils/constants';

Vue.directive('gl-tooltip', GlTooltipDirective);

function generateProps() {
  const props = {
    label: {
      type: String,
      default: text('label', 'GitLab User'),
    },
    subLabel: {
      type: String,
      default: text('subLabel', '@gitlab'),
    },
    size: {
      type: Number,
      default: select('size', avatarSizeOptions, 32),
    },
    shape: {
      type: String,
      default: select('shape', avatarShapeOptions, 'circle'),
    },
    src: {
      type: String,
      default: text(
        'src',
        'https://assets.gitlab-static.net/uploads/-/system/group/avatar/9970/logo-extra-whitespace.png?width=64'
      ),
    },
  };

  return props;
}

function generateTooltipProps() {
  const props = {
    tooltipText: {
      type: String,
      default: text('tooltipText', 'Avatar tooltip'),
    },
    placement: {
      type: String,
      default: select('placement', tooltipPlacements, 'top'),
    },
  };

  return props;
}

documentedStoriesOf('base|avatar/labeled', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    template: `
      <gl-avatar-labeled
        :shape="shape"
        :size="size"
        :src="src"
        :label="label"
        :sub-label="subLabel"
      />
    `,
  }))
  .add('with-tooltip', () => ({
    props: {
      ...generateProps(),
      ...generateTooltipProps(),
    },
    template: `
      <gl-avatar-labeled
        :shape="shape"
        :size="size"
        :src="src"
        :label="label"
        :sub-label="subLabel"
        :title="tooltipText"
        v-gl-tooltip="{ placement }"
      />
    `,
  }));
