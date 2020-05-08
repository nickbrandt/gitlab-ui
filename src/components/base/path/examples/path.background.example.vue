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
  <div class="gl-bg-gray-50 gl-py-4">
    <gl-path :items="items" background-color="#f0f0f0" />
  </div>
</template>
