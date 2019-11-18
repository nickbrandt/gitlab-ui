<template>
  <div>
    <gl-search-box-by-click v-model="text" />
    <button class="btn" @click="setText">Set text to "Something else"</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    };
  },
  methods: {
    setText() {
      this.text = 'Something else';
    },
  },
};
</script>
