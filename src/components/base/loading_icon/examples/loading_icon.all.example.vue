<script>
const sizes = ['sm', 'md', 'lg', 'xl'];
const colors = ['dark', 'light'];

export default {
  data: () => ({
    selectedSize: sizes[0],
    selectedColor: colors[0],
    isInline: false,
  }),
  computed: {
    sizes: () => sizes,
    colors: () => colors,
    backgroundStyle() {
      return this.selectedColor === 'light'
        ? {
            backgroundColor: '#1f78d1',
            color: '#ffffff',
          }
        : {};
    },
  },
};
</script>

<template>
  <div>
    <p>
      Size:
      <label v-for="size in sizes" :key="size">
        <input v-model="selectedSize" type="radio" :value="size" name="size" />
        {{ size }}&nbsp;
      </label>
    </p>
    <p>
      Color:
      <label v-for="color in colors" :key="color">
        <input v-model="selectedColor" type="radio" :value="color" name="color" />
        {{ color }}&nbsp;
      </label>
    </p>
    <p>
      <label>
        Inline:
        <input v-model="isInline" type="checkbox" />
      </label>
    </p>
    <div class="text-center p-1" :style="backgroundStyle">
      <gl-loading-icon
        :size="selectedSize"
        :color="selectedColor"
        :inline="isInline"
        class="p-1"
      />Loading...
    </div>
  </div>
</template>
