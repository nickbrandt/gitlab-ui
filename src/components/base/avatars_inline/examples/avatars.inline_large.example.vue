<script>
export default {
  data() {
    return {
      avatars: [
        { src: 'https://picsum.photos/id/1005/32' },
        { src: 'https://picsum.photos/id/1006/32' },
        { src: 'https://picsum.photos/id/1009/32' },
        { src: 'https://picsum.photos/id/1011/32' },
        { src: 'https://picsum.photos/id/1012/32' },
      ],
    };
  },
};
</script>
<template>
  <gl-avatars-inline :avatars="avatars" :collapsed="true" :avatar-size="32" :max-visible="2" />
</template>
