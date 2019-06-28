import { configure, addParameters, addDecorator } from '@storybook/vue';
import { create } from '@storybook/theming';

const req = require.context('../components', true, /\.stories\.js$/);

import '../styles/sb_specifics.css';
import '../scss/storybook.scss';

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

function addSbClass(c, a) {
  return {
    template: `<div id="${a.id}" class="sb-story"><story/></div>`,
  };
}

addDecorator(addSbClass);

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
