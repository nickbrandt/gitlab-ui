import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlForm } from '../../../../index';
import readme from './form.md';

const components = {
  GlForm,
};

documentedStoriesOf('base/form/form', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template: `
      <gl-form />
    `,
  }));
