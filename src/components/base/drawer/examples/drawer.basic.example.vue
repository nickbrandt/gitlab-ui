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
    <button type="button" @click="toggle">Toggle drawer</button>
    <gl-drawer :open="drawerOpened" @close="close">
      <template #header>
        Your Title
      </template>
      <template>
        <div>
          <p>First Body Item</p>
        </div>
      </template>
    </gl-drawer>
  </div>
</template>
