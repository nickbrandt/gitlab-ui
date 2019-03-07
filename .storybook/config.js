import { configure, addParameters } from '@storybook/vue';
import { create } from '@storybook/theming';

const req = require.context('../stories', true, /js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'gitlab-ui',
      brandUrl: 'https://gitlab.com/gitlab-org/gitlab-ui',
    }),
    isFullscreen: false,
    panelPosition: 'right',
  },
});

configure(loadStories, module);
