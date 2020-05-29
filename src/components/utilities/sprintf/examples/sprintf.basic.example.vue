<script>
export default {
  data() {
    return {
      // Pretend this came from an API response!
      authorName: 'Some author',
    };
  },
};
</script>

<template>
  <div>
    <gl-sprintf message="Written by %{author}">
      <template #author>
        <span class="gl-font-weight-bold">{{ authorName }}</span>
      </template>
    </gl-sprintf>
  </div>
</template>
