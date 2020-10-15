# GlBadge

<!-- STORY -->

Badges highlight metadata of objects, the kind of information that always needs
some context and isn’t useful on its own. For example, they can be used to
indicate an issue’s status, a member’s role, or if a branch is protected.

## Usage

```html
<gl-badge>Hello, world!</gl-badge>
```

> Note: Native support for icons in badges will be added in a future version.

## Edge cases

While this component is based on
[`BBadge`](https://bootstrap-vue.js.org/docs/components/badge) from
`bootstrap-vue`, it is not a drop-in replacement. Specifically, this component:

 - Has a different set of valid `variant`s. See the props
   documentation for those values.
 - Always sets the `pill` prop of the underlying `BBadge` to `true`. Any passed
   in `pill` prop value is ignored.
 - Does _not_ scale itself to match the size of its immediate parent, like
   `BBadge` does.
