import lazyLoad from "./lazy_load.js";

export const BVComponents = lazyLoad(
  require.context(
    "bootstrap-vue/es/components",
    true,
    /^((?!index\.js|\.class\.js).)*\.js$/
  )
);

export const BVDirectives = lazyLoad(
  require.context(
    "bootstrap-vue/es/directives",
    true,
    /^((?!index\.js|\.class\.js).)*\.js$/
  )
);
