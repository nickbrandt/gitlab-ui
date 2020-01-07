<template>
  <div>
    <gl-new-button selected>
      <template #emoji>
        <gl-emoji title="thumbs up sign" data-name="thumbsup" data-unicode-version="6.0"
          >👍</gl-emoji
        >
      </template>
      1
    </gl-new-button>
    <gl-new-button>
      <template #emoji>
        <gl-emoji title="thumbs down sign" data-name="thumbsdown" data-unicode-version="6.0"
          >👎</gl-emoji
        >
      </template>
      0
    </gl-new-button>
    <gl-new-button selected size="small">
      <template #emoji>
        <gl-emoji title="thumbs up sign" data-name="thumbsup" data-unicode-version="6.0"
          >👍</gl-emoji
        >
      </template>
      1
    </gl-new-button>
    <gl-new-button size="small">
      <template #emoji>
        <gl-emoji title="thumbs down sign" data-name="thumbsdown" data-unicode-version="6.0"
          >👎</gl-emoji
        >
      </template>
      0
    </gl-new-button>
  </div>
</template>
