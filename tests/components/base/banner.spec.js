import { shallowMount } from '@vue/test-utils';
import GlBanner from '../../../src/components/base/banner/banner.vue';
import GlButton from '../../../src/components/base/new_button/new_button.vue';

describe('banner component', () => {
  const propsData = {
    title: 'Test Title',
    buttonText: 'Button text',
    buttonLink: 'http://gitlab.com',
  };
  const svgPath = 'https://about.gitlab.com/images/press/logo/svg/gitlab-icon-rgb.svg';
  let wrapper;

  describe('Promotion', () => {
    describe('with only the required props', () => {
      beforeEach(() => {
        wrapper = shallowMount(GlBanner, {
          propsData,
        });
      });

      it('should render the correct title', () => {
        expect(wrapper.find('h1').text()).toEqual(propsData.title);
      });

      it('should render the button', () => {
        const button = wrapper.find(GlButton);

        expect(button.text()).toEqual(propsData.buttonText);
        expect(button.attributes('href')).toEqual(propsData.buttonLink);
      });

      it('should not render the illustration', () => {
        expect(wrapper.find('img').exists()).toBe(false);
      });

      it('should emit a `close` event after the close button is clicked', () => {
        expect(wrapper.emitted('close')).toBeFalsy();
        wrapper.find('.gl-banner-close').trigger('click');
        expect(wrapper.emitted('close')).toBeTruthy();
      });
    });

    describe('with image', () => {
      beforeEach(() => {
        wrapper = shallowMount(GlBanner, {
          propsData: { ...propsData, svgPath },
        });
      });

      it('should render the illustration', () => {
        expect(wrapper.find('img').exists()).toBe(true);
      });
    });
  });

  describe('Introduction', () => {
    beforeEach(() => {
      wrapper = shallowMount(GlBanner, {
        propsData: { ...propsData, variant: 'introduction' },
      });
    });

    it('should add the `gl-banner-introduction` class', () => {
      expect(wrapper.classes()).toContain('gl-banner-introduction');
    });
  });
});
