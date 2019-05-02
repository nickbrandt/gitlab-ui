import { configure, addParameters } from '@storybook/vue';
import { create } from '@storybook/theming';

const req = require.context('../components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'GitLab UI',
      brandImage: 'https://about.gitlab.com/images/press/logo/png/gitlab-logo-gray-rgb.png',
      brandUrl: 'https://gitlab.com/gitlab-org/gitlab-ui',
    }),
    isFullscreen: false,
    panelPosition: 'right',
  },
});

configure(loadStories, module);
