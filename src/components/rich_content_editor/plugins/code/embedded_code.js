import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export class EmbeddedCode extends Plugin {
  init() {
    const {
      conversion,
      model: { schema },
    } = this.editor;

    schema.extend('$text', { allowAttributes: 'dataEmbeddedCode' });
    schema.extend('codeBlock', { allowAttributes: 'dataEmbeddedCode' });

    conversion.for('upcast').attributeToAttribute({
      view: {
        name: 'code',
        key: 'data-embedded-code',
      },
      model: 'dataEmbeddedCode',
    });

    conversion.for('upcast').attributeToAttribute({
      view: {
        name: 'pre',
        key: 'data-embedded-code',
      },
      model: {
        name: 'codeBlock',
        key: 'dataEmbeddedCode',
      },
    });

    conversion.for('downcast').attributeToElement({
      model: 'dataEmbeddedCode',
      view: (dataEmbeddedCode, { writer }) => {
        const dataEmbeddedCodeAttribute = writer.createAttributeElement('code', {
          'data-embedded-code': dataEmbeddedCode,
        });

        writer.setCustomProperty('code', true, dataEmbeddedCodeAttribute);

        return dataEmbeddedCodeAttribute;
      },
    });

    conversion.for('downcast').add(dispatcher => {
      dispatcher.on(
        'attribute:dataEmbeddedCode',
        (evt, data, conversionApi) => {
          const { writer } = conversionApi;

          if (data.item.name !== 'codeBlock') {
            return;
          }

          writer.setAttribute(
            'data-embedded-code',
            true,
            conversionApi.mapper.toViewElement(data.item).parent
          );
        },
        { priority: 'low' }
      );
    });
  }
}
