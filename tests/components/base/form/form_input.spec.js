import { shallowMount } from '@vue/test-utils';
import GlFormInput from '../../../../components/base/form/form_input/form_input.vue';

describe('form input component', () => {
  const mountWithOptions = shallowMount.bind(null, GlFormInput);
  describe('when aria-label is missing', () => {
    it('should set aria-label to placeholder value when provided', () => {
      const input = mountWithOptions({
        attrs: {
          placeholder: 'placeholder',
        },
      });

      expect(input.attributes('aria-label')).toBe('placeholder');
    });

    it('should not set aria-label if no placeholder provided', () => {
      const input = mountWithOptions({
        attrs: {},
      });

      expect(input.attributes('aria-label')).toBe(undefined);
    });
  });

  describe('when aria-label is provided', () => {
    it('should set aria-label to correct value', () => {
      const input = mountWithOptions({
        attrs: {
          'aria-label': 'aria',
        },
      });

      expect(input.attributes('aria-label')).toBe('aria');
    });

    it('should respect aria-label value over placeholder', () => {
      const input = mountWithOptions({
        attrs: {
          'aria-label': 'aria',
          placeholder: 'placeholder',
        },
      });

      expect(input.attributes('aria-label')).toBe('aria');
    });
  });
});
