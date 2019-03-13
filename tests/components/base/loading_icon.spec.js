import { shallowMount } from '@vue/test-utils';
import LoadingIcon from '../../../components/base/loading_icon/loading_icon.vue';

describe('loading icon component', () => {
  const mountWithOptions = shallowMount.bind(null, LoadingIcon);

  describe('display', () => {
    it('should render as a block by default', () => {
      const component = mountWithOptions({});
      expect(component.vm.$el.tagName).toEqual('DIV');
    });

    it('should render inline using prop', () => {
      const component = mountWithOptions({
        propsData: {
          inline: true,
        },
      });
      expect(component.vm.$el.tagName).toEqual('SPAN');
    });
  });

  describe('css class', () => {
    it('should render the spinner css class by default', () => {
      const component = mountWithOptions({});

      expect(component.vm.$el.querySelector('span').classList.contains('spinner')).toEqual(true);
    });

    it('should render spinner-lg css class', () => {
      const component = mountWithOptions({
        propsData: {
          size: 'lg',
        },
      });

      expect(component.vm.$el.querySelector('span').classList.contains('spinner')).toEqual(true);
      expect(component.vm.$el.querySelector('span').classList.contains('spinner-lg')).toEqual(true);
    });

    it('should render spinner-md and dark css class', () => {
      const component = mountWithOptions({
        propsData: {
          size: 'md',
          color: 'dark',
        },
      });

      expect(component.vm.$el.querySelector('span').classList.contains('spinner')).toEqual(true);
      expect(component.vm.$el.querySelector('span').classList.contains('spinner-md')).toEqual(true);
      expect(component.vm.$el.querySelector('span').classList.contains('spinner-dark')).toEqual(
        true
      );
    });
  });

  describe('aria label', () => {
    it('should default to loading', () => {
      const component = mountWithOptions({});
      expect(component.vm.$el.querySelector('span').getAttribute('aria-label')).toEqual('Loading');
    });

    it('should change using prop', () => {
      const label = 'label';
      const component = mountWithOptions({
        propsData: {
          label,
        },
      });

      expect(component.vm.$el.querySelector('span').getAttribute('aria-label')).toEqual(label);
    });
  });
});
