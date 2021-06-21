const USE_VUE_3 = process.env.VUE_VERSION === '3';
const VUE_JEST_TRANSFORMER = USE_VUE_3 ? 'vue-jest-vue3' : 'vue-jest';

const customModuleNameMappers = {};

if (USE_VUE_3) {
  Object.assign(customModuleNameMappers, {
    '^vue$': '@vue/compat',
    '^@vue/test-utils$': '@vue/test-utils-vue3',
  });
}

module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^@gitlab/ui$': '<rootDir>/index.js',
    '\\.(css|scss|less)$': 'identity-obj-proxy',
    ...customModuleNameMappers,
  },
  modulePathIgnorePatterns: ['cypress/integration', '.cypress_cache'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.example.(vue)$': VUE_JEST_TRANSFORMER,
    '.*\\.(vue)$': VUE_JEST_TRANSFORMER,
    '\\.(svg|html)$': 'jest-raw-loader',
    '^.+\\.md?$': 'markdown-loader-jest',
  },
  transformIgnorePatterns: [
    '/node_modules(?![\\\\/]bootstrap-vue[\\\\/]|(/@storybook/.*\\.vue$)|(/@gitlab/svgs/))/',
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest_setup.js'],
};
