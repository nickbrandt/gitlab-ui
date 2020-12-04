import { Link } from 'tiptap-extensions';

// eslint-disable-next-line import/no-default-export
export default class ReferenceLink extends Link {
  // eslint-disable-next-line class-methods-use-this
  get name() {
    return 'reference_link';
  }

  get schema() {
    const baseSchema = super.schema;

    return {
      ...baseSchema,
      attrs: {
        ...baseSchema.attrs,
        title: {
          default: null,
        },
        classList: {
          default: null,
        },
        referenceType: {
          default: null,
        },
        original: {
          default: null,
        },
      },
      parseDOM: [
        {
          tag: 'a[data-reference-type]',
          getAttrs: dom => {
            const href = dom.getAttribute('href');
            const title = dom.getAttribute('title');
            const { referenceType, original } = dom.dataset;

            return {
              href,
              title,
              original,
              referenceType,
            };
          },
        },
      ],
      toDOM: node => [
        'a',
        {
          'data-reference-type': node.attrs.referenceType,
          'data-original': node.attrs.original,
          href: node.attrs.href,
          title: node.attrs.title,
          rel: 'noopener noreferrer nofollow',
          target: this.options.target,
        },
        0,
      ],
    };
  }
}
