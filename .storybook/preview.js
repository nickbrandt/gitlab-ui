import { addParameters, addDecorator } from '@storybook/vue';
import { withA11y } from '@storybook/addon-a11y';
import { addReadme } from 'storybook-readme/vue';

const stylesheetsRequireCtx = require.context('../src/scss', true, /(storybook|bootstrap)\.scss$/);

if (!process.env.IS_GITLAB_INTEGRATION_TEST) {
  stylesheetsRequireCtx('./bootstrap.scss');
}

stylesheetsRequireCtx('./storybook.scss');

function addSbClass(c, a) {
  return {
    template: `<div id="${a.id}" class="sb-story"><story/></div>`,
  };
}

addDecorator(addSbClass);
addDecorator(withA11y);
addDecorator(addReadme);

addParameters({
  a11y: {
    element: '.story-container',
  },
});
