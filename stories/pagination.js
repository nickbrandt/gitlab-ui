import { storiesOf } from '@storybook/vue';

const data = () => {
  return {
    currentPage: 3
  }
}

storiesOf('pagination/with navigation', module)
  .add('using link generator', () => ({
    data,
    template: '<gl-pagination :link-gen="pageNum => `#`" :number-of-pages="20" :value="currentPage" />'
  }))

storiesOf('pagination/without navigation', module)
  .add('default', () => ({
    data,
    template: '<gl-pagination :navOnChange="false" :total-rows="100" :per-page="10" :value="currentPage" />'
  }))
  .add('small', () => ({
    data,
    template: '<gl-pagination :navOnChange="false" size="sm" :total-rows="100" :per-page="10" :value="currentPage" />'
  }))
  .add('large', () => ({
    data,
    template: '<gl-pagination size="lg" :navOnChange="false" :total-rows="100" :per-page="10" :value="currentPage" />'
  }));
