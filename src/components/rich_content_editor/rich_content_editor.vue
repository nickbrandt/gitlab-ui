<script>
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Image from '@ckeditor/ckeditor5-image/src/image';
import List from '@ckeditor/ckeditor5-list/src/list';

import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';

export default {
  async mounted() {
    ClassicEditor.create(this.$el, {
      plugins: [BlockToolbar, Essentials, Paragraph, Bold, Italic, Strikethrough, Image, List, Table, TableToolbar],
      toolbar: ['bold', 'italic', 'strikethrough', 'insertImage', 'bulletedList', 'numberedList', 'insertTable'],
      blockToolbar: ['insertImage', 'bulletedList', 'numberedList', 'insertTable'],
      table: {
        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
      }
    });
  },
};
</script>
<template>
  <div class="gl-rich-content-editor"></div>
</template>
