import { withKnobs, text } from '@storybook/addon-knobs';
import { escape } from 'lodash';
import { sanitize } from 'dompurify';
import { documentedStoriesOf } from '../../../documentation/documented_stories';
import readme from './safe_html.md';
import { GlSafeHtmlDirective } from '../../../index';

documentedStoriesOf('directives/safe-html-directive', readme)
  .addDecorator(withKnobs)
  .addParameters({ storyshots: false, knobs: { escapeHTML: false } })
  .add('default', () => ({
    directives: {
      'gl-safe-html': GlSafeHtmlDirective,
    },
    props: {
      unsafeHTML: {
        type: String,
        default: text('Unsafe HTML', '<a href="javascript:alert(document.domain)">Click me</a>'),
      },
    },
    computed: {
      sanitizedHtml() {
        return sanitize(this.unsafeHTML);
      },
    },
    escape,
    template: `
    <table class="gl-table">
      <thead>
        <tr>
          <th>Directive</th>
          <th>Output</th>
          <th>Rendered</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>v-html</strong></td>
          <td><code v-html="$options.escape(unsafeHTML)"></code></td>
          <td v-html="unsafeHTML"></td>
        </tr>
        <tr>
          <td><strong>v-safe-html</strong></td>
          <td><code v-html="$options.escape(sanitizedHtml)"></code></td>
          <td v-gl-safe-html="unsafeHTML"></td>
        </tr>
      </tbody>
    </table>
    `,
  }));
