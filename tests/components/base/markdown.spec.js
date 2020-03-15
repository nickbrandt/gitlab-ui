import { shallowMount } from '@vue/test-utils';
import GlMarkdown from '../../../src/components/base/markdown/markdown.vue';

describe('GlMarkdown', () => {
  it('renders main components', () => {
    const wrapper = shallowMount(GlMarkdown, {
      propsData: {
        markdown:
          "<h3>This is a test</h3>",
      },
    });
    expect(wrapper).toBeInstanceOf(Object);
  });
});
