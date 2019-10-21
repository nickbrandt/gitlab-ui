<script>
export default {
  data() {
    return {
      value: '',
      isLoading: false,
    };
  },
  watch: {
    value(newValue) {
      if (newValue) {
        clearTimeout(this.loader);
        this.isLoading = true;
        this.loader = setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      } else if (this.loader) {
        this.isLoading = false;
        clearTimeout(this.loader);
        this.loader = null;
      }
    },
  },
};
</script>
<template>
  <gl-search-box-by-type v-model="value" :is-loading="isLoading" />
</template>
