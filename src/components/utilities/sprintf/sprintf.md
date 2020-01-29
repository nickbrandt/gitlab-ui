# sprintf

<!-- STORY -->

## Basic

The `GlSprintf` component lets you do `sprintf`-style string interpolation with
child components. Each placeholder in the translated string, provided via the
`message` prop, becomes a slot that you can use to insert any component in the
rendered output.

> NOTE: `gl-sprintf` does not translate the message for you; you must provide
> it already translated. In the following examples, it is assumed that
> a `gettext`-style `__` translation function is available in your Vue
> templates.

```html
<div>
  <gl-sprintf :message="__('Written by %{author}')">
    <template #author>
      <span>Author</span>
    </template>
  </gl-sprintf>
</div>
```

The example above renders to this HTML:

```html
<div>Written by <span>Author</span></div>
```

## Interpolated content

Sentences should not be split up into different messages, otherwise they may
not be translatable in certain languages. To help with this, `GlSprintf` is
able to interpolate between placeholders suffixed with `Start` and `End`, and
pass whatever is between them to the scoped slot of the base name, via the
`content` property.

For example:

```html
<div>
  <gl-sprintf :message="__('Learn more about %{linkStart}zones%{linkEnd}')">
    <template #link="{ content }">
      <gl-link
        href="https://cloud.google.com/compute/docs/regions-zones/regions-zones"
        target="_blank"
      >{{ content }}</gl-link>
    </template>
  </gl-sprintf>
</div>
```

will render as:

```html
<div>
  Learn more about
  <a
    href="https://cloud.google.com/compute/docs/regions-zones/regions-zones"
    target="_blank"
    rel="noopener noreferrer"
  >zones</a>
</div>
```

The example above is formatted for readability, and so its whitespace
is not technically correct, however, `GlSprintf` _will_ preserve whitespace
correctly.

Note that _any_ arbitrary Vue component(s) can be used within a scoped slot,
and that the content passed to it can be used in any way at all; for instance,
as regular text, or in component attributes or slots.

Here's a more complex example, which `<gl-sprintf>` lets you do in a breeze:

```html
<div>
  <gl-sprintf :message="__('Written by %{authorStart}someone%{authorEnd}')">
    <template #author="{ content }">
      <my-vue-component v-gl-tooltip="content" @event="handleEvent(content)">
        {{ content }}
      </my-vue-component>
      <some-other-component />
    </template>
  </gl-sprintf>
</div>
```

This is not feasible in a JS-only solution, since arbitrary Vue components
cannot easily be used. In addition, a JS-only solution is more likely to be
prone to XSS attacks, as the Vue compiler isn't available to help protect
against them.

## Usage caveats

While there are a lot of caveats here, you don't need to worry about reading
them _unless_ you find `GlSprintf` isn't rendering what you'd expect.

- Since `GlSprintf` typically renders multiple elements, it can't be used as
  a component's root, it must be wrapped with at least one other root element,
  otherwise Vue will throw a `Multiple root nodes returned from render
  function` error.
- If a slot for a given named interpolation _isn't_ provided, the interpolation
  will be rendered as-is, e.g., literally `Written by %{author}` if the
  `author` slot _isn't_ provided, or literally `%{linkStart}foo%{linkEnd}` if
  the `link` slot isn't provided.
- Content between `Start` and `End` placeholders is effectively thrown away if
  the scoped slot of the correct name doesn't consume the `content` property in
  some way, though the slot's components should still be rendered.
- If there's no named interpolation in the message for a provided named slot,
  the content of that slot is silently thrown away.
- If only one of the `Start` or `End` placeholders is in the message, or they
  are in the wrong order, they are treated as plain slots. This allows you to
  use plain slots whose names end in `Start` or `End`, e.g., `backEnd`, or
  `fromStart`, without interpolating content into them.
- Interpolation between `Start` and `End` placeholders is only done one level
  deep. This is intentional, so as to avoid building complex sprintf messages
  that would better be implemented in components. As an example,
  `${linkStart}test%{icon}%{linkEnd}`, if provided both the `link` and `icon`
  slots, would pass `test%{icon}` as a literal string as content to the `link`
  scoped slot.
- To be successfully used in `GlSprintf`, slot names should:
  * start with a letter (`[A-Za-z]`)
  * only contain alpha-numeric characters (`[A-Za-z0-9]`), underscore (`_`) and
    dash (`-`),
  * should not end with underscore (`_`) or dash (`-`) So for example:
    `%{author}`, `%{author_name}`, `%{authorName}` or `%{author-name-100}` are
    all valid placeholders.

## Internet Explorer 11

This component uses [`String.prototype.startsWith()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith) and [`String.prototype.endsWith()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith) under the hood. Make sure those methods are polyfilled if you plan on using the component on IE11.

> NOTE: These methods are already polyfilled in GitLab: [`app/assets/javascripts/commons/polyfills.js#L15-16`](https://gitlab.com/gitlab-org/gitlab/blob/dc60dee6ed6234dda9f032195577cd8fad9646d8/app/assets/javascripts/commons/polyfills.js#L15-16)
