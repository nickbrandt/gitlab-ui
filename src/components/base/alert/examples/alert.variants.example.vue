<script>
export default {
  data() {
    return {
      variants: ['success', 'warning', 'danger', 'info', 'tip'],
    };
  },
};
</script>

<template>
  <div>
    <gl-alert v-for="variant in variants" :key="variant" :variant="variant" class="mb-2">
      <span class="text-capitalize">{{ variant }}</span>
    </gl-alert>
  </div>
</template>
