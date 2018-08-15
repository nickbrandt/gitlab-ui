import { configure } from '@storybook/vue';

import Vue from 'vue';

// Import your custom components.
import pagination from '../components/base/pagination.vue';
import progressBar from '../components/base/progress_bar.vue';

// Register custom components.
Vue.component('gl-pagination', pagination);
Vue.component('gl-progress-bar', progressBar);

function loadStories() {
  // You can require as many stories as you need.
  require('../stories');
  require('../stories/pagination.js');
}

configure(loadStories, module);
