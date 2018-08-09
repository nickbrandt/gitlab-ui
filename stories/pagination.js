import { storiesOf } from '@storybook/vue';

storiesOf('pagination', module)
  .add('default', () => ({
    template: '<gl-pagination :total-rows="100" :per-page="10" />'
  }))
  .add('small', () => ({
    template: '<gl-pagination size="sm" :total-rows="100" :per-page="10" />'
  }))
  .add('large', () => ({
    template: '<gl-pagination size="lg" :total-rows="100" :per-page="10" />'
  }))
