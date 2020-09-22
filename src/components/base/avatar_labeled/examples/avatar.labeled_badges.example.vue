<template>
  <gl-avatar-labeled
    :size="32"
    src="https://assets.gitlab-static.net/uploads/-/system/group/avatar/9970/logo-extra-whitespace.png?width=64"
    label="GitLab User"
    sub-label="gitlab"
  >
    <template #meta>
      <div class="gl-p-1">
        <gl-badge class="gl-display-flex!" size="sm" variant="info">2FA</gl-badge>
      </div>
      <div class="gl-p-1">
        <gl-badge class="gl-display-flex!" size="sm" variant="danger">Blocked</gl-badge>
      </div>
    </template>
  </gl-avatar-labeled>
</template>
