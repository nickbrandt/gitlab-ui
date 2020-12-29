<template>
  <gl-tabs>
    <gl-tab title="Regular tab">
      <p>Regular tab content.</p>
      <p>
        The contentless tab is not selectable, as it has no content. This is useful for displaying
        things that aren't really tabs after the list of tabs.
      </p>
    </gl-tab>
    <gl-tab title="Another tab">
      <p>Another tab's content.</p>
    </gl-tab>
    <template #tabs-end>
      <li class="nav-item align-self-center">Contentless tab</li>
    </template>
  </gl-tabs>
</template>
