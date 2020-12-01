<script>
import { EditorContent, } from 'tiptap';
import GlMarkdown from '../../base/markdown/markdown.vue';

export default {
  components: {
    GlMarkdown,
    EditorContent,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    }
  }
}
</script>
<template>
  <gl-markdown>
    <editor-content :editor="editor" />
  </gl-markdown>
</template>
