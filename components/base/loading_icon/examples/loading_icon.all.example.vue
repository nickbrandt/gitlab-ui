<template>
  <div>
    <p>
      Size:
      <label v-for="size in sizes" :key="size">
        <input type="radio" :value="size" name="size" v-model="selectedSize" />
        {{size}}&nbsp;
      </label>
    </p>
    <p>
      Color:
      <label v-for="color in colors" :key="color">
        <input type="radio" :value="color" name="color" v-model="selectedColor" />
        {{color}}&nbsp;
      </label>
    </p>
    <p>
      <label>
        Inline:
        <input type="checkbox" v-model="isInline" />
      </label>
    </p>
    <div class="text-center p-1" :style="backgroundStyle">
      <gl-loading-icon :size="selectedSize" :color="selectedColor" :inline="isInline" class="p-1" />Loading...
    </div>
  </div>
</template>
<script>
const sizes = ['sm', 'md', 'lg', 'xl'];
const colors = ['orange', 'dark', 'light'];

export default {
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
  data: () => ({
    selectedSize: sizes[0],
    selectedColor: colors[0],
    isInline: false,
  }),
};
</script>
