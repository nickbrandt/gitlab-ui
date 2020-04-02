> Note: This component is being introduced to replace the `<gl-deprecated-button>` component as it doesn't conform to the [design specs](https://design.gitlab.com/components/button/#text). Please use `<gl-new-button>` going forward. You can read more about the migration [here](https://gitlab.com/gitlab-org/gitlab-ui/-/issues/608).

### Button

Buttons execute an action, either in the background or foreground of an experience. Different button categories help guide users through certain actions. Buttons express what action will occur when the user clicks or touches it either by text, icon, or both. Additional meaning can be derived from the button variant.

### Button link

A button link is a link that is styled to look like a button, semantically speaking it's a `<a>` tag
with the necessary classes added to make it look like a button, it shares the same functionality as [`<gl-link>`]

> Note: Setting a `target` attribute without a `href` attribute, will not create any side effects. Without the presence of a `href` attribute, this component will render a `<button>`.

[`<gl-link>`]: https://gitlab.com/gitlab-org/gitlab-ui/blob/master/documentation/link.md
