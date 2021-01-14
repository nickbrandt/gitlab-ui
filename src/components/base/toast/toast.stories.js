import Vue from 'vue';
import readme from './toast.md';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlToast } from '../../../../index';

Vue.use(GlToast);

function generateDefault() {
  return () => ({
    template: `<gl-button @click="showToast()">Show default toast</gl-button>`,
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
    template: `<gl-button @click="showToast()">Show toast with actions</gl-button>`,
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
    template: `<gl-button @click="showToast()">Show toast with a long content</gl-button>`,
    methods: {
      showToast() {
        this.$toast.show(
          'This is a toast with a long content, an action, and <a href="https://gitlab-org.gitlab.io/gitlab-ui/?path=/story/base-toast--with-long-content">a link</a>. Notice how the text wraps to multiple lines when the max-width is reached.',
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

documentedStoriesOf('base/toast', readme)
  .add('default', generateDefault())
  .add('with actions', generateWithActions())
  .add('with long content', generateLong());
