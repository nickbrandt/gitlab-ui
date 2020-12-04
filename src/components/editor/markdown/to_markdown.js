import { MarkdownSerializer, defaultMarkdownSerializer } from 'prosemirror-markdown';

export const toMarkdown = ({ content = '', nodes = {}, marks = {} }) => {
  const serializer = new MarkdownSerializer(
    {
      ...defaultMarkdownSerializer.nodes,
      ...nodes,
    },
    {
      ...defaultMarkdownSerializer.marks,
      bold: { open: '**', close: '**', mixable: true, expelEnclosingWhitespace: true },
      italic: { open: '_', close: '_', mixable: true, expelEnclosingWhitespace: true },

      ...marks,
    }
  );

  return serializer.serialize(content, {
    tightLists: true,
  });
};
