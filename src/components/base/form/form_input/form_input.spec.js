import { shallowMount } from '@vue/test-utils';
import GlFormInput from './form_input.vue';
import { formInputSizes } from '../../../../utils/constants';

describe('GlFormInput', () => {
  let wrapper;

  const createComponent = propsData => {
    wrapper = shallowMount(GlFormInput, {
      propsData,
    });
  };

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  describe('size prop', () => {
    // Exclude the default null value
    const sizes = Object.values(formInputSizes).filter(Boolean);

    it.each(sizes)('adds correct class for size %s', size => {
      createComponent({ size });

      expect(wrapper.classes()).toEqual(['gl-form-input', `gl-form-input-${size}`]);
    });

    it('does not add a size class if not given the size prop', () => {
      createComponent();

      expect(wrapper.classes()).toEqual(['gl-form-input']);
    });

    it('does not add a size class if passed null', () => {
      createComponent({ size: null });

      expect(wrapper.classes()).toEqual(['gl-form-input']);
    });
  });
});
