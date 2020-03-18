import { shallowMount } from '@vue/test-utils';
import GlMarkdown from '../../../src/components/base/markdown/markdown.vue';

describe('GlMarkdown', () => {
  it('renders main components', () => {
    const wrapper = shallowMount(GlMarkdown);
    expect(wrapper).toBeInstanceOf(Object);
  });
});
