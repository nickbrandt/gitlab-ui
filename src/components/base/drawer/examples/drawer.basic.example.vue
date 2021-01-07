<script>
export default {
  data() {
    return {
      drawerOpened: false,
    };
  },
  methods: {
    toggle() {
      this.drawerOpened = !this.drawerOpened;
    },
    close() {
      this.drawerOpened = false;
    },
  },
};
</script>

<template>
  <div>
    <gl-button @click="toggle">Toggle drawer</gl-button>
    <gl-drawer :open="drawerOpened" @close="close">
      <template #header>Your Title</template>
      <div>
        <p>First Body Item</p>
      </div>
    </gl-drawer>
  </div>
</template>
