# Modal

<!-- STORY -->

## Usage

Modal components aren't

~~~js
<button
  type="button"
  v-gl-modal="'test-modal-id'"
>
  Open modal
</button>
<gl-modal modal-id="test-modal-id" />
~~~

## Props
| Property | Type | Default Value | Validation |
|---|---|---|---|
| modalId | String | &nbsp; | required |
| titleTag | String | h4 | |

In addition to the props listed in the table above, Modal uses the same props as [`<b-modal>`].

## Under the hood
Modal uses [`<b-modal>`] internally. It offers multiple approaches to toggling modal visibility (using v-b-modal directive, show() and hide(), v-model and emitting events on $root).

Although

[`<b-modal>`]: https://bootstrap-vue.js.org/docs/components/modal/
