<template>
  <gl-bar-chart
    :data="{
      Full: [
        [-78, 'Jim Halpert'],
        [123, 'Kelly Rajnigandha Kapoor'],
        [-10, 'Michael Gary Scott'],
      ],
    }"
    :option="{}"
    y-axis-title="People"
    x-axis-title="Percentage"
    x-axis-type="value"
  />
</template>
