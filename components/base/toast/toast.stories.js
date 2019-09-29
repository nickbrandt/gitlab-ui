import Vue from 'vue';
import readme from './toast.md';
import documentedStoriesOf from '../../../utils/documented_stories';
import { GlToast } from '../../../index';

Vue.use(GlToast);

function generateDefault() {
  return () => ({
    template: `<gl-new-button @click="showToast()">Show default toast</gl-new-button>`,
    methods: {
      showToast() {
        this.$toast.show('This is the default toast.');
      },
    },
    mounted() {
      this.showToast();
    },
  });
}

function generateWithActions() {
  return () => ({
    template: `<gl-new-button @click="showToast()">Show toast with actions</gl-new-button>`,
    methods: {
      showToast() {
        this.$toast.show('This is a toast with an action.', {
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
    template: `<gl-new-button @click="showToast()">Show toast with a long content</gl-new-button>`,
    methods: {
      showToast() {
        this.$toast.show(
          'This is a toast with a long content and an action. Notice how the text wraps to multiple lines when the max-width is reached.',
          {
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

documentedStoriesOf('base|toast', readme)
  .add('default', generateDefault())
  .add('with actions', generateWithActions())
  .add('with long content', generateLong());
