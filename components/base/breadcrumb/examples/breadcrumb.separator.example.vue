<script>
export default {
  data() {
    return {
      items: [
        {
          text: 'First Item',
          href: '#',
        },
        {
          text: 'Second Item',
          href: '#',
        },
        {
          text: 'Third Item',
          href: '#',
        },
      ],
    };
  },
};
</script>
<template>
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
</template>
