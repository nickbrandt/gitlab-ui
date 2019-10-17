### Button link

A button link is a link that is styled to look like a button, semantically speaking it's a `<a>` tag
with the necessary classes added to make it look like a button, it shares the same functionality as [`<gl-link>`]

> Note: Setting a `target` attribute without a `href` attribute, will not create any side effects. Without the presence of a `href` attribute, this component will render a `<button>`.

[`<gl-link>`]: https://gitlab.com/gitlab-org/gitlab-ui/blob/master/documentation/link.md

#### Legacy implementation

We are implementing a new button component in https://gitlab.com/gitlab-org/gitlab-ui/tree/master/components/base/new_button that conforms with Pajamas design specs. We decided to create a new component to avoid introducing inadvertent side effects in the gitlab product while implementing a button that follows the design specs. Once the new button component is finished, we’ll replace this legacy implementation with aforementioned one.
