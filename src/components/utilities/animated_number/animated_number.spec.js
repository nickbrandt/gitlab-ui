import { shallowMount } from '@vue/test-utils';
import GlAnimatedNumber from './animated_number.vue';
import { waitForAnimationFrame } from '~/utils/test_utils';

const duration = 2000;

describe('GlAnimatedNumber', () => {
  let wrapper;

  const createComponent = ({ number = 100, decimalPlaces = 0, animateOnMount = false } = {}) => {
    wrapper = shallowMount(GlAnimatedNumber, {
      propsData: {
        number,
        decimalPlaces,
        duration,
        animateOnMount,
      },
    });
  };

  it('renders the component', () => {
    createComponent();

    expect(wrapper.findComponent(GlAnimatedNumber).exists()).toBe(true);
  });

  describe('when animateOnMount is false', () => {
    describe.each`
      withDecimal | number   | updatedNumber | decimalPlaces | expectedInitialOnMount | expectedInitialOnUpdate
      ${false}    | ${100}   | ${200}        | ${0}          | ${'100'}               | ${'200'}
      ${true}     | ${100.2} | ${200.2}      | ${1}          | ${'100.2'}             | ${'200.2'}
    `(
      'withDecimal === $withDecimal',
      ({
        number,
        updatedNumber,
        decimalPlaces,
        expectedInitialOnMount,
        expectedInitialOnUpdate,
      }) => {
        beforeEach(() => {
          createComponent({ number, decimalPlaces });
        });

        it('displays the correct number on mount', async () => {
          await waitForAnimationFrame();

          expect(wrapper.text()).toBe(expectedInitialOnMount);
        });

        it('displays the correct number when updated', async () => {
          await waitForAnimationFrame();

          const {
            vm: { startTime },
          } = wrapper;

          await wrapper.setProps({ number: updatedNumber });

          await wrapper.vm.$nextTick();

          wrapper.setData({
            startTime: startTime - duration,
          });

          await waitForAnimationFrame();

          expect(wrapper.text()).toBe(expectedInitialOnUpdate);
        });
      }
    );
  });

  describe('when animateOnMount is true', () => {
    describe.each`
      withDecimal | number   | decimalPlaces | expectedInitial
      ${false}    | ${100}   | ${0}          | ${'0'}
      ${true}     | ${100.2} | ${1}          | ${'0.0'}
    `('withDecimal === $withDecimal', ({ number, decimalPlaces, expectedInitial }) => {
      beforeEach(() => {
        createComponent({ number, decimalPlaces, animateOnMount: true });
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
});
