### Button link

A button link is a link that is styled to look like a button, semantically speaking it's a `<a>` tag
with the necessary classes added to make it look like a button, it shares the same functionality as [`<gl-link>`]

> Note: Setting a `target` attribute without a `href` attribute, will not create any side effects. Without the presence of a `href` attribute, this component will render a `<button>`.

[`<gl-link>`]: https://gitlab.com/gitlab-org/gitlab-ui/blob/master/documentation/link.md

#### Deprecated Prop Values

We are deprecating certain `variant` values in order to align this component with the [Pajamas design specs]. The following `variant` values have been deprecated:

| Deprecated Value  | Current Equivalent                |
| ----------------- | --------------------------------- |
| `primary`         | `info` (category: `primary`)      |
| `secondary`       | `null` (category: `tertiary`)     |
| `outline-info`    | `info` (category: `secondary`)    |
| `outline-success` | `success` (category: `secondary`) |
| `outline-warning` | `warning` (category: `secondary`) |
| `outline-danger`  | `danger` (category: `secondary`)  |
| `dark`            | _no equivalent_                   |
| `light`           | _no equivalent_                   |

[pajamas design specs]: https://design.gitlab.com/components/buttons
