import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './keyset_pagination.md';
import GlKeysetPagination from './keyset_pagination.vue';

const components = {
  GlKeysetPagination,
};

function generateProps() {
  return {
    hasPreviousPage: {
      type: Boolean,
      default: boolean('hasPreviousPage', false),
    },
    hasNextPage: {
      type: Boolean,
      default: boolean('hasNextPage', true),
    },
    startCursor: {
      type: String,
      default: text(
        'startCursor',
        'eyJpZCI6IjE3NTg1ODciLCJyZWxlYXNlZF9hdCI6IjIwMjAtMDgtMjAgMTQ6NDc6MDguNTQ1MjE1MDAwIFVUQyJ9'
      ),
    },
    endCursor: {
      type: String,
      default: text(
        'endCursor',
        'eyJpZCI6IjEyNjcxNzkiLCJyZWxlYXNlZF9hdCI6IjIwMjAtMDItMTkgMjE6MDA6MDUuODU5NTQ2MDAwIFVUQyJ9'
      ),
    },
    prevText: {
      type: String,
      default: text('prevText'),
    },
    nextText: {
      type: String,
      default: text('nextText'),
    },
    prevButtonLink: {
      type: String,
      default: text('prevButtonLink'),
    },
    nextButtonLink: {
      type: String,
      default: text('nextButtonLink'),
    },
    disabled: {
      type: Boolean,
      default: boolean('disabled', false),
    },
  };
}

documentedStoriesOf('base/keyset-pagination', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps(),
    template: `
      <gl-keyset-pagination v-bind="$props"/>
    `,
  }));
