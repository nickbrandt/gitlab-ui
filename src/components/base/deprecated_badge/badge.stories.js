import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './badge.md';

const template = `
  <div>
    <gl-deprecated-badge variant="primary">Testbadge</gl-deprecated-badge>
  </div>
  `;

documentedStoriesOf('base|deprecated-badge', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    template,
  }));
