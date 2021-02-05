import { shallowMount } from '@vue/test-utils';
import { tooltipActionEvents } from '../../../utils/constants';
import GlTooltip from './tooltip.vue';

describe('GlTooltip', () => {
  let wrapper;

  const createWrapper = () => {
    wrapper = shallowMount(GlTooltip, {
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
    ${tooltipActionEvents.open}
    ${tooltipActionEvents.open}
    ${tooltipActionEvents.disable}
    ${tooltipActionEvents.enable}
  `('passes through the $event event to the bvTooltip instance', ({ event }) => {
    wrapper.vm.$emit(event);

    expect(findBVTooltip().emitted(event)).toHaveLength(1);
  });
});
