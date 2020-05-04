<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'First',
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
