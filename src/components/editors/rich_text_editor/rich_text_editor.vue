<script>
import GlLoadingIcon from '../../base/loading_icon/loading_icon.vue';
import { createEditor } from './editor_factory';

export default {
  components: {
    GlLoadingIcon,
    EditorContent: async () => {
      const { EditorContent } = await import(/* webpackChunkName: 'tiptap' */ 'tiptap');
      return EditorContent;
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  async created() {
    this.editor = await createEditor();
  },
};
</script>
<template>
  <editor-content v-if="editor" :editor="editor" />
  <gl-loading-icon v-else />
</template>
