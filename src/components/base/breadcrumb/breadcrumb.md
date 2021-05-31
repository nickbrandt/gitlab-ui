## Usage

This component provides two `<slot>` elements for customization. The first is a `<slot #avatar>` so an avatar can appear before the first breadcrumb. The second is a `<slot #separator>` to
customize the icon that appears between each
breadcrumb.

**note:** the component supports passing the property `to` in the list items to enable navigation through `vue-router`

### Example

You can use any kind of separator you want in the slot, like below, which uses `<svg>`
to draw a `/`

```html
<gl-breadcrumb :items="items">
  <template #avatar>
    <img
      class="gl-breadcrumb-avatar-tile"
      src="https://assets.gitlab-static.net/uploads/-/system/group/avatar/9970/logo-extra-whitespace.png?width=15"
      width="15"
      height="15"
    />
  </template>
  <template #separator>
    <svg width="100" height="15">
      <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" />
    </svg>
  </template>
</gl-breadcrumb>
```
