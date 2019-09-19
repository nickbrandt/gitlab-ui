import { configure, addParameters, addDecorator } from '@storybook/vue';
import { create } from '@storybook/theming';

const req = require.context('../components', true, /\.stories\.js$/);
const docsRequireCtx = require.context('../components', true, /documentation\.js$/);
const testableStories = process.env.IS_GITLAB_INTEGRATION_TEST
  ? docsRequireCtx.keys().reduce((acc, key) => {
      const docModule = docsRequireCtx(key).default;
      if (docModule.followsDesignSystem) {
        acc.push(key.replace('documentation', 'stories'));
      }
      return acc;
    }, [])
  : req.keys();

import '../scss/gitlab_ui.scss';

function loadStories() {
  testableStories.forEach(filename => req(filename));
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
