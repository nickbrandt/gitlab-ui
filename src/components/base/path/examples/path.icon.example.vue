<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'First',
          icon: 'home',
        },
        {
          title: 'Second',
        },
      ],
    };
  },
};
</script>

<template>
  <gl-path :items="items" />
</template>
