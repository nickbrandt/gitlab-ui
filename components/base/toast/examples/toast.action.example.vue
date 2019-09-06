<template>
  <gl-button
    @click="
      $toast.show('This is a toast with an action.', {
        action: { text: 'Undo', onClick: () => {} },
      })
    "
  >
    Show toast with an action
  </gl-button>
</template>
