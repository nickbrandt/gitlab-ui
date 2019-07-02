import { withKnobs } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './card.md';

const defaultTemplate = `
  <div>
    <gl-card title="Some title" sub-title="Some subtitle" footer="Some footer">Some content</gl-card>
  </div>
  `;

function generateCardProps() {
  const props = {
    // TODO - Add props
  };

  return props;
}

documentedStoriesOf('base|card', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateCardProps(),
    template: defaultTemplate,
  }));
