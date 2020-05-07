<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'First',
          metric: '14d',
          icon: 'home',
        },
        {
          title: 'Second',
          metric: '2d',
        },
      ],
    };
  },
};
</script>

<template>
  <gl-path :items="items" />
</template>
