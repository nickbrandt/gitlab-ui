import { withKnobs, select } from '@storybook/addon-knobs';
import Vue from 'vue';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlToast } from '../../../../index';
import readme from './toast.md';

Vue.use(GlToast);

const variants = ['', 'success', 'info', 'warning', 'danger'];

const generateProps = () => ({
  variant: {
    default: select('variant', variants, null),
  },
});

function generateDefault() {
  return () => ({
    template: `<gl-button @click="showToast()">Show default toast</gl-button>`,
    props: generateProps(),
    methods: {
      showToast() {
        const { variant } = this;
        this.$toast.show(`This is the ${variant || 'default'} toast.`, {
          variant,
        });
      },
    },
    mounted() {
      this.showToast();
    },
  });
}

function generateWithActions() {
  return () => ({
    template: `<gl-button @click="showToast()">Show toast with actions</gl-button>`,
    props: generateProps(),
    methods: {
      showToast() {
        this.$toast.show('This is a toast with an action.', {
          variant: this.variant,
          action: {
            text: 'Undo',
            onClick: () => {},
          },
        });
      },
    },
    mounted() {
      this.showToast();
    },
  });
}

function generateLong() {
  return () => ({
    template: `<gl-button @click="showToast()">Show toast with a long content</gl-button>`,
    props: generateProps(),
    methods: {
      showToast() {
        this.$toast.show(
          'This is a toast with a long content and an action. Notice how the text wraps to multiple lines when the max-width is reached.',
          {
            variant: this.variant,
            action: {
              text: 'Undo action',
              onClick: () => {},
            },
          }
        );
      },
    },
    mounted() {
      this.showToast();
    },
  });
}

documentedStoriesOf('base/toast', readme)
  .addDecorator(withKnobs)
  .add('default', generateDefault())
  .add('with actions', generateWithActions())
  .add('with long content', generateLong());
