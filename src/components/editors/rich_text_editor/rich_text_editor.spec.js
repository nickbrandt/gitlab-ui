import { shallowMount } from '@vue/test-utils';
import { EditorContent } from 'tiptap';
import { createEditor } from './editor_factory';
import GlRichTextEditor from './rich_text_editor.vue';
import GlLoadingIcon from '~/components/base/loading_icon/loading_icon.vue';

jest.mock('./editor_factory');

describe('GlRichTextEditor', () => {
  let wrapper;

  const buildWrapper = () => {
    wrapper = shallowMount(GlRichTextEditor, {
      stubs: {
        EditorContent,
      },
    });
  };
  const findLoadingIcon = () => wrapper.findComponent(GlLoadingIcon);
  const findEditorContent = () => wrapper.findComponent(EditorContent);

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders loading spinner while the editor is loading', () => {
    createEditor.mockReturnValueOnce(new Promise(() => false));
    buildWrapper();

    expect(findLoadingIcon().exists()).toBe(true);
    expect(findEditorContent().exists()).toBe(false);
  });

  it('renders editor content when the editor loads', async () => {
    createEditor.mockReturnValueOnce({});
    buildWrapper();

    await wrapper.vm.$nextTick();

    expect(findLoadingIcon().exists()).toBe(false);
    expect(findEditorContent().exists()).toBe(true);
  });
});
