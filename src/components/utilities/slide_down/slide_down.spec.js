import { shallowMount } from '@vue/test-utils';
import SlideDown from './slide_down.vue';

describe('slide-down component', () => {
  const mountWithOptions = shallowMount.bind(null, SlideDown);

  describe('default settings', () => {
    let slideDown;

    beforeEach(() => {
      slideDown = mountWithOptions({});
    });

    it('should exist', () => {
      expect(slideDown.exists()).toBeTruthy();
    });
  });
});
