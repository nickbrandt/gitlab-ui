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
    :filter="(item, queryStr) => item.id.includes(queryStr)"
  />
</template>
