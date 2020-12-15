import { mount, shallowMount } from '@vue/test-utils';
import Tabs from './tabs.vue';

const GltButtonStub = {
  template: `<div><slot></slot></div>`,
};

describe('tabs component', () => {
  let wrapper;

  const buildTabs = (props = {}, mountFn = shallowMount, options = {}) => {
    wrapper = mountFn(Tabs, {
      propsData: {
        ...props,
      },
      ...options,
    });
  };

  const findNav = () => wrapper.find('.gl-tabs-nav');
  const findContent = () => wrapper.find('.gl-tab-content');

  describe('nav', () => {
    it('should have class "gl-tabs-nav"', () => {
      buildTabs({}, mount);
      expect(findNav().exists()).toBe(true);
    });

    it.each`
      type        | navClass
      ${'string'} | ${'my-nav-class my-nav-class-2'}
      ${'array'}  | ${['my-nav-class', 'my-nav-class-2']}
      ${'object'} | ${{ 'my-nav-class': true, 'my-nav-class-2': true }}
    `('should have custom $type classes', ({ navClass }) => {
      buildTabs({ navClass }, mount);

      expect(findNav().classes('my-nav-class')).toBe(true);
      expect(findNav().classes('my-nav-class-2')).toBe(true);
    });
  });

  describe('content', () => {
    it('should have class "gl-tab-content"', () => {
      buildTabs({}, mount);
      expect(findContent().exists()).toBe(true);
    });

    it.each`
      type        | contentClass
      ${'string'} | ${'my-class my-class-2'}
      ${'array'}  | ${['my-class', 'my-class-2']}
      ${'object'} | ${{ 'my-class': true, 'my-class-2': true }}
    `('should have custom $type classes', ({ contentClass }) => {
      buildTabs({ contentClass }, mount);

      expect(findContent().classes('my-class')).toBe(true);
      expect(findContent().classes('my-class-2')).toBe(true);
    });
  });

  describe('slots', () => {
    it.only('should have class "gl-tab-content"', async () => {
      const actionPrimary = { text: 'Action!' };

      buildTabs({ actionPrimary }, mount, {
        stubs: { GlButton: GltButtonStub },
      });

      await wrapper.vm.$nextTick();
      console.log(wrapper.html());

      expect(wrapper.find('.my-slot').exists()).toBe(true);
    });
  });
});
