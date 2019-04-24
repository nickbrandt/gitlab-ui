import Vue from 'vue';
import readme from '../../components/base/toast/toast.md';
import documentedStoriesOf from '../utils/documented_stories';
import { GlToast } from '../../index';

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

documentedStoriesOf('base|toast', readme)
  .add('default', generateDefault())
  .add('with actions', generateWithActions());
