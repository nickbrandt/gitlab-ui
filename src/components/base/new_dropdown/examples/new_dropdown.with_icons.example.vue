<template>
  <gl-new-dropdown text="Some dropdown">
    <gl-new-dropdown-item icon-color="info" icon-name="status_running" icon-right-name="retry">
      Status running
    </gl-new-dropdown-item>
    <gl-new-dropdown-item icon-color="success" icon-name="status_success" icon-right-name="cancel">
      Status success
    </gl-new-dropdown-item>
    <gl-new-dropdown-item icon-color="warning" icon-name="status_warning" icon-right-name="cancel">
      Status warning
    </gl-new-dropdown-item>
    <gl-new-dropdown-item icon-color="danger" icon-name="status_failed" icon-right-name="cancel">
      Status failed
    </gl-new-dropdown-item>
    <gl-new-dropdown-item icon-name="status_manual" icon-right-name="cancel">
      Status manual
    </gl-new-dropdown-item>
  </gl-new-dropdown>
</template>
