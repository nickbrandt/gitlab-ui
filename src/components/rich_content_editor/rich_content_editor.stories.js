import RichContentEditor from './rich_content_editor.vue';
import readme from './rich_content_editor.md';
import { documentedStoriesOf } from '../../../documentation/documented_stories';

const TEST_CONTENT = `
The following people are permanent members of the Release Stage:

Este es un enlace <a href="<%= compensation_roadmap.role_path %>"><%= compensation_roadmap.role_path %></a>

## This is a <%= person.name %>

<%= direct_team(manager_role: 'Backend Engineering Manager, Release:Progressive Delivery') %>
  <%= direct_team(manager_role: 'Backend Engineering Manager, Release:Release Management') %>
<%= direct_team(manager_role: 'Frontend Engineering Manager, Release (CD)') %>

## Stable Counterparts

<% l << "Product lead: [#{apptype.pm}]" if apptype.pm %>
  <% l << "[Learn more](#{apptype.marketing_page})" if apptype.marketing_page %>
  <% l << "[Documentation](#{apptype.documentation})" if apptype.documentation %>
  <% l << "[Direction](#{apptype.direction})" if apptype.direction %>
`;

const approximatePathToStartSelection = (content, [index, offset]) => {
  const targetBlock = content.split('\n\n')[index] || '';

  return content.indexOf(targetBlock) + offset;
};

documentedStoriesOf('editor|Rich Content Editor', readme)
  .add('default', () => ({
    components: {
      RichContentEditor,
    },
    template: '<rich-content-editor content="Initial content" />',
  }))
  .add('multiple instances', () => ({
    components: {
      RichContentEditor,
    },
    template: `
    <div>
      <rich-content-editor class="gl-mr-2" content="First editor instance" />
      <rich-content-editor class="gl-mr-2" content="Second editor instance" />
      <rich-content-editor class="gl-mr-2" content="Third editor instance" />
    </div>
    `,
  }))
  .add(
    'mobile viewport',
    () => ({
      components: {
        RichContentEditor,
      },
      template: `
    <rich-content-editor class="gl-mr-2" content="First editor instance" />
    `,
    }),
    {
      viewport: { defaultViewport: 'breakpointSmall' },
    }
  )
  .add('custom markdown syntax', () => ({
    components: {
      RichContentEditor,
    },
    data() {
      return {
        content: TEST_CONTENT,
      };
    },
    template: `
      <div>
        <rich-content-editor ref="wysiwyg" v-model="content" />
        <h3 class="gl-mt-5">Raw markdown</h3>
        <p>
          The following example represents a markdown document that contains
          embedded ruby template syntax (ERB).
        </p>
        <pre><code>{{content}}</code></pre>
      </div>
    `,
  }))
  .add('cursor position', () => ({
    components: {
      RichContentEditor,
    },
    data() {
      return {
        content: TEST_CONTENT,
        selection: '',
        currentTab: 0,
      };
    },
    template: `
    <gl-tabs :value="currentTab" @input="syncContent">
      <gl-tab title="Editor">
        <rich-content-editor ref="wysiwyg" v-model="content" class="gl-mr-2" />
      </gl-tab>
      <gl-tab title="Source">
        <gl-form-textarea ref="markdown" rows="20" v-model="content" class="gl-h-full!" />
      </gl-tab>
    </gl-tabs>
    `,
    methods: {
      async syncContent(selectedTab) {
        if (selectedTab === this.currentTab) {
          return;
        }

        this.currentTab = selectedTab;

        if (selectedTab === 0) {
          this.$refs.wysiwyg.setData(this.content);
        } else {
          this.content = await this.$refs.wysiwyg.getData();
          const selectionPath = this.$refs.wysiwyg.getSelectionPath();

          await this.$nextTick();

          const $textarea = this.$refs.markdown.$el;
          const textSelectionIndex = approximatePathToStartSelection(this.content, selectionPath);

          $textarea.focus();
          $textarea.setSelectionRange(textSelectionIndex, textSelectionIndex);
        }
      },
    },
  }));
