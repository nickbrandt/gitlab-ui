<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: false,
      default: 'secondary',
      validator: (variant) =>
        ['primary', 'secondary', 'success', 'warning', 'danger'].includes(variant),
    },
  },
  computed: {
    headerColor() {
      return `bg-${this.variant}-100`;
    },
    bodyColor() {
      return `bg-${this.variant}-50`;
    },
    textColor() {
      switch (this.variant) {
        case 'secondary':
          return `text-${this.variant}-700`;
        case 'warning':
          return `text-${this.variant}-600`;
        default:
          return `text-${this.variant}-500`;
      }
    },
  },
};
</script>

<template>
  <div class="card text-center font-weight-bold border-0" :class="textColor">
    <div class="card-header border-0" :class="headerColor">
      {{ title }}
    </div>
    <div class="card-body rounded-bottom text-truncate text-4" :class="bodyColor">
      <slot name="icon"></slot>
      {{ value }}
    </div>
  </div>
</template>
