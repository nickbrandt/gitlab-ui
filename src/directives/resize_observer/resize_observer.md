# Resize Observer

<!-- STORY -->

## Usage

This directive can be used to get notified whenever a given element's size (width or height) changes
and to retrieve the updated dimensions.

Under the hood, it leverages the [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
(and includes a [polyfill](https://github.com/que-etc/resize-observer-polyfill) to make sure it works
in all [supported browsers](https://docs.gitlab.com/ee/install/requirements.html#supported-web-browsers)).

The directive accepts a callback as a value and passes on the received
[contentRect](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentRect)
and the target element whenever a resize event gets triggered.

```html
<script>
export default {
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  methods: {
    handleResize({ contentRect: { width, height } }) {
      this.width = width;
      this.height = height;
    },
  },
};
</script>
<template>
  <div v-gl-resize-observer-directive="handleResize">
    <p>{{ width }} x {{ height }}</p>
  </div>
</template>
```
