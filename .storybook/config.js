import { configure } from "@storybook/vue";

import Vue from "vue";

import lazyLoad from "../helpers/lazy_load.js";
import { BVComponents, BVDirectives } from "../helpers/load_bootstrap_vue.js";

const customComponents = lazyLoad(
  require.context("../components", true, /\.vue$/)
);

const allComponents = Object.assign({}, BVComponents, customComponents);

// Register all Vue Components
for (const component in allComponents) {
  Vue.component(`gl-${component}`, allComponents[component]);
}

for (const directive in BVDirectives) {
  Vue.directive(`gl-${directive}`, BVDirectives[directive]);
}

const stories = lazyLoad.bind(
  null,
  require.context("../stories", true, /\.js$/)
);

configure(stories, module);
