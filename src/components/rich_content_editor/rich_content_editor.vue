<script>
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';

import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';

import Link from '@ckeditor/ckeditor5-link/src/link';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';

import List from '@ckeditor/ckeditor5-list/src/list';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';

import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

import { toHtml, toMarkdown } from './markdown';

import { EmbeddedCode } from './plugins/code/embedded_code';

export default {
  model: {
    prop: 'content',
    event: 'change',
  },
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    const editor = await ClassicEditor.create(this.$el, {
      plugins: [
        BlockToolbar,
        Essentials,
        Paragraph,
        Bold,
        Italic,
        Strikethrough,
        Code,
        Image,
        ImageInsert,
        List,
        Table,
        TableToolbar,
        Heading,
        Link,
        AutoLink,
        BlockQuote,
        CodeBlock,
        EmbeddedCode,
      ],
      toolbar: [
        'heading',
        'bold',
        'italic',
        'strikethrough',
        'code',
        '|',
        'link',
        'imageInsert',
        '|',
        'bulletedList',
        'numberedList',
        'blockQuote',
        'insertTable',
        'codeBlock',
        '|',
        'undo',
        'redo',
      ],
      blockToolbar: [
        'heading',
        'insertImage',
        'bulletedList',
        'numberedList',
        'insertTable',
        'blockQuote',
      ],
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
      },
      codeBlock: {
        languages: [
          { language: 'erb', label: 'ERB' },
          { language: 'html', label: 'HTML' },
          { language: 'markdown', label: 'Markdown' },
        ],
      },
    });

    const processedContent = (await toHtml(this.content)).contents;

    editor.setData(processedContent);

    CKEditorInspector.attach(editor);

    this.editor = editor;
  },
  methods: {
    async getData() {
      const { contents } = await toMarkdown(this.editor?.getData());

      return contents;
    },
    async setData(content) {
      this.editor.setData((await toHtml(content)).contents);
    },
    getSelectionPath() {
      const { document } = this.editor?.model;

      if (!document) {
        return null;
      }

      return document.selection.getFirstPosition().path;
    },
  },
};
</script>
<template>
  <div class="gl-rich-content-editor"></div>
</template>
