import { configure } from "@storybook/vue";

import Vue from "vue";

import lazyLoad from "../helpers/lazy_load.js";

const bootstrapComponents = lazyLoad(
  require.context(
    "bootstrap-vue/es/components",
    true,
    /^((?!index\.js|\.class\.js).)*\.js$/
  )
);

const customComponents = lazyLoad(
  require.context("../components", true, /\.vue$/)
);

const allComponents = Object.assign(bootstrapComponents, customComponents);

// Register all Vue Components
for (const component in allComponents) {
  Vue.component(`gl-${component}`, allComponents[component]);
}

const stories = lazyLoad.bind(
  null,
  require.context("../stories", true, /\.js$/)
);

configure(stories, module);
