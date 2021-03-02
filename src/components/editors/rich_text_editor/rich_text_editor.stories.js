import readme from './rich_text_editor.md';
import GlRichTextEditor from './rich_text_editor.vue';

export default {
  title: 'editor/Rich Text Editor',
  component: GlRichTextEditor,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {},
};

const Template = (_, { argTypes }) => ({
  components: { GlRichTextEditor },
  props: Object.keys(argTypes),
  template: `
    <gl-rich-text-editor />
  `,
});

export const Default = Template.bind({});
