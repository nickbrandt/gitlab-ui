<template>
  <div id="popovercontainer">
    <gl-button id="pop-basic">Popover Button</gl-button>
    <gl-popover
      target="pop-basic"
      container="popovercontainer"
      placement="top"
      triggers="hover focus"
      content="Popover content with no title"
    />
  </div>
</template>
