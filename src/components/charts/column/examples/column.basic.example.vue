<template>
  <gl-column-chart
    :data="{
      Full: [
        ['Joe', 1220],
        ['Sarah', 932],
        ['Tom', 901],
        ['Mary', 934],
        ['Mike', 1290],
        ['Ben', 1330],
        ['Jane', 1320],
      ],
    }"
    :option="{}"
    y-axis-title="Pushes by day"
    x-axis-title="User"
    x-axis-type="category"
  />
</template>
