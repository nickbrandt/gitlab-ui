<template>
  <div class="tabs gl-tabs">
    <ul role="tablist" class="nav gl-tabs-nav">
      <li role="presentation" class="nav-item">
        <a
          role="tab"
          target="_self"
          href="#"
          class="nav-link gl-tab-nav-item gl-tab-nav-item-active gl-tab-nav-item-active-indigo"
          >First</a
        >
      </li>
      <li role="presentation" class="nav-item">
        <a role="tab" target="_self" href="#" class="nav-link gl-tab-nav-item">Second</a>
      </li>
    </ul>
    <div class="tab-content gl-tab-content">
      <div role="tabpanel" class="tab-pane active">first content</div>
      <div role="tabpanel" class="tab-pane">second content</div>
    </div>
  </div>
</template>
