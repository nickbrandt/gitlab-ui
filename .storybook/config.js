import { configure, addParameters, addDecorator } from '@storybook/vue';
import { create } from '@storybook/theming';
import { withA11y } from '@storybook/addon-a11y';

const componentsRequireContext = require.context('../components', true, /\.stories\.js$/);
const docsRequireCtx = require.context('../components', true, /documentation\.js$/);
const directivesRequireContext = require.context('../directives', true, /\.stories\.js$/);
const stylesheetsRequireCtx = require.context('../scss', true, /(storybook|bootstrap)\.scss$/);

const testableStories = process.env.IS_GITLAB_INTEGRATION_TEST
  ? docsRequireCtx.keys().reduce((acc, key) => {
      const docModule = docsRequireCtx(key).default;
      if (docModule.followsDesignSystem) {
        acc.push(key.replace('documentation', 'stories'));
      }
      return acc;
    }, [])
  : componentsRequireContext.keys();

if (!process.env.IS_GITLAB_INTEGRATION_TEST) {
  stylesheetsRequireCtx('./bootstrap.scss');
}

stylesheetsRequireCtx('./storybook.scss');

function loadStories() {
  testableStories.forEach(componentsRequireContext);
  // directives are excluded from visual snapshot testing for now
  // more information: https://gitlab.com/gitlab-org/gitlab-ui/merge_requests/810#note_229554541
  directivesRequireContext.keys().forEach(directivesRequireContext);
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
});

configure(loadStories, module);
