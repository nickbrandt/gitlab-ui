/*
 * This compiler will convert a Markdown AST Erb node into
 * a raw string
 * https://github.com/remarkjs/remark/tree/main/packages/remark-stringify#extending-the-compiler
 */

export const erbCompiler = processor => {
  const {
    Compiler: {
      prototype: { visitors },
    },
  } = processor;

  visitors.embeddedCodeBlock = node => `${node.value}`;
  visitors.embeddedCodeInline = node => node.value;
};
