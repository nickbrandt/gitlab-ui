# Safe Html

A Vue Directive to sanitize HTML to avoid an XSS vulnerability.

<!-- STORY -->

## Usage

This directive can be used to sanitize HTML code which may contain user input, and thus preventing any cross-site scripting (XSS) vulnerabilities.

Under the hood, it uses available [HTML sanitizer](https://github.com/apostrophecms/sanitize-html) to sanitize the provided HTML code.

## Example

```html
<script>
import { GlSafeHtmlDirective as SafeHtml } from '@gitlab/ui';

  export default {
    data() {
      return {
       rawHtml: `Hello! Welcome "><script>alert(1)</script>`
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
const config = { allowedTags: ['b'] };
```

```html
<div v-safe-html:[config]="rawHtml"></div>
```

Please refer https://github.com/apostrophecms/sanitize-html#what-are-the-default-options for advanced configuration options.

:bulb: Fyi, we're going to [switch](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/31928) to using [DOMPurify](https://github.com/cure53/DOMPurify) very soon, some advance configurations might differ.

<br>
