<template>
  <div id="popovercontainer">
    <gl-deprecated-button id="pop-basic">Popover Button</gl-deprecated-button>
    <gl-popover
      target="pop-basic"
      container="popovercontainer"
      placement="top"
      title="This is a Popover!"
      triggers="hover focus"
      content="With a placement of top"
    />
  </div>
</template>
