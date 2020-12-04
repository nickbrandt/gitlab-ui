import { Editor } from 'tiptap';
import { Bold, Italic, Link, Heading, OrderedList, BulletList, ListItem } from 'tiptap-extensions';
import { headingLevels } from '../constants';

const create = (extensions = []) =>
  new Editor({
    extensions: [
      ...extensions,
      new Bold(),
      new Italic(),
      new Link(),
      new ListItem(),
      new BulletList(),
      new OrderedList(),
      new Heading({ levels: headingLevels }),
    ],
  });

// eslint-disable-next-line import/no-default-export
export default create;
