import { shallowMount } from '@vue/test-utils';
import GlAnimatedNumber from './animated_number.vue';
import { waitForAnimationFrame } from '~/utils/test_utils';

const duration = 2000;

describe('GlAnimatedNumber', () => {
  let wrapper;

  const createComponent = ({ number = 100, decimalPlaces = 0 } = {}) => {
    wrapper = shallowMount(GlAnimatedNumber, {
      propsData: {
        number,
        decimalPlaces,
        duration,
      },
    });
  };

  it('renders the component', () => {
    createComponent();

    expect(wrapper.findComponent(GlAnimatedNumber).exists()).toBe(true);
  });

  describe.each`
    withDecimal | number   | decimalPlaces | expectedInitial
    ${false}    | ${100}   | ${0}          | ${'0'}
    ${true}     | ${100.2} | ${1}          | ${'0.0'}
  `('withDecimal === $withDecimal', ({ number, decimalPlaces, expectedInitial }) => {
    beforeEach(() => {
      createComponent({ number, decimalPlaces });
    });

    it('displays the correct intial number', () => {
      expect(wrapper.text()).toBe(expectedInitial);
    });

    it('displays the correct end number', async () => {
      await waitForAnimationFrame();

      const {
        vm: { startTime },
      } = wrapper;

      wrapper.setData({
        startTime: startTime - duration,
      });

      await waitForAnimationFrame();

      expect(wrapper.text()).toBe(`${number}`);
    });
  });
});
