import { shallowMount } from '@vue/test-utils';
import { BFormGroup } from 'bootstrap-vue';
import GlFormGroup from './form_group.vue';

describe('Form group component', () => {
  let wrapper;

  const createComponent = options => {
    wrapper = shallowMount(GlFormGroup, {
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

      expect(wrapper.find(BFormGroup).props('labelClass')).toEqual(expectedProp);
    }
  );
});
