import { configure, storiesOf } from '@storybook/vue';
import { setOptions } from '@storybook/addon-options';

const req = require.context('../stories/base', true, /js$/);
const examples = require.context('../components/base', true, /\/examples\/.*\.vue$/);

function makeStoriesFromExamples(examples) {
  examples.keys().forEach(filename => {
    const component = examples(filename);
    storiesOf(filename, module).add('default', () => component.default);
  });
}

function loadStories() {
  makeStoriesFromExamples(examples);
  req.keys().forEach(filename => req(filename));
}

setOptions({
  name: 'gitlab-ui',
  url: 'https://gitlab.com/gitlab-org/gitlab-ui',
  addonPanelInRight: true,
});

configure(loadStories, module);
