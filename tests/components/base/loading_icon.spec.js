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

  describe('legacy sizes', () => {
    const findSpinnerEl = component => component.find('span');
    const getSpinnerClasses = component => findSpinnerEl(component).classes();

    it('should warn if legacy sizes are used', () => {
      const deprecationWarning =
        "Icon sizes 1 - 5 are deprecated, please use 'sm', 'md' and 'lg' instead.";
      const legacySize = 3;

      console.warn = jest.fn(); // eslint-disable-line no-console
      mountWithOptions({ propsData: { size: legacySize } });

      expect(console.warn).toHaveBeenCalledWith(deprecationWarning); // eslint-disable-line no-console

      console.warn.mockReset(); // eslint-disable-line no-console
    });

    it('should handle an invalid size', () => {
      const invalidSize = 6;

      console.error = jest.fn(); // eslint-disable-line no-console

      const component = mountWithOptions({ propsData: { size: invalidSize } });
      const spinnerClasses = getSpinnerClasses(component);

      expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console

      // default size as fallback
      expect(spinnerClasses).toContain('spinner');
      expect(spinnerClasses).toContain('spinner-sm');

      console.warn.mockReset(); // eslint-disable-line no-console
    });

    it('should convert size of 1 to "sm"', () => {
      const legacySize = 1;
      const component = mountWithOptions({ propsData: { size: legacySize } });
      const spinnerClasses = getSpinnerClasses(component);

      expect(spinnerClasses).toContain('spinner');
      expect(spinnerClasses).toContain('spinner-sm');
    });

    it('should convert size of 2 or 3 to "md"', () => {
      const legacySizes = [2, 3];

      legacySizes.forEach(legacySize => {
        const component = mountWithOptions({ propsData: { size: legacySize } });
        const spinnerClasses = getSpinnerClasses(component);

        expect(spinnerClasses).toContain('spinner');
        expect(spinnerClasses).toContain('spinner-md');
      });
    });

    it('should convert size of 4 or 5 to "lg"', () => {
      const legacySizes = [4, 5];

      legacySizes.forEach(legacySize => {
        const component = mountWithOptions({ propsData: { size: legacySize } });
        const spinnerClasses = getSpinnerClasses(component);

        expect(spinnerClasses).toContain('spinner');
        expect(spinnerClasses).toContain('spinner-lg');
      });
    });
  });
});
