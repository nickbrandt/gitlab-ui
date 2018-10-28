<script>
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import * as Babel from 'babel-standalone';
import { parseComponent } from 'vue-template-compiler';

import { html } from 'js-beautify';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';

import copyToClipboard from 'copy-to-clipboard';

import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';

import * as gitlabComponents from '../index.js';

import * as Documentation from '../components/documentation';

Vue.use(BootstrapVue);

for (let comp in gitlabComponents) {
  Vue.component(comp, gitlabComponents[comp]);
}

export default {
  props: {
    exampleName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      source: '',
      renderedHtml: '',
      copiedSource: false,
      copiedOutput: false,
    };
  },
  computed: {
    currentExampleComponent() {
      let foundExample = null;
      for (let component in Documentation) {
        if (Documentation[component].examples) {
          Documentation[component].examples.forEach(exampleGroup => {
            foundExample = exampleGroup.examples.find(example => {
              return example.id === this.exampleName;
            });
          });
        }
      }

      if (foundExample && foundExample !== undefined) {
        const base = {
          name,
          template: '<div></div>',
        };
        try {
          const parsed = parseComponent(foundExample.component);

          let compiled = {};
          if (parsed.script) {
            const { code } = Babel.transform(parsed.script.content, {
              presets: ['es2015', 'stage-2'],
            });
            compiled = eval(`const exports = {};${code}`); // eslint-disable-line
          }

          compiled.template = parsed.template.content;
          this.source = compiled.template;

          return Object.assign({}, base, compiled);
        } catch (e) {
          console.log('ERR : ', e);
          return base;
        }
      }
      return null;
    },
    exampleHTMLOutput() {
      if (this.$refs.exampleComponent) {
        return this.$refs.exampleComponent;
      }
      return '';
    },
    sourceFormatted() {
      if (this.source) {
        return hljs.fixMarkup(hljs.highlight('html', this.source).value);
      }
      return '';
    },
    renderedHtmlFormatted() {
      if (this.renderedHtml) {
        return hljs.fixMarkup(hljs.highlight('html', this.renderedHtml).value);
      }
      return '';
    },
  },
  watch: {
    currentExampleComponent() {
      Vue.nextTick(() => {
        this.init();
      });
    },
  },
  created() {
    hljs.configure({ tabReplace: '    ', useBR: true });
  },
  mounted() {
    this.init();
  },
  methods: {
    setHtml() {
      if (this.$refs.compiled) {
        const markup = this.$refs.compiled.$el.outerHTML;
        if (markup) {
          let preFormattedHTML = markup.replace(/><(?!\/i|\/label|\/span|option)/g, '>\n<');
          this.renderedHtml = html(preFormattedHTML, {
            indent_size: 2,
            indent_char: ' ',
            wrap_attributes: 'auto',
            wrap_attributes_indent_size: 2,
            end_with_newline: false,
          });
        }
      }
    },
    init() {
      this.setHtml();
    },
    copySource() {
      copyToClipboard(this.source);
      this.copiedSource = true;
      setTimeout(() => {
        this.copiedSource = false;
      }, 2000);
    },
    copyHtml() {
      copyToClipboard(this.renderedHtml);
      this.copiedOutput = true;
      setTimeout(() => {
        this.copiedOutput = false;
      }, 2000);
    },
    kebabCase,
  },
};
</script>

<template>
  <div>
    <div v-if="currentExampleComponent !== null">
      <b-card no-body>
        <div slot="header">
          <b-row>
            <b-col>
              <strong>{{ exampleName }}</strong>
            </b-col>
            <b-col class="text-right">
              <b-button-group size="sm" class="mx-1">
                <b-btn v-b-toggle.collapseSource>Source</b-btn>
                <b-btn v-b-toggle.collapseHTML>HTML</b-btn>
              </b-button-group>
            </b-col>
          </b-row>
        </div>
        <b-card-body>
          <div ref="compiled" :is="currentExampleComponent" />
        </b-card-body>
        <b-list-group flush>
          <b-collapse id="collapseSource" class="mt-2">
            <b-list-group-item>
              <b-row>
                  <b-col cols="8"><h6>Source</h6></b-col>
                  <b-col class="text-right">
                    <template v-if="copiedSource">Copied!</template>
                    <b-button-group size="sm">
                      <b-button :disabled="copiedSource" @click="copySource">
                        Copy
                      </b-button>
                    </b-button-group>
                  </b-col>
              </b-row>
              <code class="hljs html" v-html="sourceFormatted"></code>
            </b-list-group-item>
          </b-collapse>
          <b-collapse id="collapseHTML" class="mt-2">
            <b-list-group-item>
              <b-row>
                <b-col cols="8"><h6>HTML Output</h6></b-col>
                <b-col class="text-right">
                  <template v-if="copiedOutput">Copied!</template>
                  <b-button-group size="sm">
                    <b-button :disabled="copiedOutput" @click="copyHtml">
                      Copy
                    </b-button>
                  </b-button-group>
                </b-col>
              </b-row>
              <code class="hljs html" v-html="renderedHtmlFormatted"></code>
            </b-list-group-item>
          </b-collapse>
        </b-list-group>
      </b-card>
    </div>    
    <b-alert v-else show variant="warning">No Example found with the name "{{ exampleName }}"</b-alert>
  </div>
</template>
