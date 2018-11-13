<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    info: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div class="card text-tertiary text-left">
    <div class="card-header py-0 px-3">
      {{ title }}
    </div>
    <div class="card-body py-2 px-3">
      <div
        v-for="(value, name) in info"
        :key="name + '-' + value"
      >
        <span class="ml-1">
          {{ name }}
        </span>
        <span class="ml-1">
          {{ value }}
        </span>
      </div>
    </div>
  </div>
</template>