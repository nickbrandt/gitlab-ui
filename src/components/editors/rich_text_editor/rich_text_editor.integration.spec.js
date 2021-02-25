// eslint-disable-next-line filenames/match-regex
import { mount } from '@vue/test-utils';
import RichTextEditor from './rich_text_editor.vue';
import { flushPromises } from '~/utils/test_utils';

describe('RichTextEditor integration tests', () => {
  let wrapper;

  const buildWrapper = () => {
    wrapper = mount(RichTextEditor);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders prosemirror view when mounted', async () => {
    buildWrapper();

    await flushPromises();

    expect(wrapper.find('.ProseMirror').exists()).toBe(true);
  });
});
