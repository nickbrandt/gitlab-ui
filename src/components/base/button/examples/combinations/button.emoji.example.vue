<template>
  <div>
    <gl-button selected>
      <template #emoji>
        <gl-emoji title="thumbs up sign" data-name="thumbsup" data-unicode-version="6.0"
          >👍</gl-emoji
        >
      </template>
      1
    </gl-button>
    <gl-button>
      <template #emoji>
        <gl-emoji title="thumbs down sign" data-name="thumbsdown" data-unicode-version="6.0"
          >👎</gl-emoji
        >
      </template>
      0
    </gl-button>
    <gl-button selected size="small">
      <template #emoji>
        <gl-emoji title="thumbs up sign" data-name="thumbsup" data-unicode-version="6.0"
          >👍</gl-emoji
        >
      </template>
      1
    </gl-button>
    <gl-button size="small">
      <template #emoji>
        <gl-emoji title="thumbs down sign" data-name="thumbsdown" data-unicode-version="6.0"
          >👎</gl-emoji
        >
      </template>
      0
    </gl-button>
  </div>
</template>
