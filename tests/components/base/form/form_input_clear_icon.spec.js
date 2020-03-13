import { shallowMount } from '@vue/test-utils';
import GlFormInputClearIcon from '../../../src/components/base/form_input_clear_icon/form_input_clear_icon.vue';

describe('GlFormInputClearIcon', () => {
  it('renders main components', () => {
    const wrapper = shallowMount(GlFormInputClearIcon);
    expect(wrapper).toBeInstanceOf(Object);
  });
});
