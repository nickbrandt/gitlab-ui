<script>
export default {
  data() {
    return {
      avatars: [
        { src: 'https://picsum.photos/id/1005/24' },
        { src: 'https://picsum.photos/id/1006/24' },
        { src: 'https://picsum.photos/id/1009/24' },
        { src: 'https://picsum.photos/id/1011/24' },
        { src: 'https://picsum.photos/id/1012/24' },
      ],
    };
  },
};
</script>
<template>
  <gl-avatars-inline :avatars="avatars" :collapsed="true" :avatar-size="24" :max-visible="2" />
</template>
