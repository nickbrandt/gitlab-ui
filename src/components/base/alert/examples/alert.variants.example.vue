<script>
export default {
  data() {
    return {
      variants: ['danger', 'warning', 'success', 'info', 'tip', 'error'],
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
      <span class="text-capitalize">{{ variant }}</span> alert message lorem ipsum dolor sit
      <gl-link href="#">text link</gl-link> amet
    </gl-alert>
  </div>
</template>
