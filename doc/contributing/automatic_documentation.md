---
stage: none
group: Development
info: To determine the technical writer assigned to the Stage/Group associated with this page, see https://about.gitlab.com/handbook/engineering/ux/technical-writing/#assignments
---

# Automatic documentation

Component API documentation is generated based on docblocks written right in the Vue files.
Internally, docblocks are parsed with [vue-docgen-api](https://vue-styleguidist.github.io/docs/Docgen.html).

```html
<script>
export default {
  props: {
    /**
     * foo prop's description
     */
    foo: {
      type: String,
      required: true,
    },
  },
  methods: {
    onError() {
      /**
       * error event's description.
       */
      this.$emit("error");
    },
  },
};
</script>

<template>
  <div>
    <!-- @slot default slot's description -->
    <slot></slot>
  </div>
</template>
```

[Read more about available properties](https://vue-styleguidist.github.io/docs/Documenting.html).

## Component documentation info

To add additional information to our documentation page we are using extra files which hold
additional information, those have the format `(component).documentation.js` in the component
directory. The following sample has a sample documentation attribute with all possibilities.
All of these properties are optional.

```js
export default {
  description: doc,                   // Imported Documentation file
  followsDesignSystem: true,          // If we have already fully styled this component according
                                      // to design system
  bootstrapComponent: 'b-button',     // Name of the underlying vue-bootstrap component
};
```
