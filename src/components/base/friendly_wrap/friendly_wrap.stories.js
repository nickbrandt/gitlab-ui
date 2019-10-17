import { withKnobs, text, array } from '@storybook/addon-knobs';
import documentedStoriesOf from '../../../utils/documented_stories';
import readme from './friendly_wrap.md';
import { GlFriendlyWrap } from '../../../../index';

const components = {
  GlFriendlyWrap,
};

documentedStoriesOf('base|friendly-wrap', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: {
      text: {
        default: text(
          'Text',
          '/lorem/ipsum/dolor/sit/amet/consectetur/adipiscing/elit/Aenean/tincidunt/urna/ac/tellus/cursus/laoreet/aenean/blandit/erat/vel/est/maximus/porta/Sed/id/nunc/non/sapien/cursus/ullamcorper'
        ),
      },
      symbols: {
        default: array('Symbols (space separated)', ['/'], ' '),
      },
    },
    components,
    template: '<gl-friendly-wrap :text="text" :symbols="symbols" />',
  }))
  .add('break-word', () => ({
    props: {
      text: {
        default: text(
          'Text',
          'LoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitamet'
        ),
      },
      symbols: {
        default: array('Symbols (space separated)', ['dolor'], ' '),
      },
    },
    components,
    template: '<gl-friendly-wrap :text="text" :symbols="symbols" />',
  }))
  .add('multiple symbols', () => ({
    props: {
      text: {
        default: text(
          'Text',
          'LoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitametLoremipsumdolorsitamet'
        ),
      },
      symbols: {
        default: array('Symbols (space separated)', ['e', 'o'], ' '),
      },
    },
    components,
    template: '<gl-friendly-wrap :text="text" :symbols="symbols" />',
  }));
