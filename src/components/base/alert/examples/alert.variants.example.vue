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
    <gl-alert
      v-for="variant in variants"
      :key="variant"
      :variant="variant"
      title="Alert title"
      primary-button-text="Primary"
      secondary-button-text="Secondary"
      class="mb-2"
    >
      <span class="text-capitalize">{{ variant }}</span> lorem ipsum dolor sit
      <gl-link href="#">text link</gl-link> amet
    </gl-alert>
  </div>
</template>
