> Note: For this component to align with the design system specs, all changes made in [`<gl-new-button>`] need to be merged into [`gl-button`]. [#20229](https://gitlab.com/gitlab-org/gitlab/issues/202209) tracks this effort.

# Modal

<!-- STORY -->
## Usage
Modals are used to reveal critical information, show information without losing context, or when the system requires a user response. Modals can also fragment a complex workflow into simpler steps and should serve a single purpose dedicated to completing the user’s task.

## Deprecation Warning
We are deprecating the `modal-ok` and `modal-cancel` slots. We are also changing the way the `modal-footer` slot content is populated. This is in order to align this component with the design system.

The `modal-footer` slot should only be populated via props: `action-primary`, `action-secondary` and `action-cancel`. These props allow you to handle how a primary, secondary and cancel button will behave in the modals footer. The props receive an object as such:
~~~js
{
  text: 'Save Changes',
  attributes: [
    { variant: 'info' },
    { disabled: this.someState },
    { class: 'some-class' },
    ...
  ]
}
~~~
