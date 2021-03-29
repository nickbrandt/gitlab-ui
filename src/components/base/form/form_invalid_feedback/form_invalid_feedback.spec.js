import { shallowMount } from '@vue/test-utils';
import GlFormInvalidFeedback from './form_invalid_feedback.vue';

describe('GlFormInvalidFeedback', () => {
  it('renders main components', () => {
    const wrapper = shallowMount(GlFormInvalidFeedback);
    expect(wrapper).toBeInstanceOf(Object);
  });
});
