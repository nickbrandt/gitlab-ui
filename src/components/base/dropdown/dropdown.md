## Usage

The dropdown component offers a user multiple items or actions to choose from which are initially
collapsed behind a button.

### Icon-only dropdown

Icon-only dropdowns must have an accessible name.
You can provide this with the combination of `text` and `text-sr-only` props.

Optionally, you can use `no-caret` to remove the caret and `category="tertiary"` to remove the border.

```html
<gl-dropdown
  icon="ellipsis_v"
  text="More actions"
  :text-sr-only="true"
  category="tertiary"
  no-caret
>
```

### Button Content

There are 3 ways to set the dropdown button's content.

1. Use the `text` attribute. This will display the text with the loading spinner (shown with the
`loading` attribute), icon (if provided by the `icon` attribute), and dropdown caret:

    ```html
    <gl-dropdown text="Button text">
    ```

1. Use the `button-text` template. This allows custom content for the button's text, but keeps the
loading spinner, icon, and dropdown caret:

    ```html
    <gl-dropdown>
      <template #button-text>
        <!-- Loading spinner shown here -->
        <!-- Icon shown here -->
        Custom <strong>Content</strong> with <em>HTML</em> via Slot
        <gl-truncate position="middle" text="Truncated button text"/>
        <!-- Dropdown arrow shown here -->
      </template>
    </gl-dropdown>
    ```

1. Use the `button-content` template. This will replace everything in the button with the template:

    ```html
    <gl-dropdown>
      <template #button-content>
        Custom <strong>Content</strong> with <em>HTML</em> via Slot
      </template>
    </gl-dropdown>
    ```
