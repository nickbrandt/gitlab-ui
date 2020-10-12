import unified from 'unified';
import parse from 'rehype-parse';
import { has } from 'lodash';
import rehype2remark from 'rehype-remark';
import stringify from 'remark-stringify';
import baseCodeHandler from 'hast-util-to-mdast/lib/handlers/code';
import baseInlineCodeHandler from 'hast-util-to-mdast/lib/handlers/inline-code';

import { erbCompiler } from './syntax/erb/erb_compiler';

const codeHandler = (h, node, parent) => {
  const baseResult = baseCodeHandler(h, node, parent);

  if (node.tagName === 'pre' && has(node.properties, 'dataEmbeddedCode')) {
    return {
      ...baseResult,
      type: 'embeddedCodeBlock',
    };
  }

  return baseResult;
};

const inlineCodeHandler = (h, node, parent) => {
  const baseResult = baseInlineCodeHandler(h, node, parent);

  if (node.tagName === 'code' && has(node.properties, 'dataEmbeddedCode')) {
    return {
      ...baseResult,
      type: 'embeddedCodeInline',
    };
  }

  return baseResult;
};

export const toMarkdown = html => {
  erbCompiler(stringify);

  return unified()
    .use(parse)
    .use(rehype2remark, {
      handlers: {
        pre: codeHandler,
        code: inlineCodeHandler,
      },
    })
    .use(stringify)
    .process(html);
};
