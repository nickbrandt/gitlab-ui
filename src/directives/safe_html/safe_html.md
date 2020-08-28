# Safe Html

A Vue Directive to sanitize HTML to avoid an XSS vulnerability.

<!-- STORY -->

## Usage

This directive can be used to sanitize HTML code which may contain user input, and thus preventing any cross-site scripting (XSS) vulnerabilities.

Under the hood, it uses [DOMPurify](https://github.com/cure53/DOMPurify) to sanitize the provided HTML code.

## Example

```html
<script>
import { GlSafeHtmlDirective as SafeHtml } from '@gitlab/ui';

export default {
  directives: {
    SafeHtml,
  },
  data() {
    return {
      rawHtml: `Hello! Welcome "><script>alert(1)</script>`,
    };
  },
};
</script>

<template>
  <div v-safe-html="rawHtml"></div>
</template>
```

## Advanced configuration

```js
// This will allow only <b> tags
const config = { ALLOWED_TAGS: ['b'] };
```

```html
<div v-safe-html:[config]="rawHtml"></div>
```

Please refer https://github.com/cure53/DOMPurify#can-i-configure-dompurify for advanced configuration options.

<br>
