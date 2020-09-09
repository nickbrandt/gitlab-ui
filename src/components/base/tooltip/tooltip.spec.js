import { shallowMount } from '@vue/test-utils';
import Tooltip from './tooltip.vue';

describe('tooltip', () => {
  let wrapper;

  const createWrapper = () => {
    wrapper = shallowMount(Tooltip, {
      propsData: {
        target: document.body,
      },
    });
  };

  const findBVTooltip = () => wrapper.find({ ref: 'bvTooltip' });

  beforeEach(() => {
    createWrapper();
  });

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it.each`
    event
    ${'open'}
    ${'close'}
    ${'disable'}
    ${'enable'}
  `('passes through the $event event to the bvTooltip instance', ({ event }) => {
    wrapper.vm.$emit(event);

    expect(findBVTooltip().emitted(event)).toHaveLength(1);
  });
});
