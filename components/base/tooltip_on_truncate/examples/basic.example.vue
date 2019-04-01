<template>
  <div>
    <gl-tooltip-on-truncate
      style="max-width: 200px; display: inline-block; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"
      title="This has no tooltip."
      >This has no tooltip.</gl-tooltip-on-truncate
      >
    <gl-tooltip-on-truncate
      style="max-width: 200px; display: inline-block; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"
      title="Something really really really long. It's super long. Way too long to show."
      >Something really really really long. It's super long. Way too long to
      show.</gl-tooltip-on-truncate
      >
    </div>
</template>
