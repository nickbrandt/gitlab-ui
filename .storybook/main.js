module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport/register',
    'storybook-readme',
    './.storybook/gitlab-css-addon/register',
  ],
};
