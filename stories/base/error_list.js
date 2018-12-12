import { withKnobs } from '@storybook/addon-knobs/vue';
import documentedStoriesOf from '../utils/documented_stories';
import readme from '../../components/base/error_list/error_list.md';
import { GlErrorList } from '../../index';
import mockData from '../../components/base/error_list/examples/mock_data';

const components = {
  GlErrorList,
};

documentedStoriesOf('base|error list', readme)
  .addDecorator(withKnobs)
  .add('default list', () => ({
    props: {},
    data() {
      return {
        errors: mockData,
      };
    },
    components,
    template: `<gl-error-list :errors="errors"></gl-error-list>`,
  }));
