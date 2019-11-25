# sprintf

<!-- STORY -->

The `GlSprintf` component lets you do string interpolation with child components. Each placeholder in the translation string becomes a slot that you can use to insert any component in the rendered string.

```html
<div>
  <sprintf message="Written by %{author}">
    <template #author>
      <span>Author</span>
    </template>
  </sprintf>
</div>
```

The example above renders to this HTML:

```html
<div>Written by <span>Author</span></div>
```

While it would be possible to achieve the same result with a Js-only solution, things might get trickier if you were to include Vue components in your translations, which `<gl-sprintf>` lets you do in a breeze:

```html
<div>
  <sprintf message="Written by %{author}">
    <template #author>
      <my-vue-component :foo="bar" @event="handleEvent" />
    </template>
  </sprintf>
</div>
```

This is very useful because it lets you build full translation strings that properly convey the context they are used in: no need to split the string into multiple parts to include Vue components where needed (which would also make it impossible to comply with some other languages' grammar where the words might appear in a completely different order).

## Usage caveats

- Since `GlSprintf` typically renders multiple elements, it can't be used as a component's root, it must be wrapped with at least one other root element, otherwise Vue will throw a `Multiple root nodes returned from render function` error.
- If a slot for a given named interpolation _isn't_ provided, the interpolation will be rendered as-is, e.g., literally `Written by %{author}` if the `author` slot _isn't_ provided.
- If there's no named interpolation in the message for a provided named slot, the content of that slot is silently thrown away.

## Internet Explorer 11

This component uses [`String.prototype.startsWith()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith) and [`String.prototype.endsWith()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith) under the hood. Make sure those methods are polyfilled if you plan on using the component on IE11.

> NOTE: These methods are already polyfilled in GitLab: [`app/assets/javascripts/commons/polyfills.js#L15-16`](https://gitlab.com/gitlab-org/gitlab/blob/dc60dee6ed6234dda9f032195577cd8fad9646d8/app/assets/javascripts/commons/polyfills.js#L15-16)
