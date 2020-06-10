# Safe Link Directive

A Vue directive to make the hyperlinks secure by default.

<!-- STORY -->

## Usage

It can be used to prevent the following security concerns related to hyperlinks:

1. [Target="\_blank" Vulnerability](https://web.dev/external-anchors-use-rel-noopener/)

The directive makes sure all the external urls have `noopener noreferrer` rel attributes. It also preserves the existing `rel` attribute values.

2. [URL Injection](https://vuejs.org/v2/guide/security.html#Injecting-URLs)

Hyperlinks are vulnerable to `javascript://` based Cross-site scripting vulnerabilty. A simple vulnerable code would look like

```html
<a href="javascript:alert(document.domain)">click me</a>
```

The directive makes sure all such XSS payloads are sanitized by replacing them with `about:blank`.

```html
<script>
  import { GlSafeLinkDirective as SafeLink } from '@gitlab/ui';

  export default {
    data() {
      return {
        url: 'javascript:alert(1)',
      };
    },
    directives: { SafeLink },
  };
</script>
<template>
  <a v-safe-link href="url" target="_blank">Click</a>
</template>
```
