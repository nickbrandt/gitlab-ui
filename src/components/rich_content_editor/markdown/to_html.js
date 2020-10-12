import unified from 'unified';
import parse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import stringify from 'rehype-stringify';
import hastScript from 'hastscript';
import { erbParser } from './syntax/erb/erb_parser';

/**
 * Maps the custom ERB and frontmatter AST nodes
 * to specific HTML elements. In other words, it
 * specifies how these nodes should be rendered.
 *
 * Each custom renderer is called a Handler.
 *
 * Unified provides this package to convert Markdown
 * to HTML https://github.com/remarkjs/remark-rehype
 *
 * See https://github.com/syntax-tree/mdast-util-to-hast#optionshandlers
 * */
const embeddedCodeBlock = (h, node) => {
  return h(
    node,
    'pre',
    {
      dataEmbeddedCode: true,
    },
    [hastScript(`code.language-erb`, [node.value])]
  );
};

const embeddedCodeInline = (h, node) => {
  return h(
    node,
    'code',
    {
      class: `language-erb`,
      dataEmbeddedCode: true,
    },
    [{ type: 'text', value: node.value }]
  );
};

const html = (h, node) => {
  if (node.position.start.column > 0) {
    return h(node, 'code', { class: 'language-html', dataEmbeddedCode: true }, [
      { type: 'text', value: node.value },
    ]);
  }

  return h(node, 'pre', { dataEmbeddedCode: true }, [
    hastScript(`code.language-html`, [node.value]),
  ]);
};

export const toHtml = markdown => {
  erbParser(parse);

  const processor = unified()
    .use(parse)
    .use(remark2rehype, {
      handlers: {
        embeddedCodeBlock,
        embeddedCodeInline,
        html,
      },
    })
    .use(stringify);

  return processor.process(markdown);
};
