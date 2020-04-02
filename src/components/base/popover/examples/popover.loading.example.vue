<template>
  <div id="popovercontainer">
    <gl-deprecated-button id="pop-basic">Popover Button</gl-deprecated-button>
    <gl-popover
      target="pop-basic"
      container="popovercontainer"
      placement="top"
      title="My popover"
      triggers="hover focus"
      show
    >
      <gl-skeleton-loading />
    </gl-popover>
  </div>
</template>
