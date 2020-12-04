export const serialize = (state, node) => {
  state.write(node.dataOriginal, false);
  state.text(node.textContent, false);
  state.ensureNewLine();
  state.write('---\n');
  state.closeBlock(node);
};
