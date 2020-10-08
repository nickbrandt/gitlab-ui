import RichContentEditor from './rich_content_editor.vue';
import readme from './rich_content_editor.md';
import { documentedStoriesOf } from '../../../documentation/documented_stories';


documentedStoriesOf('editor|Rich Content Editor', readme)
  .add('default', () => ({
    components: {
      RichContentEditor,
    },
    template: '<rich-content-editor />'
  }));
