import { configure, addParameters, addDecorator } from '@storybook/vue';
import { create } from '@storybook/theming';
import { withA11y } from '@storybook/addon-a11y';

const storiesRequireContext = require.context('../src', true, /\.stories\.js$/);
const docsRequireCtx = require.context('../src', true, /documentation\.js$/);
const stylesheetsRequireCtx = require.context('../src/scss', true, /(storybook|bootstrap)\.scss$/);

const testableStories = process.env.IS_GITLAB_INTEGRATION_TEST
  ? docsRequireCtx.keys().reduce((acc, key) => {
      const docModule = docsRequireCtx(key).default;
      if (docModule.followsDesignSystem) {
        acc.push(key.replace('documentation', 'stories'));
      }
      return acc;
    }, [])
  : storiesRequireContext.keys();

if (!process.env.IS_GITLAB_INTEGRATION_TEST) {
  stylesheetsRequireCtx('./bootstrap.scss');
}

stylesheetsRequireCtx('./storybook.scss');

function loadStories() {
  testableStories.forEach(storiesRequireContext);
}

function addSbClass(c, a) {
  return {
    template: `<div id="${a.id}" class="sb-story"><story/></div>`,
  };
}

addDecorator(addSbClass);
addDecorator(withA11y);

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
  a11y: {
    element: '.story-container',
  },
});

configure(loadStories, module);
