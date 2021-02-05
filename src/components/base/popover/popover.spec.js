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

  const findBVPopover = () => wrapper.findComponent({ ref: 'bPopover' });

  beforeEach(() => {
    createWrapper();
  });

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it.each(tooltipActionEvents)(
    'passes through the %s event to the bvPopover instance',
    (event) => {
      wrapper.vm.$emit(event);

      expect(findBVPopover().emitted(event)).toHaveLength(1);
    }
  );
});
