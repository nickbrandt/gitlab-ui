import { shallowMount } from '@vue/test-utils';
import GlRichTextEditor from './rich_text_editor.vue';

describe('GlRichTextEditor', () => {
  it('renders main components', () => {
    const wrapper = shallowMount(GlRichTextEditor);
    expect(wrapper).toBeInstanceOf(Object);
  });
});
