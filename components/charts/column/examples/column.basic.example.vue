<template>
  <gl-column-chart :data="{
    Full: [
      ['Mon', 1220],
      ['Tue', 932],
      ['Wed', 901],
      ['Thu', 934],
      ['Fri', 1290],
      ['Sat', 1330],
      ['Sun', 1320],
    ],
  }" 
  :option="{
    xAxis: {
      type: 'category',
    },
  }"
  y-axis-title="Pushes by day"
  x-axis-title="Username" />
</template>
