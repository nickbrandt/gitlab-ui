import { shallowMount, mount } from '@vue/test-utils';
import { BFormGroup } from 'bootstrap-vue';
import GlFormText from '../form_text/form_text.vue';
import GlFormGroup from './form_group.vue';

describe('Form group component', () => {
  let wrapper;

  const findDescription = () => {
    return wrapper.find('[data-testid="label-description"]');
  };

  const createComponent = (options, mountFn = shallowMount) => {
    wrapper = mountFn(GlFormGroup, {
      ...options,
    });
  };

  it.each`
    labelClass                      | expectedProp
    ${'additional-class'}           | ${'additional-class col-form-label'}
    ${['additional-class']}         | ${['additional-class', 'col-form-label']}
    ${{ 'additional-class': true }} | ${{ 'additional-class': true, 'col-form-label': true }}
    ${undefined}                    | ${'col-form-label'}
  `(
    'computed label class is $expectedProp when labelClass is $labelClass',
    ({ labelClass, expectedProp }) => {
      createComponent({
        propsData: {
          labelClass,
        },
      });

      expect(wrapper.findComponent(BFormGroup).props('labelClass')).toEqual(expectedProp);
    }
  );

  describe('description slot', () => {
    it('renders text when label-description prop is defined', () => {
      const labelDescription = 'description via props';

      createComponent(
        {
          propsData: {
            labelDescription,
          },
        },
        mount
      );

      expect(findDescription().text()).toBe(labelDescription);
    });

    it('renders a user provided label-description slot', () => {
      const labelDescription = 'description via slot';

      createComponent(
        {
          slots: {
            'label-description': 'description via slot',
          },
          stubs: {
            GlFormText,
          },
        },
        mount
      );

      expect(findDescription().text()).toBe(labelDescription);
    });
  });

  describe('label slot', () => {
    it('renders text when label prop is defined', () => {
      const label = 'label via props';

      createComponent(
        {
          propsData: {
            label,
          },
        },
        mount
      );

      expect(wrapper.text()).toBe(label);
    });

    it('renders a user provided label slot', () => {
      const label = 'label via slot';

      createComponent(
        {
          slots: {
            label: 'label via slot',
          },
          stubs: {
            GlFormText,
          },
        },
        mount
      );

      expect(wrapper.text()).toBe(label);
    });
  });
});
