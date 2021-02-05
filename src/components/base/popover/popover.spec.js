import { shallowMount } from '@vue/test-utils';
import { tooltipActionEvents } from '../../../utils/constants';
import GlPopover from './popover.vue';

describe('GlPopover', () => {
  let wrapper;

  const createWrapper = () => {
    wrapper = shallowMount(GlPopover, {
      propsData: {
        target: document.body,
      },
    });
  };

  const findBVPopover = () => wrapper.find({ ref: 'bPopover' });

  beforeEach(() => {
    createWrapper();
  });

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it.each`
    event
    ${tooltipActionEvents.open}
    ${tooltipActionEvents.open}
    ${tooltipActionEvents.disable}
    ${tooltipActionEvents.enable}
  `('passes through the $event event to the bvPopover instance', ({ event }) => {
    wrapper.vm.$emit(event);

    expect(findBVPopover().emitted(event)).toHaveLength(1);
  });
});
