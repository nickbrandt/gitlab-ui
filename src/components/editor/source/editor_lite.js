import { editor as monacoEditor, languages as monacoLanguages, Uri } from 'monaco-editor';

import { EDITOR_LITE_INSTANCE_ERROR_NO_EL, URI_PREFIX } from '../constants';

const clearDomElement = el => {
  if (!el || !el.firstChild) return;

  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

// eslint-disable-next-line import/no-default-export
export default class Editor {
  constructor(options = {}) {
    this.instances = [];
    this.options = {
      extraEditorClassName: 'gl-editor-lite',
      ...options,
    };
  }

  static updateModelLanguage(path, instance) {
    if (!instance) return;
    const model = instance.getModel();
    const ext = `.${path.split('.').pop()}`;
    const language = monacoLanguages
      .getLanguages()
      .find(lang => lang.extensions.indexOf(ext) !== -1);
    const id = language ? language.id : 'plaintext';
    monacoEditor.setModelLanguage(model, id);
  }

  static pushToImportsArray(arr, toImport) {
    arr.push(import(toImport));
  }

  static loadExtensions(extensions) {
    if (!extensions) {
      return Promise.resolve();
    }
    const promises = [];
    const extensionsArray = typeof extensions === 'string' ? extensions.split(',') : extensions;

    extensionsArray.forEach(ext => {
      const prefix = ext.includes('/') ? '' : 'editor/';
      const trimmedExt = ext.replace(/^\//, '').trim();
      Editor.pushToImportsArray(promises, `~/${prefix}${trimmedExt}`);
    });

    return Promise.all(promises);
  }

  /**
   * Creates a monaco instance with the given options.
   *
   * @param {Object} options Options used to initialize monaco.
   * @param {Element} options.el The element which will be used to create the monacoEditor.
   * @param {string} options.blobPath The path used as the URI of the model. Monaco uses the extension of this path to determine the language.
   * @param {string} options.blobContent The content to initialize the monacoEditor.
   * @param {string} options.blobGlobalId This is used to help globally identify monaco instances that are created with the same blobPath.
   * @param {Array} options.extensions The array with extensions to apply to this instance.
   */
  createInstance({
    el = undefined,
    blobPath = '',
    blobContent = '',
    blobGlobalId = 'default_id',
    extensions = [],
    ...instanceOptions
  } = {}) {
    if (!el) {
      throw new Error(EDITOR_LITE_INSTANCE_ERROR_NO_EL);
    }

    clearDomElement(el);

    const uriFilePath = `${URI_PREFIX}.${blobGlobalId}.${blobPath}`;

    const model = monacoEditor.createModel(blobContent, undefined, Uri.file(uriFilePath));

    monacoEditor.onDidCreateEditor(() => {
      delete el.dataset.editorLoading;
    });

    const instance = monacoEditor.create(el, {
      ...this.options,
      ...instanceOptions,
    });
    instance.disposableEvents = {};

    instance.setModel(model);
    instance.onDidDispose(() => {
      const index = this.instances.findIndex(inst => inst === instance);
      this.instances.splice(index, 1);
      model.dispose();
    });
    instance.updateModelLanguage = path => Editor.updateModelLanguage(path, instance);
    instance.use = args => this.use(args, instance);

    instance.addListenerAndStoreDisposable = (marker, fn) => {
      instance.disposableEvents[marker] = instance.onDidChangeModelContent(fn);
    };
    instance.disposeDisposableEvent = marker => {
      instance.disposableEvents[marker].dispose();
      delete instance.disposableEvents[marker];
    };

    Editor.loadExtensions(extensions, instance)
      .then(modules => {
        if (modules) {
          modules.forEach(module => {
            instance.use(module.default);
          });
        }

        return null;
      })
      .then(() => {
        el.dispatchEvent(new Event('editor-ready'));

        return null;
      })
      .catch(e => {
        throw e;
      });

    this.instances.push(instance);
    return instance;
  }

  dispose() {
    this.instances.forEach(instance => instance.dispose());
  }

  use(exts = [], instance = null) {
    const extensions = Array.isArray(exts) ? exts : [exts];
    if (instance) {
      extensions.forEach(ext => ext.init?.bind(instance)());
      Object.assign(instance, ...extensions);
    } else {
      this.instances.forEach(inst => {
        extensions.map(ext => ext.init?.bind(inst)());
        Object.assign(inst, ...extensions);
      });
    }
  }
}
