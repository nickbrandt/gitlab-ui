<script>
export default {
  data() {
    return {
      toggle: false,
    };
  },
};
</script>

<template>
  <gl-alert>
    Lorem ipsum dolor sit amet
    <template #actions>
      <gl-toggle v-model="toggle" />
    </template>
  </gl-alert>
</template>
