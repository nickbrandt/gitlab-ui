<script>
export default {
  data() {
    return {
      avatars: [
        { src: 'https://picsum.photos/id/1005/32', tooltip: 'Avatar 1', href: '//gitlab.com' },
        { src: 'https://picsum.photos/id/1006/32', tooltip: 'Avatar 2', href: '//gitlab.com' },
        { src: 'https://picsum.photos/id/1009/32', tooltip: 'Avatar 3', href: '//gitlab.com' },
        { src: 'https://picsum.photos/id/1011/32', tooltip: 'Avatar 4', href: '//gitlab.com' },
        { src: 'https://picsum.photos/id/1012/32', tooltip: 'Avatar 5', href: '//gitlab.com' },
      ],
    };
  },
};
</script>
<template>
  <gl-avatars-inline :avatars="avatars" :collapsed="true" :avatar-size="32" :max-visible="2">
    <template #avatar="{ avatar }">
      <gl-avatar-link v-gl-tooltip target="blank" :href="avatar.href" :title="avatar.tooltip">
        <gl-avatar :src="avatar.src" :size="32" />
      </gl-avatar-link>
    </template>
  </gl-avatars-inline>
</template>
