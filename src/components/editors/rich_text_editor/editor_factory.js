export const createEditor = async () => {
  const { Editor } = await import(/* webpackChunkName: 'tiptap' */ 'tiptap');
  const { Bold } = await import(/* webpackChunkName: 'tiptap' */ 'tiptap-extensions');

  return new Editor({
    extensions: [new Bold()],
  });
};
