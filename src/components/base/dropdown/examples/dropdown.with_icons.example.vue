<template>
  <gl-dropdown text="Some dropdown">
    <gl-dropdown-item
      icon-color="info"
      icon-name="status_running"
      icon-right-name="retry"
      icon-right-aria-label="Retry"
    >
      Status running
    </gl-dropdown-item>
    <gl-dropdown-item
      icon-color="success"
      icon-name="status_success"
      icon-right-name="cancel"
      icon-right-aria-label="Cancel"
    >
      Status success
    </gl-dropdown-item>
    <gl-dropdown-item
      icon-color="warning"
      icon-name="status_warning"
      icon-right-name="cancel"
      icon-right-aria-label="Cancel"
    >
      Status warning
    </gl-dropdown-item>
    <gl-dropdown-item
      icon-color="danger"
      icon-name="status_failed"
      icon-right-name="cancel"
      icon-right-aria-label="Cancel"
    >
      Status failed
    </gl-dropdown-item>
    <gl-dropdown-item
      icon-name="status_manual"
      icon-right-name="cancel"
      icon-right-aria-label="Cancel"
    >
      Status manual
    </gl-dropdown-item>
  </gl-dropdown>
</template>
