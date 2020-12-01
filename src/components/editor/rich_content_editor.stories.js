import { documentedStoriesOf } from '../../../documentation/documented_stories';

import * as frontmatter from './markdown/frontmatter';
import { fromMarkdown, toMarkdown } from './markdown';

import EditorLite from './source/editor_lite';
import SourceView from './source/source_view.vue';

import FrontmatterCodeBlock from './wysiwyg/frontmatter_ext';
import wysiwygEditor from './wysiwyg/wysiwyg_editor';
import WysiwygView from './wysiwyg/wysiwyg_view.vue';

import DefaultToolbar from './toolbar/default_toolbar.vue';

const TEST_CONTENT = `---
title: Page title
layout: /layouts/base.html
---

# Header 1

Paragraph number 1

## Header 2

Paragraph number 2

### Header 3

Paragraph number 3
`;

documentedStoriesOf('editor|Editor', '').add('default', () => ({
  components: {
    DefaultToolbar,
    WysiwygView,
    SourceView,
  },
  data() {
    return {
      wysiwyg: null,
      source: null,
      content: TEST_CONTENT,
      selection: '',
      currentTab: 1,
    };
  },
  template: `
    <div>
      <default-toolbar :editors="{ wysiwyg, source }" current-editor-name="wysiwyg" />
      <gl-tabs :value="currentTab" @input="syncContent">
        <gl-tab title="Editor">
          <wysiwyg-view v-if="wysiwyg" :editor="wysiwyg" class="gl-mr-2" />
        </gl-tab>
        <gl-tab title="Source">
          <source-view ref="sourceEl" class="gl-mr-2" :style="{ height: '500px' }" />
        </gl-tab>
      </gl-tabs>
    </div>
    `,
  mounted() {
    this.wysiwyg = wysiwygEditor([new FrontmatterCodeBlock()]);

    this.wysiwyg.setContent(this.fromMarkdown());

    this.$nextTick()
      .then(() => {
        this.source = (new EditorLite()).createInstance({
          el: this.$refs.sourceEl.$el,
          blobPath: 'file.md',
          blobContent: this.content,
        });

        return null;
      })
      .catch(() => {
        throw new Error('Could not init editor lite');
      });
  },
  methods: {
    async syncContent(selectedTab) {
      if (selectedTab === this.currentTab) {
        return;
      }

      this.currentTab = selectedTab;

      if (selectedTab === 0) {
        this.wysiwyg.setContent(this.fromMarkdown());
      } else {
        this.source.setValue(this.toMarkdown());
      }
    },
    fromMarkdown() {
      return fromMarkdown({
        schema: this.wysiwyg.schema,
        markdown: this.source?.getValue() || this.content,
        plugins: [[frontmatter.parse]],
        mappers: {
          ...frontmatter.mapper,
        },
      });
    },
    toMarkdown() {
      return toMarkdown({
        content: this.wysiwyg.state.doc,
        nodes: {
          frontmatter: frontmatter.serialize,
        },
      });
    },
  },
}));
