process.env.STORYBOOK_VUE_VERSION = '3';

require('./patch_resolve')({
  'vue/': '@vue/compat/',
});
require('@storybook/vue3/dist/cjs/server/build');
