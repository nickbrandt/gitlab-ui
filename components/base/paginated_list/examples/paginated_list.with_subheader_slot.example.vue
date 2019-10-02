<template>
  <gl-paginated-list
    :list="[
      { id: 'foo' },
      { id: 'bar' },
      { id: 'baz' },
      { id: 'qux' },
      { id: 'quux' },
      { id: 'corge' },
      { id: 'grault' },
      { id: 'garply' },
      { id: 'waldo' },
      { id: 'fred' },
      { id: 'xyzzy' },
      { id: 'plugh' },
      { id: 'thud' },
    ]"
  >
    <template #subheader>
      Dropdown content can go here when like when an action button is clicked
    </template>
  </gl-paginated-list>
</template>
