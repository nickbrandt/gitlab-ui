### Button link

A button link is a link that is styled to look like a button, semantically speaking it's a `<a>` tag
with the necessary classes added to make it look like a button, it shares the same functionality as [`<gl-link>`]

> Note: Setting a `target` attribute without a `href` attribute, will not create any side effects. Without the presence of a `href` attribute, this component will render a `<button>`.

[`<gl-link>`]: https://gitlab.com/gitlab-org/gitlab-ui/blob/master/documentation/link.md

### New style

The `new-style` prop, when enabled, aligns the `gl-button` styles to the
[design specifications](https://design.gitlab.com/components/buttons). In order
to avoid breaking existing usage, this is *not* enabled by default, but you are
*encouraged to opt-in* to the new styling using the `new-style` prop, if you can.
