import { Editor } from 'tiptap';
import { Bold, Italic, Heading, OrderedList, BulletList, ListItem } from 'tiptap-extensions';
import { headingLevels } from '../constants';

const create = (extensions = []) =>
  new Editor({
    extensions: [
      new Bold(),
      new Italic(),
      new BulletList(),
      new OrderedList(),
      new ListItem(),
      new Heading({ levels: headingLevels }),
      ...extensions,
    ],
  });

// eslint-disable-next-line import/no-default-export
export default create;
