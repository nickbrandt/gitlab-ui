import Vue from 'vue';
import { withKnobs, boolean, number } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../utils/documented_stories';
import { variantOptions } from '../utils/constants';
import readme from '../../documentation/skeleton_loading.md';

const template = '<gl-skeleton-loading :small="small" :lines="lines" />';

function generateProps({
} = {}) {
  return {
    small: {
      type: Boolean,
      default: boolean('small', false),
    },
    lines: {
      type: Number,
      default: number('lines', 3, {
        range: true,
        min: 1,
        max: 3,
        step: 1,
      }),
    }
  };
}

documentedStoriesOf('skeleton-loading', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    template,
  }));
