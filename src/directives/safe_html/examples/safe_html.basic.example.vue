<script>
export default {
  data() {
    return {
      rawHtml: 'Welcome "><img src=x onerror=alert(1)>!',
    };
  },
};
</script>
<template>
  <!-- rawHtml = 'Welcome "><img src=x onerror=alert(1)>!' -->
  <div v-gl-safe-html-directive="rawHtml"></div>
</template>
