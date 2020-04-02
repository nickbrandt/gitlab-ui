<template>
  <div id="popovercontainer">
    <gl-deprecated-button id="pop-basic">Popover Button</gl-deprecated-button>
    <gl-popover
      target="pop-basic"
      container="popovercontainer"
      placement="top"
      triggers="hover focus"
      show
    >
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-inline-flex align-items-center">
          <div class="issuable-status-box status-box status-box-open">Open</div>
          <span class="text-secondary">
            Opened
            <time>2 months ago</time>
          </span>
        </div>
      </div>
      <h5 class="my-2">Lorem ipsum dolor sit amet consectetur adipiscing elit</h5>
      <div class="text-secondary">gitlab-org/gitlab-ui!586</div>
    </gl-popover>
  </div>
</template>
