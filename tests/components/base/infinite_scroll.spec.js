import throttle from 'lodash/throttle';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import InfiniteScroll from '../../../src/components/base/infinite_scroll/infinite_scroll.vue';

jest.mock('lodash/throttle', () => jest.fn(fn => fn));

const localVue = createLocalVue();

describe('Infinite Scroll component', () => {
  let wrapper;
  const propsData = {
    fetchedItems: 2,
    totalItems: 10,
  };
  const createComponent = (props = propsData) => {
    wrapper = shallowMount(InfiniteScroll, {
      localVue,
      propsData: props,
      attachToDocument: true,
    });
  };

  afterEach(() => {
    wrapper.destroy();
    throttle.mockClear();
  });

  it('emits bottomReached when scrolled to the bottom', () => {
    createComponent();
    wrapper.find({ ref: 'infiniteContainer' }).trigger('scroll');
    expect(wrapper.emitted('bottomReached')).toBeTruthy();
  });

  it('displays the given number of items fetched and the total items', () => {
    createComponent();
    expect(wrapper.text()).toContain('Showing 2 of 10 items');
  });
});
