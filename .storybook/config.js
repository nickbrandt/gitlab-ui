import { configure } from "@storybook/vue";

import Vue from "vue";

// Import your custom components.
import Pagination from '../components/base/pagination.vue';
import progressBar from '../components/base/progress_bar.vue';

// Register custom components.
Vue.component('gl-pagination', Pagination);
Vue.component('gl-progress-bar', progressBar);

function loadStories() {
  // You can require as many stories as you need.
  require('../stories/pagination.js');
  require('../stories/progress_bar.js');
}

configure(loadStories, module);
