import { documentedStoriesOf } from '../../../documentation/documented_stories';

import * as frontmatter from './markdown/frontmatter_ext';
import { fromMarkdown, toMarkdown } from './markdown';

import EditorLite from './source/editor_lite';
import SourceView from './source/source_view.vue';

import FrontmatterCodeBlock from './wysiwyg/frontmatter_ext';
import ReferenceLink from './wysiwyg/reference_link_ext';

import wysiwygEditor from './wysiwyg/wysiwyg_editor';
import WysiwygView from './wysiwyg/wysiwyg_view.vue';

import DefaultToolbar from './toolbar/default_toolbar.vue';

import markdownPreviewEndpointPayload from './markdown_preview_payload.json';

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

documentedStoriesOf('editor|Editor', '')
  .add('use markdown preview endpoint', () => ({
    components: {
      DefaultToolbar,
      WysiwygView,
      SourceView,
    },
    data() {
      return {
        wysiwyg: null,
        source: null,
        content: markdownPreviewEndpointPayload.body,
        selection: '',
        currentTab: 0,
      };
    },
    mounted() {
      this.wysiwyg = wysiwygEditor([new ReferenceLink()]);

      this.wysiwyg.setContent(this.content);
    },
    methods: {
      async syncContent(selectedTab) {
        if (selectedTab === this.currentTab) {
          return;
        }

        this.currentTab = selectedTab;

        if (selectedTab === 0) {
          this.wysiwyg.setContent(this.content);
          return;
        }

        if (!this.source) {
          this.$nextTick()
            .then(() => {
              this.source = new EditorLite().createInstance({
                el: this.$refs.sourceEl.$el,
                blobPath: 'file.md',
                blobContent: this.toMarkdown(),
              });
              return null;
            })
            .catch(e => {
              throw e;
            });
        } else {
          this.source.setValue(this.toMarkdown());
        }
      },
      toMarkdown() {
        return toMarkdown({
          content: this.wysiwyg.state.doc,
          marks: {
            reference_link: {
              open: '',
              close: '',
            },
          },
        });
      },
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
  }))
  .add('editor lite integration', () => ({
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
        currentTab: 0,
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
    },
    methods: {
      async syncContent(selectedTab) {
        if (selectedTab === this.currentTab) {
          return;
        }

        this.currentTab = selectedTab;

        if (selectedTab === 0) {
          this.wysiwyg.setContent(this.fromMarkdown());
          return;
        }

        if (!this.source) {
          this.$nextTick()
            .then(() => {
              this.source = new EditorLite().createInstance({
                el: this.$refs.sourceEl.$el,
                blobPath: 'file.md',
                blobContent: this.toMarkdown(),
              });
              return null;
            })
            .catch(() => {
              throw new Error('Could not init editor lite');
            });
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
          marks: {},
        });
      },
    },
  }));
